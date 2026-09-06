package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.dto.PatientDTO;
import com.Hospital.Manegment.System2.dto.PatientResponse;
import java.util.List;

public interface PatientService {

    PatientDTO createPatient(PatientDTO patientDTO);

    PatientResponse getAllPatients(int pageNo, int pageSize, String sortBy, String sortDir);

    PatientDTO getPatientById(String id);

    PatientDTO updatePatient(String id, PatientDTO patientDTO);

    String deletePatient(String id);

    PatientDTO getPatientByEmail(String email);

    List<PatientDTO> getPatientsByDisease(String disease);

    PatientResponse searchPatients(
            String keyword,
            String disease,
            String gender,
            Integer minAge,
            Integer maxAge,
            String bloodGroup,
            int pageNo,
            int pageSize,
            String sortBy,
            String sortDir
    );
}
