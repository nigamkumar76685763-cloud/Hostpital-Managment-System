package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.DepartmentDTO;
import com.Hospital.Manegment.System2.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // 1. Create Department -> POST /api/departments (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepartmentDTO> createDepartment(@Valid @RequestBody DepartmentDTO departmentDTO) {
        DepartmentDTO createdDept = departmentService.createDepartment(departmentDTO);
        if (createdDept == null) {
            return new ResponseEntity<>(createdDept, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdDept, HttpStatus.CREATED);
    }

    // 2. Get All Departments -> GET /api/departments (Publicly viewable)
    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        List<DepartmentDTO> departments = departmentService.getAllDepartments();
        if (departments == null) {
            return new ResponseEntity<>(departments, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(departments);
    }

    // 3. Get Department by ID -> GET /api/departments/{id} (Publicly viewable)
    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<DepartmentDTO> getDepartmentById(@PathVariable String id) {
        DepartmentDTO department = departmentService.getDepartmentById(id);
        if (department == null) {
            return new ResponseEntity<>(department, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(department);
    }

    // 4. Update Department -> PUT /api/departments/{id} (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepartmentDTO> updateDepartment(
            @PathVariable String id,
            @Valid @RequestBody DepartmentDTO departmentDTO) {
        DepartmentDTO updatedDept = departmentService.updateDepartment(id, departmentDTO);
        if (updatedDept == null) {
            return new ResponseEntity<>(updatedDept, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedDept);
    }

    // 5. Delete Department -> DELETE /api/departments/{id} (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteDepartment(@PathVariable String id) {
        String message = departmentService.deleteDepartment(id);
        if (message == null) {
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(message);
    }
}
