package com.Hospital.Manegment.System2.entity;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Patients")
public class PatientEntity {

    @Id
    private String id;
    private String name;
    private int age;
    private String gender;
    private LocalDate dateOfBirth;

    @Indexed
    private String phoneNumber;

    @Indexed
    private String email;

    private String bloodGroup;
    private String emergencyContactName;

    @Indexed
    private String disease;

    private InsuranceEntity insurance;

}
