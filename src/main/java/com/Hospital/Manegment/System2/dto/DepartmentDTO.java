package com.Hospital.Manegment.System2.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDTO {

    private String id;

    @NotBlank(message = "name cannot be empty")
    private String name;

    @NotBlank(message = "description cannot be empty")
    private String description;

    @NotBlank(message = "location cannot be empty")
    private String location;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
