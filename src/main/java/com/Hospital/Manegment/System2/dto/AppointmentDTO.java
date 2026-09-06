package com.Hospital.Manegment.System2.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {

    private String id;

    @NotNull(message = "appointmentDate cannot be empty")
    private LocalDateTime appointmentDate;

    @NotNull(message = "status cannot be empty")
    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @NotNull(message = "patientId cannot be empty")
    private String patientId;

    @NotNull(message = "doctorId cannot be empty")
    private String doctorId;
}
