package com.Hospital.Manegment.System2.entity;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Departments")
public class DepartmentEntity {

    @Id
    private String id;
    private String name;
    private String description;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
