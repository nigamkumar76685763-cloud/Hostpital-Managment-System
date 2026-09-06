package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.PatientDTO;
import com.Hospital.Manegment.System2.entity.PatientEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.PatientRepository;
import com.Hospital.Manegment.System2.service.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Hospital.Manegment.System2.dto.PatientResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ModelMapper modelMapper;

    // 1. Create a new Patient
    @Override
    public PatientDTO createPatient(PatientDTO patientDTO) {
        // DTO ko Entity me convert kiya
        PatientEntity patientEntity = modelMapper.map(patientDTO, PatientEntity.class);

        // MongoDB me save kiya
        PatientEntity savedEntity = patientRepository.save(patientEntity);

        // Entity ko wapas DTO me convert karke return kiya
        return modelMapper.map(savedEntity, PatientDTO.class);
    }

    // 2. Get All Patients with Pagination & Sorting
    @Override
    public PatientResponse getAllPatients(int pageNo, int pageSize, String sortBy, String sortDir) {
        // 1. Sort direction set kiya
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        // 2. Pageable object create kiya
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        // 3. MongoDB se paginated result fetch kiya
        Page<PatientEntity> pageResult = patientRepository.findAll(pageable);

        // 4. Entities ko DTO list me convert kiya
        List<PatientDTO> content = pageResult.getContent().stream()
                .map(patient -> modelMapper.map(patient, PatientDTO.class))
                .collect(Collectors.toList());

        // 5. PatientResponse me pack karke return kiya
        PatientResponse patientResponse = new PatientResponse();
        patientResponse.setContent(content);
        patientResponse.setPageNo(pageResult.getNumber());
        patientResponse.setPageSize(pageResult.getSize());
        patientResponse.setTotalElements(pageResult.getTotalElements());
        patientResponse.setTotalPages(pageResult.getTotalPages());
        patientResponse.setLast(pageResult.isLast());

        return patientResponse;
    }

    // 3. Get Patient by ID
    @Override
    public PatientDTO getPatientById(String id) {
        PatientEntity patientEntity = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        return modelMapper.map(patientEntity, PatientDTO.class);
    }

    // 4. Update Patient
    @Override
    public PatientDTO updatePatient(String id, PatientDTO patientDTO) {
        PatientEntity existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));

        // Fields update
        existingPatient.setName(patientDTO.getName());
        existingPatient.setAge(patientDTO.getAge());
        existingPatient.setGender(patientDTO.getGender());
        existingPatient.setDateOfBirth(patientDTO.getDateOfBirth());
        existingPatient.setPhoneNumber(patientDTO.getPhoneNumber());
        existingPatient.setEmail(patientDTO.getEmail());
        existingPatient.setBloodGroup(patientDTO.getBloodGroup());
        existingPatient.setEmergencyContactName(patientDTO.getEmergencyContactName());
        existingPatient.setDisease(patientDTO.getDisease());

        PatientEntity updatedPatient = patientRepository.save(existingPatient);
        return modelMapper.map(updatedPatient, PatientDTO.class);
    }

    // 5. Delete Patient
    @Override
    public String deletePatient(String id) {
        PatientEntity patientEntity = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));

        patientRepository.delete(patientEntity);
        return "Patient with ID " + id + " has been successfully deleted.";
    }

    // 6. Get Patient by Email
    @Override
    public PatientDTO getPatientByEmail(String email) {
        PatientEntity patientEntity = patientRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "email", email));
        return modelMapper.map(patientEntity, PatientDTO.class);
    }

    // 7. Get Patients by Disease
    @Override
    public List<PatientDTO> getPatientsByDisease(String disease) {
        List<PatientEntity> patients = patientRepository.findByDiseaseContainingIgnoreCase(disease);
        return patients.stream()
                .map(patient -> modelMapper.map(patient, PatientDTO.class))
                .collect(Collectors.toList());
    }

    // 8. Dynamic Searching and Multi-Criteria Filtering with Pagination & Sorting
    @Override
    public PatientResponse searchPatients(
            String keyword,
            String disease,
            String gender,
            Integer minAge,
            Integer maxAge,
            String bloodGroup,
            int pageNo,
            int pageSize,
            String sortBy,
            String sortDir) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        // Keyword Search (Name, Phone, Email me partial match)
        if (keyword != null && !keyword.trim().isEmpty()) {
            Criteria searchCriteria = new Criteria().orOperator(
                    Criteria.where("name").regex(keyword, "i"),
                    Criteria.where("phoneNumber").regex(keyword, "i"),
                    Criteria.where("email").regex(keyword, "i"));
            criteriaList.add(searchCriteria);
        }

        // Disease Filter (e.g. Fever, Diabetes, Heart)
        if (disease != null && !disease.trim().isEmpty()) {
            criteriaList.add(Criteria.where("disease").regex(disease, "i"));
        }

        // Gender Filter (Male / Female / Other)
        if (gender != null && !gender.trim().isEmpty()) {
            criteriaList.add(Criteria.where("gender").regex("^" + gender + "$", "i"));
        }

        // Blood Group Filter (A+, O+, etc.)
        if (bloodGroup != null && !bloodGroup.trim().isEmpty()) {
            criteriaList.add(Criteria.where("bloodGroup").regex("^" + bloodGroup + "$", "i"));
        }

        // Age Range Filter (minAge to maxAge)
        if (minAge != null && maxAge != null) {
            criteriaList.add(Criteria.where("age").gte(minAge).lte(maxAge));
        } else if (minAge != null) {
            criteriaList.add(Criteria.where("age").gte(minAge));
        } else if (maxAge != null) {
            criteriaList.add(Criteria.where("age").lte(maxAge));
        }

        // Agar koi bhi filter criteria hai, toh query me add karo (AND operator)
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        // Total count nikalna for pagination
        long totalElements = mongoTemplate.count(query, PatientEntity.class);

        // Sorting & Pageable lagana
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        query.with(pageable);

        // Filtered data fetch karna
        List<PatientEntity> filteredEntities = mongoTemplate.find(query, PatientEntity.class);
        List<PatientDTO> content = filteredEntities.stream()
                .map(patient -> modelMapper.map(patient, PatientDTO.class))
                .collect(Collectors.toList());

        // Total Pages calculate karna
        int totalPages = (int) Math.ceil((double) totalElements / pageSize);
        boolean isLast = (pageNo + 1) >= totalPages;

        PatientResponse patientResponse = new PatientResponse();
        patientResponse.setContent(content);
        patientResponse.setPageNo(pageNo);
        patientResponse.setPageSize(pageSize);
        patientResponse.setTotalElements(totalElements);
        patientResponse.setTotalPages(totalPages);
        patientResponse.setLast(isLast);

        return patientResponse;
    }
}
