package com.Hospital.Manegment.System2.repository;

import com.Hospital.Manegment.System2.entity.PatientEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends MongoRepository<PatientEntity, String> {

    Optional<PatientEntity> findByEmail(String email);

    List<PatientEntity> findByDiseaseContainingIgnoreCase(String disease);
}
