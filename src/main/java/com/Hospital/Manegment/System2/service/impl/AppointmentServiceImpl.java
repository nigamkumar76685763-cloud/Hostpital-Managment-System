package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.AppointmentDTO;
import com.Hospital.Manegment.System2.entity.AppointmentEntity;
import com.Hospital.Manegment.System2.entity.DoctorEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.AppointmentRepository;
import com.Hospital.Manegment.System2.repository.DoctorRepository;
import com.Hospital.Manegment.System2.repository.PatientRepository;
import com.Hospital.Manegment.System2.service.AppointmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    // 1. Create a new Appointment (with Doctor Availability & Slot Conflict check)
    @Override
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        // Validate Doctor
        DoctorEntity doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", appointmentDTO.getDoctorId()));

        if (!doctor.isAvailable()) {
            throw new IllegalStateException("Doctor " + doctor.getName() + " is currently off-duty and unavailable for bookings.");
        }

        // Validate Patient
        if (!patientRepository.existsById(appointmentDTO.getPatientId())) {
            throw new ResourceNotFoundException("Patient", "id", appointmentDTO.getPatientId());
        }

        // Check for Slot Conflicts
        List<AppointmentEntity> conflicts = appointmentRepository.findByDoctorIdAndAppointmentDate(
                doctor.getId(), appointmentDTO.getAppointmentDate());
        boolean hasActiveConflict = conflicts.stream()
                .anyMatch(app -> !"CANCELLED".equalsIgnoreCase(app.getStatus()));
        if (hasActiveConflict) {
            throw new IllegalStateException("Doctor " + doctor.getName() + " already has a booked slot at: " + appointmentDTO.getAppointmentDate());
        }

        AppointmentEntity appointmentEntity = modelMapper.map(appointmentDTO, AppointmentEntity.class);

        if (appointmentEntity.getCreatedAt() == null) {
            appointmentEntity.setCreatedAt(LocalDateTime.now());
        }
        appointmentEntity.setUpdatedAt(LocalDateTime.now());
        if (appointmentEntity.getStatus() == null || appointmentEntity.getStatus().isBlank()) {
            appointmentEntity.setStatus("CONFIRMED");
        }
        if (appointmentEntity.getTokenNumber() == null || appointmentEntity.getTokenNumber().isBlank()) {
            appointmentEntity.setTokenNumber("OPD-" + (100 + (int)(Math.random() * 900)));
        }

        AppointmentEntity savedEntity = appointmentRepository.save(appointmentEntity);
        return modelMapper.map(savedEntity, AppointmentDTO.class);
    }

    // 2. Get All Appointments
    @Override
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentDTO> getAllAppointments() {
        List<AppointmentEntity> appointments = appointmentRepository.findAll();
        return appointments.stream()
                .map(appointment -> modelMapper.map(appointment, AppointmentDTO.class))
                .collect(Collectors.toList());
    }

    // 3. Get Appointment by ID
    @Override
    public AppointmentDTO getAppointmentById(String id) {
        AppointmentEntity appointmentEntity = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        return modelMapper.map(appointmentEntity, AppointmentDTO.class);
    }

    // 4. Update Appointment
    @Override
    public AppointmentDTO updateAppointment(String id, AppointmentDTO appointmentDTO) {
        AppointmentEntity existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        existingAppointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        existingAppointment.setStatus(appointmentDTO.getStatus());
        existingAppointment.setPatientId(appointmentDTO.getPatientId());
        existingAppointment.setDoctorId(appointmentDTO.getDoctorId());
        if (appointmentDTO.getDiagnosis() != null) {
            existingAppointment.setDiagnosis(appointmentDTO.getDiagnosis());
        }
        if (appointmentDTO.getPrescription() != null) {
            existingAppointment.setPrescription(appointmentDTO.getPrescription());
        }
        if (appointmentDTO.getNotes() != null) {
            existingAppointment.setNotes(appointmentDTO.getNotes());
        }
        existingAppointment.setUpdatedAt(LocalDateTime.now());

        AppointmentEntity updatedAppointment = appointmentRepository.save(existingAppointment);
        return modelMapper.map(updatedAppointment, AppointmentDTO.class);
    }

    // 5. Delete Appointment (Bug fix: actually delete from repository)
    @Override
    public String deleteAppointment(String id) {
        AppointmentEntity appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        appointmentRepository.delete(appointment);
        return "Appointment with ID " + id + " has been successfully deleted.";
    }

    // 6. Get Appointments by Patient ID
    @Override
    public List<AppointmentDTO> getAppointmentsByPatientId(String patientId) {
        List<AppointmentEntity> list = appointmentRepository.findByPatientId(patientId);
        return list.stream()
                .map(app -> modelMapper.map(app, AppointmentDTO.class))
                .collect(Collectors.toList());
    }

    // 7. Get Appointments by Doctor ID
    @Override
    public List<AppointmentDTO> getAppointmentsByDoctorId(String doctorId) {
        List<AppointmentEntity> list = appointmentRepository.findByDoctorId(doctorId);
        return list.stream()
                .map(app -> modelMapper.map(app, AppointmentDTO.class))
                .collect(Collectors.toList());
    }

    // 8. Update Appointment Status (CONFIRMED / CANCELLED / COMPLETED)
    @Override
    public AppointmentDTO updateAppointmentStatus(String id, String status) {
        AppointmentEntity appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        appointment.setStatus(status.toUpperCase());
        appointment.setUpdatedAt(LocalDateTime.now());
        AppointmentEntity saved = appointmentRepository.save(appointment);
        return modelMapper.map(saved, AppointmentDTO.class);
    }

    // 9. Add Prescription / Medical Notes
    @Override
    public AppointmentDTO addPrescription(String id, String diagnosis, String prescription, String notes) {
        AppointmentEntity appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        appointment.setDiagnosis(diagnosis);
        appointment.setPrescription(prescription);
        appointment.setNotes(notes);
        appointment.setStatus("COMPLETED");
        appointment.setUpdatedAt(LocalDateTime.now());
        AppointmentEntity saved = appointmentRepository.save(appointment);
        return modelMapper.map(saved, AppointmentDTO.class);
    }
}
