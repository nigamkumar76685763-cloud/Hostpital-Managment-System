package com.Hospital.Manegment.System2.repository;

import com.Hospital.Manegment.System2.entity.DepartmentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends MongoRepository<DepartmentEntity, String> {
}
