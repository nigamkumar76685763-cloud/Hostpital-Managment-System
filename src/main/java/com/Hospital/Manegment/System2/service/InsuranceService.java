package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.dto.InsuranceDTO;
import java.util.List;

public interface InsuranceService {

    InsuranceDTO createInsurance(InsuranceDTO insuranceDTO);

    List<InsuranceDTO> getAllInsurances();

    InsuranceDTO getInsuranceById(String id);

    InsuranceDTO updateInsurance(String id, InsuranceDTO insuranceDTO);

    String deleteInsurance(String id);
}
