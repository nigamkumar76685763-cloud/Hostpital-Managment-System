package com.Hospital.Manegment.System2.repository;

import com.Hospital.Manegment.System2.entity.AppointmentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<AppointmentEntity, String> {

    List<AppointmentEntity> findByPatientId(String patientId);

    List<AppointmentEntity> findByDoctorId(String doctorId);

    List<AppointmentEntity> findByDoctorIdAndAppointmentDate(String doctorId, java.time.LocalDateTime appointmentDate);

    long countByStatus(String status);
}
