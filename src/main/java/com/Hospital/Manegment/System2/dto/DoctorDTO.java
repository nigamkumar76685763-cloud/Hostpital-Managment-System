package com.Hospital.Manegment.System2.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {

    private String id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Specialization is required")
    private String specialization;

    @NotNull(message = "Phone is required")
    private String phone;

    @NotNull(message = "Email is required")
    private String email;
}
