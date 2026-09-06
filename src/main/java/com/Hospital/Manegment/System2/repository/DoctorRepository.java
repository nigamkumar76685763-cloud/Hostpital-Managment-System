package com.Hospital.Manegment.System2.repository;

import com.Hospital.Manegment.System2.entity.DoctorEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends MongoRepository<DoctorEntity, String> {

    List<DoctorEntity> findBySpecializationIgnoreCase(String specialization);
}
