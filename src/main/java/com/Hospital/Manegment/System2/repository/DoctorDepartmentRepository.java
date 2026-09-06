package com.Hospital.Manegment.System2.repository;

import com.Hospital.Manegment.System2.entity.DoctorDepartmentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorDepartmentRepository extends MongoRepository<DoctorDepartmentEntity, String> {
}
