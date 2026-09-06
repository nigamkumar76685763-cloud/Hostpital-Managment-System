package com.Hospital.Manegment.System2.repository;

import com.Hospital.Manegment.System2.entity.InsuranceEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsuranceRepository extends MongoRepository<InsuranceEntity, String> {

    Optional<InsuranceEntity> findByPolicyNumber(String policyNumber);
}
