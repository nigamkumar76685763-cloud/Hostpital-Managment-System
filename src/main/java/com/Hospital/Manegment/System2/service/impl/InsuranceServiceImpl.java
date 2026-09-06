package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.InsuranceDTO;
import com.Hospital.Manegment.System2.entity.InsuranceEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.InsuranceRepository;
import com.Hospital.Manegment.System2.service.InsuranceService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsuranceServiceImpl implements InsuranceService {

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private ModelMapper modelMapper;

    // 1. Create a new Insurance
    @Override
    public InsuranceDTO createInsurance(InsuranceDTO insuranceDTO) {
        InsuranceEntity insuranceEntity = modelMapper.map(insuranceDTO, InsuranceEntity.class);

        if (insuranceEntity.getCreatedAt() == null) {
            insuranceEntity.setCreatedAt(LocalDateTime.now());
        }
        insuranceEntity.setUpdatedAt(LocalDateTime.now());

        InsuranceEntity savedEntity = insuranceRepository.save(insuranceEntity);
        return modelMapper.map(savedEntity, InsuranceDTO.class);
    }

    // 2. Get All Insurances
    @Override
    public List<InsuranceDTO> getAllInsurances() {
        List<InsuranceEntity> insurances = insuranceRepository.findAll();
        return insurances.stream()
                .map(insurance -> modelMapper.map(insurance, InsuranceDTO.class))
                .collect(Collectors.toList());
    }

    // 3. Get Insurance by ID
    @Override
    public InsuranceDTO getInsuranceById(String id) {
        InsuranceEntity insuranceEntity = insuranceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Insurance", "id", id));
        return modelMapper.map(insuranceEntity, InsuranceDTO.class);
    }

    // 4. Update Insurance
    @Override
    public InsuranceDTO updateInsurance(String id, InsuranceDTO insuranceDTO) {
        InsuranceEntity existingInsurance = insuranceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Insurance", "id", id));

        existingInsurance.setPolicyNumber(insuranceDTO.getPolicyNumber());
        existingInsurance.setProvider(insuranceDTO.getProvider());
        existingInsurance.setValidUntil(insuranceDTO.getValidUntil());
        existingInsurance.setUpdatedAt(LocalDateTime.now());

        InsuranceEntity updatedInsurance = insuranceRepository.save(existingInsurance);
        return modelMapper.map(updatedInsurance, InsuranceDTO.class);
    }

    // 5. Delete Insurance
    @Override
    public String deleteInsurance(String id) {
        InsuranceEntity insuranceEntity = insuranceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Insurance", "id", id));

        insuranceRepository.delete(insuranceEntity);
        return "Insurance with ID " + id + " has been successfully deleted.";
    }
}
