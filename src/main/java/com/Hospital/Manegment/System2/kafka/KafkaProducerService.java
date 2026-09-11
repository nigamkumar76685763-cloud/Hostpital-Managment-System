package com.Hospital.Manegment.System2.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaProducerService {

    public static final String TOPIC = "hospital-appointments";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendAppointmentEvent(String message) {
        log.info("[KAFKA PRODUCER] Sending event to topic '{}': {}", TOPIC, message);
        kafkaTemplate.send(TOPIC, message);
    }
}
