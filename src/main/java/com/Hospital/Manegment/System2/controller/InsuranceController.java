package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.InsuranceDTO;
import com.Hospital.Manegment.System2.service.InsuranceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurances")
public class InsuranceController {

    @Autowired
    private InsuranceService insuranceService;

    // 1. Create Insurance -> POST /api/insurances (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InsuranceDTO> createInsurance(@Valid @RequestBody InsuranceDTO insuranceDTO) {
        InsuranceDTO createdInsurance = insuranceService.createInsurance(insuranceDTO);
        if (createdInsurance == null) {
            return new ResponseEntity<>(createdInsurance, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdInsurance, HttpStatus.CREATED);
    }

    // 2. Get All Insurances -> GET /api/insurances
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<List<InsuranceDTO>> getAllInsurances() {
        List<InsuranceDTO> insurances = insuranceService.getAllInsurances();
        if (insurances == null) {
            return new ResponseEntity<>(insurances, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(insurances);
    }

    // 3. Get Insurance by ID -> GET /api/insurances/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<InsuranceDTO> getInsuranceById(@PathVariable String id) {
        InsuranceDTO insurance = insuranceService.getInsuranceById(id);
        if (insurance == null) {
            return new ResponseEntity<>(insurance, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(insurance);
    }

    // 4. Update Insurance -> PUT /api/insurances/{id} (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InsuranceDTO> updateInsurance(
            @PathVariable String id,
            @Valid @RequestBody InsuranceDTO insuranceDTO) {
        InsuranceDTO updatedInsurance = insuranceService.updateInsurance(id, insuranceDTO);
        if (updatedInsurance == null) {
            return new ResponseEntity<>(updatedInsurance, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedInsurance);
    }

    // 5. Delete Insurance -> DELETE /api/insurances/{id} (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteInsurance(@PathVariable String id) {
        String message = insuranceService.deleteInsurance(id);
        if (message == null) {
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(message);
    }
}
