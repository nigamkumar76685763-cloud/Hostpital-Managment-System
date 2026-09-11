package com.Hospital.Manegment.System2.dto;

import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    @Id
    private String id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Age is required")
    private int age;

    @NotNull(message = "Gender is required")
    private String gender;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Phone Number is required")
    private String phoneNumber;

    @NotNull(message = "Email is required")
    private String email;

    @NotNull(message = "Blood Group is required")
    private String bloodGroup;

    @NotNull(message = "Emergency Contact Name is required")
    private String emergencyContactName;

    @NotNull(message = "Disease is required")
    private String disease;

    @NotNull(message = "Insurance is required")
    private InsuranceDTO insurance;

}
