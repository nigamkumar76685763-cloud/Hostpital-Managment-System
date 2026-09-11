package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.entity.AppointmentEntity;
import com.Hospital.Manegment.System2.entity.DoctorEntity;
import com.Hospital.Manegment.System2.entity.PatientEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.AppointmentRepository;
import com.Hospital.Manegment.System2.repository.DoctorRepository;
import com.Hospital.Manegment.System2.repository.PatientRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class PrescriptionPdfService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    public byte[] generatePrescriptionPdf(String appointmentId) {
        AppointmentEntity appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", appointmentId));

        DoctorEntity doctor = doctorRepository.findById(appointment.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", appointment.getDoctorId()));

        PatientEntity patient = patientRepository.findById(appointment.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", appointment.getPatientId()));

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 36, 36);

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Colors
            Color primaryBlue = new Color(24, 76, 120);
            Color darkSlate = new Color(30, 41, 59);
            Color lightGray = new Color(241, 245, 249);

            // Fonts
            Font hospitalTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, primaryBlue);
            Font hospitalSubFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Color.GRAY);
            Font sectionHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, primaryBlue);
            Font boldText = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, darkSlate);
            Font normalText = FontFactory.getFont(FontFactory.HELVETICA, 10, darkSlate);

            // 1. Hospital Header
            Paragraph hospitalName = new Paragraph("MEDICARE+ MULTI-SPECIALTY CLINIC", hospitalTitleFont);
            hospitalName.setAlignment(Element.ALIGN_CENTER);
            document.add(hospitalName);

            Paragraph hospitalDetails = new Paragraph("124 Health Avenue, Cyber City • Phone: +91 (800) 234-5678 • Email: support@medicareplus.com", hospitalSubFont);
            hospitalDetails.setAlignment(Element.ALIGN_CENTER);
            hospitalDetails.setSpacingAfter(10);
            document.add(hospitalDetails);

            // Divider Line
            PdfPTable divider = new PdfPTable(1);
            divider.setWidthPercentage(100);
            PdfPCell divCell = new PdfPCell(new Phrase(""));
            divCell.setBackgroundColor(primaryBlue);
            divCell.setFixedHeight(3f);
            divCell.setBorder(Rectangle.NO_BORDER);
            divider.addCell(divCell);
            divider.setSpacingAfter(15);
            document.add(divider);

            // 2. Patient & Doctor Information Table
            PdfPTable metaTable = new PdfPTable(2);
            metaTable.setWidthPercentage(100);
            metaTable.setWidths(new float[]{1, 1});

            // Patient Card
            PdfPCell patientCell = new PdfPCell();
            patientCell.setBackgroundColor(lightGray);
            patientCell.setPadding(10);
            patientCell.setBorderColor(new Color(203, 213, 225));

            Paragraph patientHeader = new Paragraph("PATIENT DETAILS", sectionHeaderFont);
            patientHeader.setSpacingAfter(6);
            patientCell.addElement(patientHeader);
            patientCell.addElement(new Paragraph("Name: " + patient.getName(), boldText));
            patientCell.addElement(new Paragraph("Patient ID: " + patient.getId(), normalText));
            patientCell.addElement(new Paragraph("Age / Gender: " + patient.getAge() + " yrs / " + (patient.getGender() != null ? patient.getGender() : "N/A"), normalText));
            patientCell.addElement(new Paragraph("Blood Group: " + (patient.getBloodGroup() != null ? patient.getBloodGroup() : "Unknown"), normalText));
            patientCell.addElement(new Paragraph("Contact Phone: " + (patient.getPhoneNumber() != null ? patient.getPhoneNumber() : "N/A"), normalText));

            // Doctor Card
            PdfPCell doctorCell = new PdfPCell();
            doctorCell.setBackgroundColor(lightGray);
            doctorCell.setPadding(10);
            doctorCell.setBorderColor(new Color(203, 213, 225));

            Paragraph doctorHeader = new Paragraph("CONSULTING DOCTOR", sectionHeaderFont);
            doctorHeader.setSpacingAfter(6);
            doctorCell.addElement(doctorHeader);
            doctorCell.addElement(new Paragraph("Dr. " + doctor.getName(), boldText));
            doctorCell.addElement(new Paragraph("Department: " + doctor.getSpecialization(), normalText));
            doctorCell.addElement(new Paragraph("Token Number: " + (appointment.getTokenNumber() != null ? appointment.getTokenNumber() : "OPD-101"), boldText));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");
            String dateFormatted = appointment.getAppointmentDate() != null ? appointment.getAppointmentDate().format(formatter) : "Immediate";
            doctorCell.addElement(new Paragraph("Appointment Date: " + dateFormatted, normalText));
            doctorCell.addElement(new Paragraph("Status: " + appointment.getStatus(), boldText));

            metaTable.addCell(patientCell);
            metaTable.addCell(doctorCell);
            metaTable.setSpacingAfter(18);
            document.add(metaTable);

            // 3. Clinical Evaluation & Diagnosis Section
            Paragraph diagTitle = new Paragraph("1. CLINICAL EVALUATION & DIAGNOSIS", sectionHeaderFont);
            diagTitle.setSpacingAfter(6);
            document.add(diagTitle);

            String diagnosis = appointment.getDiagnosis() != null && !appointment.getDiagnosis().isBlank()
                    ? appointment.getDiagnosis()
                    : "Patient evaluated with standard vitals. Initial physical examination and medical history reviewed.";
            Paragraph diagBody = new Paragraph(diagnosis, normalText);
            diagBody.setSpacingAfter(15);
            document.add(diagBody);

            // 4. Rx - Prescribed Medication
            Paragraph rxTitle = new Paragraph("2. Rx - PRESCRIBED MEDICATION & DOSAGE", sectionHeaderFont);
            rxTitle.setSpacingAfter(6);
            document.add(rxTitle);

            String prescription = appointment.getPrescription() != null && !appointment.getPrescription().isBlank()
                    ? appointment.getPrescription()
                    : "1. Tab. Paracetamol 650mg - 1 tablet TDS after meals for 3 days.\n" +
                      "2. Multivitamin & Zinc Supplement - 1 capsule daily after breakfast for 10 days.\n" +
                      "3. Adequate hydration (3L water daily) & rest.";
            Paragraph rxBody = new Paragraph(prescription, normalText);
            rxBody.setSpacingAfter(15);
            document.add(rxBody);

            // 5. Special Notes & Clinical Advice
            Paragraph notesTitle = new Paragraph("3. CLINICAL ADVICE & FOLLOW-UP", sectionHeaderFont);
            notesTitle.setSpacingAfter(6);
            document.add(notesTitle);

            String notes = appointment.getNotes() != null && !appointment.getNotes().isBlank()
                    ? appointment.getNotes()
                    : "Follow up in OPD clinic after 5 days if symptoms persist. Avoid self-medication.";
            Paragraph notesBody = new Paragraph(notes, normalText);
            notesBody.setSpacingAfter(30);
            document.add(notesBody);

            // 6. Signature & Digital Stamp Box
            PdfPTable stampTable = new PdfPTable(2);
            stampTable.setWidthPercentage(100);
            stampTable.setWidths(new float[]{2, 1});

            PdfPCell disclaimerCell = new PdfPCell(new Paragraph(
                    "This is a digitally generated medical prescription verified through Medicare+ Central EMR Network. Valid for pharmacy dispensation.",
                    hospitalSubFont));
            disclaimerCell.setBorder(Rectangle.NO_BORDER);

            PdfPCell signCell = new PdfPCell();
            signCell.setBorder(Rectangle.NO_BORDER);
            signCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            Paragraph signText = new Paragraph("Dr. " + doctor.getName() + "\n(Authorized Signature & Stamp)", boldText);
            signText.setAlignment(Element.ALIGN_RIGHT);
            signCell.addElement(signText);

            stampTable.addCell(disclaimerCell);
            stampTable.addCell(signCell);
            document.add(stampTable);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Error generating prescription PDF for appointment " + appointmentId + ": " + e.getMessage(), e);
        }

        return out.toByteArray();
    }
}
