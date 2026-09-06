package com.Hospital.Manegment.System2.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Doctors")
public class DoctorEntity {

    @Id
    private String id;
    private String name;

    @Indexed
    private String specialization;

    @Indexed(unique = true)
    private String phone;

    @Indexed(unique = true)
    private String email;
}