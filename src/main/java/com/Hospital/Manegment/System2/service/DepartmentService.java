package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.dto.DepartmentDTO;
import java.util.List;

public interface DepartmentService {

    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

    List<DepartmentDTO> getAllDepartments();

    DepartmentDTO getDepartmentById(String id);

    DepartmentDTO updateDepartment(String id, DepartmentDTO departmentDTO);

    String deleteDepartment(String id);
}
