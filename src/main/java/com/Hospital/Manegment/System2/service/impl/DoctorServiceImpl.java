package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.DoctorDTO;
import com.Hospital.Manegment.System2.entity.DoctorEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.DoctorRepository;
import com.Hospital.Manegment.System2.service.DoctorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper modelMapper;

    // 1. Create a new Doctor
    @Override
    @CacheEvict(value = "doctors", allEntries = true)
    public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
        DoctorEntity doctorEntity = modelMapper.map(doctorDTO, DoctorEntity.class);
        DoctorEntity savedEntity = doctorRepository.save(doctorEntity);
        return modelMapper.map(savedEntity, DoctorDTO.class);
    }

    // 2. Get All Doctors
    @Override
    @Cacheable(value = "doctors", key = "'all'")
    public List<DoctorDTO> getAllDoctors() {
        List<DoctorEntity> doctors = doctorRepository.findAll();
        return doctors.stream()
                .map(doctor -> modelMapper.map(doctor, DoctorDTO.class))
                .collect(Collectors.toList());
    }

    // 3. Get Doctor by ID
    @Override
    @Cacheable(value = "doctors", key = "#id")
    public DoctorDTO getDoctorById(String id) {
        DoctorEntity doctorEntity = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return modelMapper.map(doctorEntity, DoctorDTO.class);
    }

    // 4. Update Doctor
    @Override
    @CacheEvict(value = "doctors", allEntries = true)
    public DoctorDTO updateDoctor(String id, DoctorDTO doctorDTO) {
        DoctorEntity existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));

        existingDoctor.setName(doctorDTO.getName());
        existingDoctor.setSpecialization(doctorDTO.getSpecialization());
        existingDoctor.setPhone(doctorDTO.getPhone());
        existingDoctor.setEmail(doctorDTO.getEmail());
        if (doctorDTO.getConsultationFee() != null) {
            existingDoctor.setConsultationFee(doctorDTO.getConsultationFee());
        }
        if (doctorDTO.getExperienceYears() != null) {
            existingDoctor.setExperienceYears(doctorDTO.getExperienceYears());
        }
        if (doctorDTO.getRating() != null) {
            existingDoctor.setRating(doctorDTO.getRating());
        }
        existingDoctor.setAvailable(doctorDTO.isAvailable());

        DoctorEntity updatedDoctor = doctorRepository.save(existingDoctor);
        return modelMapper.map(updatedDoctor, DoctorDTO.class);
    }

    // 5. Delete Doctor
    @Override
    @CacheEvict(value = "doctors", allEntries = true)
    public String deleteDoctor(String id) {
        DoctorEntity doctorEntity = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));

        doctorRepository.delete(doctorEntity);
        return "Doctor with ID " + id + " has been successfully deleted.";
    }

    // 6. Get Doctors by Specialization (e.g. Cardiologist, Neurologist)
    @Override
    @Cacheable(value = "doctors", key = "#specialization")
    public List<DoctorDTO> getDoctorsBySpecialization(String specialization) {
        List<DoctorEntity> doctors = doctorRepository.findBySpecializationIgnoreCase(specialization);
        return doctors.stream()
                .map(doctor -> modelMapper.map(doctor, DoctorDTO.class))
                .collect(Collectors.toList());
    }

    // 7. Toggle Doctor Availability Status (On-duty / Off-duty)
    @Override
    @CacheEvict(value = "doctors", allEntries = true)
    public DoctorDTO toggleAvailability(String id, boolean available) {
        DoctorEntity existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        existingDoctor.setAvailable(available);
        DoctorEntity saved = doctorRepository.save(existingDoctor);
        return modelMapper.map(saved, DoctorDTO.class);
    }
}
