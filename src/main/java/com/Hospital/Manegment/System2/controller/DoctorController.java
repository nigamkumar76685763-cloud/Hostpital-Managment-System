package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.DoctorDTO;
import com.Hospital.Manegment.System2.service.DoctorService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j // Lombok annotation: Isse automatically 'log' object inject ho jata hai
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // 1. Create Doctor -> POST /api/doctors (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DoctorDTO> createDoctor(@Valid @RequestBody DoctorDTO doctorDTO) {
        log.info("Request received to create doctor: {} (Specialization: {})", doctorDTO.getName(), doctorDTO.getSpecialization());
        DoctorDTO createdDoctor = doctorService.createDoctor(doctorDTO);
        if (createdDoctor == null) {
            log.warn("Doctor creation failed for: {}", doctorDTO.getName());
            return new ResponseEntity<>(createdDoctor, HttpStatus.NOT_FOUND);
        }
        log.info("Doctor successfully registered with ID: {}", createdDoctor.getId());
        return new ResponseEntity<>(createdDoctor, HttpStatus.CREATED);
    }

    // 2. Get All Doctors -> GET /api/doctors (Public to all authenticated users)
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        log.debug("Fetching all doctors from MongoDB database");
        List<DoctorDTO> doctors = doctorService.getAllDoctors();
        if (doctors == null) {
            log.warn("No doctors found in database");
            return new ResponseEntity<>(doctors, HttpStatus.NOT_FOUND);
        }
        log.debug("Total doctors retrieved: {}", doctors.size());
        return ResponseEntity.ok(doctors);
    }

    // 3. Get Doctor by ID -> GET /api/doctors/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable String id) {
        log.debug("Fetching doctor details for ID: {}", id);
        DoctorDTO doctor = doctorService.getDoctorById(id);
        if (doctor == null) {
            log.warn("Doctor with ID: {} not found in database", id);
            return new ResponseEntity<>(doctor, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(doctor);
    }

    // 4. Update Doctor -> PUT /api/doctors/{id} (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DoctorDTO> updateDoctor(
            @PathVariable String id,
            @Valid @RequestBody DoctorDTO doctorDTO) {
        log.info("Updating doctor profile for ID: {} with new name: {}", id, doctorDTO.getName());
        DoctorDTO updatedDoctor = doctorService.updateDoctor(id, doctorDTO);
        if (updatedDoctor == null) {
            log.warn("Update failed: Doctor ID {} not found", id);
            return new ResponseEntity<>(updatedDoctor, HttpStatus.NOT_FOUND);
        }
        log.info("Doctor ID {} successfully updated", id);
        return ResponseEntity.ok(updatedDoctor);
    }

    // 5. Delete Doctor -> DELETE /api/doctors/{id} (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteDoctor(@PathVariable String id) {
        log.warn("ADMIN ACTION: Request received to DELETE doctor with ID: {}", id);
        String message = doctorService.deleteDoctor(id);
        if (message == null) {
            log.error("Delete failed: Doctor ID {} does not exist", id);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        log.info("Doctor with ID: {} has been permanently deleted", id);
        return ResponseEntity.ok(message);
    }

    // 6. Get Doctors by Specialization -> GET /api/doctors/specialization/{specialization}
    @GetMapping("/specialization/{specialization}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<List<DoctorDTO>> getDoctorsBySpecialization(@PathVariable String specialization) {
        log.debug("Searching doctors by specialization: {}", specialization);
        List<DoctorDTO> doctors = doctorService.getDoctorsBySpecialization(specialization);
        if (doctors == null) {
            log.warn("No doctors found with specialization: {}", specialization);
            return new ResponseEntity<>(doctors, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(doctors);
    }
}
