package com.Hospital.Manegment.System2.config;

import com.Hospital.Manegment.System2.entity.DepartmentEntity;
import com.Hospital.Manegment.System2.entity.DoctorEntity;
import com.Hospital.Manegment.System2.entity.Role;
import com.Hospital.Manegment.System2.entity.UserEntity;
import com.Hospital.Manegment.System2.repository.DepartmentRepository;
import com.Hospital.Manegment.System2.repository.DoctorRepository;
import com.Hospital.Manegment.System2.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 1. Seed Departments if empty
        if (departmentRepository.count() == 0) {
            log.info("Seeding initial Hospital Departments...");
            departmentRepository.saveAll(List.of(
                    new DepartmentEntity(null, "Cardiology", "Heart care, ECG, 2D Echo, and vascular treatments.", "Building A, 2nd Floor", LocalDateTime.now(), LocalDateTime.now()),
                    new DepartmentEntity(null, "Neurology", "Brain, spine, neurological surgery, and memory care.", "Building B, 3rd Floor", LocalDateTime.now(), LocalDateTime.now()),
                    new DepartmentEntity(null, "Orthopedics", "Bone fractures, joint replacements, and sports injuries.", "Building A, 1st Floor", LocalDateTime.now(), LocalDateTime.now()),
                    new DepartmentEntity(null, "Pediatrics", "Infant and child wellness, vaccinations, and growth audits.", "Building C, Ground Floor", LocalDateTime.now(), LocalDateTime.now())
            ));
            log.info("4 Hospital Departments seeded successfully.");
        }

        // 2. Seed Verified Doctors if empty
        if (doctorRepository.count() == 0) {
            log.info("Seeding initial Specialist Doctors...");
            doctorRepository.saveAll(List.of(
                    new DoctorEntity(null, "Dr. Sarah Johnson", "Cardiology", "+91-9876543210", "sarah.johnson@medicare.com", true, 800.0, 14, 4.9),
                    new DoctorEntity(null, "Dr. David Anderson", "Neurology", "+91-9876543211", "david.anderson@medicare.com", true, 950.0, 12, 4.8),
                    new DoctorEntity(null, "Dr. Michael Chen", "Orthopedics", "+91-9876543212", "michael.chen@medicare.com", true, 850.0, 16, 4.9),
                    new DoctorEntity(null, "Dr. Emily Rodriguez", "Pediatrics", "+91-9876543213", "emily.rodriguez@medicare.com", false, 750.0, 9, 5.0)
            ));
            log.info("4 Specialist Doctors seeded successfully.");
        }

        // 3. Seed Demo Users if empty
        if (userRepository.count() == 0) {
            log.info("Seeding default Demo Users (Admin, Doctor, Patient)...");
            userRepository.saveAll(List.of(
                    UserEntity.builder()
                            .name("System Administrator")
                            .email("admin@medicare.com")
                            .password(passwordEncoder.encode("admin123"))
                            .role(Role.ROLE_ADMIN)
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build(),
                    UserEntity.builder()
                            .name("Dr. Sarah Johnson")
                            .email("doctor@medicare.com")
                            .password(passwordEncoder.encode("doctor123"))
                            .role(Role.ROLE_DOCTOR)
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build(),
                    UserEntity.builder()
                            .name("Rahul Sharma")
                            .email("patient@medicare.com")
                            .password(passwordEncoder.encode("patient123"))
                            .role(Role.ROLE_PATIENT)
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build()
            ));
            log.info("Default users seeded successfully (admin@medicare.com, doctor@medicare.com, patient@medicare.com).");
        }
    }
}
