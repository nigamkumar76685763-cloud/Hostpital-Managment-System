package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.DashboardAnalyticsDTO;
import com.Hospital.Manegment.System2.entity.DoctorEntity;
import com.Hospital.Manegment.System2.repository.AppointmentRepository;
import com.Hospital.Manegment.System2.repository.DoctorRepository;
import com.Hospital.Manegment.System2.repository.PatientRepository;
import com.Hospital.Manegment.System2.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public DashboardAnalyticsDTO getDashboardAnalytics() {
        long totalPatients = patientRepository.count();
        List<DoctorEntity> doctors = doctorRepository.findAll();
        long totalDoctors = doctors.size();
        long availableDoctors = doctors.stream().filter(DoctorEntity::isAvailable).count();

        long totalAppointments = appointmentRepository.count();
        long confirmed = appointmentRepository.countByStatus("CONFIRMED");
        long completed = appointmentRepository.countByStatus("COMPLETED");
        long cancelled = appointmentRepository.countByStatus("CANCELLED");

        Map<String, Long> statusMap = new HashMap<>();
        statusMap.put("CONFIRMED", confirmed);
        statusMap.put("COMPLETED", completed);
        statusMap.put("CANCELLED", cancelled);

        Map<String, Long> specMap = doctors.stream()
                .collect(Collectors.groupingBy(
                        d -> d.getSpecialization() != null ? d.getSpecialization() : "General",
                        Collectors.counting()
                ));

        // Consultation revenue calculation based on active appointments
        double revenue = (confirmed + completed) * 500.0;

        return DashboardAnalyticsDTO.builder()
                .totalPatients(totalPatients)
                .totalDoctors(totalDoctors)
                .availableDoctors(availableDoctors)
                .totalAppointments(totalAppointments)
                .appointmentsByStatus(statusMap)
                .estimatedConsultationRevenue(revenue)
                .specializationBreakdown(specMap)
                .build();
    }
}
