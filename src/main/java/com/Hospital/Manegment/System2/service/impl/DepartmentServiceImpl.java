package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.DepartmentDTO;
import com.Hospital.Manegment.System2.entity.DepartmentEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.DepartmentRepository;
import com.Hospital.Manegment.System2.service.DepartmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    // 1. Create a new Department (Naya add hua to purana cache saaf karo)
    @Override
    @CacheEvict(value = "departments", allEntries = true)
    public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
        DepartmentEntity departmentEntity = modelMapper.map(departmentDTO, DepartmentEntity.class);

        if (departmentEntity.getCreatedAt() == null) {
            departmentEntity.setCreatedAt(LocalDateTime.now());
        }
        departmentEntity.setUpdatedAt(LocalDateTime.now());

        DepartmentEntity savedEntity = departmentRepository.save(departmentEntity);
        return modelMapper.map(savedEntity, DepartmentDTO.class);
    }

    // 2. Get All Departments (Redis mein cache hoga under 'departments::all')
    @Override
    @Cacheable(value = "departments", key = "'all'")
    public List<DepartmentDTO> getAllDepartments() {
        System.out.println("🔴 [DATABASE HIT] Fetching ALL departments from MongoDB...");
        List<DepartmentEntity> departments = departmentRepository.findAll();
        return departments.stream()
                .map(dept -> modelMapper.map(dept, DepartmentDTO.class))
                .collect(Collectors.toList());
    }

    // 3. Get Department by ID (Redis mein cache hoga under 'departments::<id>')
    @Override
    @Cacheable(value = "departments", key = "#id")
    public DepartmentDTO getDepartmentById(String id) {
        System.out.println("🔴 [DATABASE HIT] Fetching department from MongoDB for ID: " + id);
        DepartmentEntity departmentEntity = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));
        return modelMapper.map(departmentEntity, DepartmentDTO.class);
    }

    // 4. Update Department (Data badla to purana cache saaf karo)
    @Override
    @CacheEvict(value = "departments", allEntries = true)
    public DepartmentDTO updateDepartment(String id, DepartmentDTO departmentDTO) {
        DepartmentEntity existingDept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));

        existingDept.setName(departmentDTO.getName());
        existingDept.setDescription(departmentDTO.getDescription());
        existingDept.setLocation(departmentDTO.getLocation());
        existingDept.setUpdatedAt(LocalDateTime.now());

        DepartmentEntity updatedDept = departmentRepository.save(existingDept);
        return modelMapper.map(updatedDept, DepartmentDTO.class);
    }

    // 5. Delete Department (Delete hua to purana cache saaf karo)
    @Override
    @CacheEvict(value = "departments", allEntries = true)
    public String deleteDepartment(String id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));

        departmentRepository.delete(departmentEntity);
        return "Department with ID " + id + " has been successfully deleted.";
    }
}
