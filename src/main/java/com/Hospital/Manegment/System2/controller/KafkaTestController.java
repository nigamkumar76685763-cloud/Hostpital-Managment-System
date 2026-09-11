package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.kafka.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/kafka")
public class KafkaTestController {

    @Autowired
    private KafkaProducerService producerService;

    @GetMapping("/publish")
    public ResponseEntity<Map<String, String>> publishMessage(
            @RequestParam(value = "message", defaultValue = "Patient Rahul booked appointment with Dr. Sharma") String message) {

        producerService.sendAppointmentEvent(message);

        Map<String, String> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("topic", KafkaProducerService.TOPIC);
        response.put("sentMessage", message);
        response.put("note", "Message sent to Kafka Cloud! Check console for Consumer output.");

        return ResponseEntity.ok(response);
    }
}
