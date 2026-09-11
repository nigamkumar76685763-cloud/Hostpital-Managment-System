package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.PatientDTO;
import com.Hospital.Manegment.System2.dto.PatientResponse;
import com.Hospital.Manegment.System2.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // 1. Create Patient -> POST /api/patients
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientDTO> createPatient(@Valid @RequestBody PatientDTO patientDTO) {
        PatientDTO createdPatient = patientService.createPatient(patientDTO);
        if (createdPatient == null) {
            return new ResponseEntity<>(createdPatient, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
    }

    // 2. Get All Patients with Pagination & Sorting -> GET /api/patients
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientResponse> getAllPatients(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "name", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        PatientResponse patientResponse = patientService.getAllPatients(pageNo, pageSize, sortBy, sortDir);
        if (patientResponse == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(patientResponse);
    }

    // 3. Get Patient by ID -> GET /api/patients/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable String id) {
        PatientDTO patient = patientService.getPatientById(id);
        if (patient == null) {
            return new ResponseEntity<>(patient, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(patient);
    }

    // 4. Update Patient -> PUT /api/patients/{id}
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientDTO> updatePatient(
            @PathVariable String id,
            @Valid @RequestBody PatientDTO patientDTO) {
        PatientDTO updatedPatient = patientService.updatePatient(id, patientDTO);
        if (updatedPatient == null) {
            return new ResponseEntity<>(updatedPatient, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedPatient);
    }

    // 5. Delete Patient -> DELETE /api/patients/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deletePatient(@PathVariable String id) {
        String message = patientService.deletePatient(id);
        if (message == null) {
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(message);
    }

    // 6. Get Patient by Email -> GET /api/patients/email/{email}
    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientDTO> getPatientByEmail(@PathVariable String email) {
        PatientDTO patient = patientService.getPatientByEmail(email);
        if (patient == null) {
            return new ResponseEntity<>(patient, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(patient);
    }

    // 7. Search Patients by Disease -> GET /api/patients/search?disease=fever
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<List<PatientDTO>> searchPatientsByDisease(@RequestParam String disease) {
        List<PatientDTO> patients = patientService.getPatientsByDisease(disease);
        if (patients == null) {
            return new ResponseEntity<>(patients, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(patients);
    }

    // 8. Dynamic Multi-Criteria Search & Filter -> GET /api/patients/filter
    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<PatientResponse> filterPatients(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String disease,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(defaultValue = "0", required = false) int pageNo,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "name", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String sortDir) {
        PatientResponse response = patientService.searchPatients(
                keyword,
                disease,
                gender,
                minAge,
                maxAge,
                bloodGroup,
                pageNo,
                pageSize,
                sortBy,
                sortDir);
        return ResponseEntity.ok(response);
    }
}
