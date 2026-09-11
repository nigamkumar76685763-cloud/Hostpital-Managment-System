package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.service.PrescriptionPdfService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/appointments")
public class PrescriptionPdfController {

    @Autowired
    private PrescriptionPdfService prescriptionPdfService;

    // Generate & Stream Clinical Medical Prescription PDF
    @GetMapping(value = "/{id}/prescription-pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PATIENT')")
    public ResponseEntity<byte[]> downloadPrescriptionPdf(@PathVariable String id) {
        log.info("Generating digital medical prescription PDF for appointment ID: {}", id);
        byte[] pdfBytes = prescriptionPdfService.generatePrescriptionPdf(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "MedicarePlus_Prescription_" + id + ".pdf");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
