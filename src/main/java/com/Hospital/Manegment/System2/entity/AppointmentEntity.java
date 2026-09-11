package com.Hospital.Manegment.System2.entity;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Appointments")
@CompoundIndex(name = "doctor_appointment_date_idx", def = "{'doctorId': 1, 'appointmentDate': 1}")
public class AppointmentEntity {

    @Id
    private String id;
    private LocalDateTime appointmentDate;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Indexed
    private String patientId;

    @Indexed
    private String doctorId;

    private String diagnosis;
    private String prescription;
    private String notes;
    private String tokenNumber;
}
