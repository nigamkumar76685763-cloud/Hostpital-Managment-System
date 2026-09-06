package com.Hospital.Manegment.System2.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceDTO {

    private String id;

    @NotBlank(message = "policyNumber cannot be empty")
    private String policyNumber;

    @NotBlank(message = "provider cannot be empty")
    private String provider;

    @NotNull(message = "validUntil cannot be empty")
    private LocalDate validUntil;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
