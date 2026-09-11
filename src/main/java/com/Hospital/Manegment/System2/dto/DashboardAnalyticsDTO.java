package com.Hospital.Manegment.System2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardAnalyticsDTO {
    private long totalPatients;
    private long totalDoctors;
    private long availableDoctors;
    private long totalAppointments;
    private Map<String, Long> appointmentsByStatus;
    private Double estimatedConsultationRevenue;
    private Map<String, Long> specializationBreakdown;
}
