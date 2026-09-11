package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.DashboardAnalyticsDTO;
import com.Hospital.Manegment.System2.service.AnalyticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // Get Real-time Dashboard Analytics -> GET /api/analytics/dashboard
    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    public ResponseEntity<DashboardAnalyticsDTO> getDashboardAnalytics() {
        log.info("Fetching real-time hospital dashboard analytics");
        DashboardAnalyticsDTO analytics = analyticsService.getDashboardAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
