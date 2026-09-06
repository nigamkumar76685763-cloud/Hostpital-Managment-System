package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.AppointmentDTO;
import com.Hospital.Manegment.System2.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // 1. Create Appointment -> POST /api/appointments
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<AppointmentDTO> createAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO createdAppointment = appointmentService.createAppointment(appointmentDTO);
        if (createdAppointment == null) {
            return new ResponseEntity<>(createdAppointment, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    // 2. Get All Appointments -> GET /api/appointments
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
        if (appointments == null) {
            return new ResponseEntity<>(appointments, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(appointments);
    }

    // 3. Get Appointment by ID -> GET /api/appointments/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable String id) {
        AppointmentDTO appointment = appointmentService.getAppointmentById(id);
        if (appointment == null) {
            return new ResponseEntity<>(appointment, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(appointment);
    }

    // 4. Update Appointment -> PUT /api/appointments/{id}
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<AppointmentDTO> updateAppointment(
            @PathVariable String id,
            @Valid @RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO updatedAppointment = appointmentService.updateAppointment(id, appointmentDTO);
        if (updatedAppointment == null) {
            return new ResponseEntity<>(updatedAppointment, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedAppointment);
    }

    // 5. Delete Appointment -> DELETE /api/appointments/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<String> deleteAppointment(@PathVariable String id) {
        String message = appointmentService.deleteAppointment(id);
        if (message == null) {
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(message);
    }
}
