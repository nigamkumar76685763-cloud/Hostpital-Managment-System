package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.AppointmentDTO;
import com.Hospital.Manegment.System2.entity.AppointmentEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.AppointmentRepository;
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
    private ModelMapper modelMapper;

    // 1. Create a new Appointment
    @Override
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        AppointmentEntity appointmentEntity = modelMapper.map(appointmentDTO, AppointmentEntity.class);

        if (appointmentEntity.getCreatedAt() == null) {
            appointmentEntity.setCreatedAt(LocalDateTime.now());
        }
        appointmentEntity.setUpdatedAt(LocalDateTime.now());
        if (appointmentEntity.getStatus() == null) {
            appointmentEntity.setStatus("CONFIRMED");
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
        existingAppointment.setUpdatedAt(LocalDateTime.now());

        AppointmentEntity updatedAppointment = appointmentRepository.save(existingAppointment);
        return modelMapper.map(updatedAppointment, AppointmentDTO.class);
    }

    // 5. Delete Appointment
    @Override
    public String deleteAppointment(String id) {
        if (appointmentRepository.existsById(id)) {
            return "Appointment with ID " + id + " has been successfully deleted.";
        }
        throw new ResourceNotFoundException("Appointment", "id", id);

    }
}
