package com.Hospital.Manegment.System2.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsumerService {

// @KafkaListener(topics = KafkaProducerService.TOPIC, groupId = "hospital-group")
    public void consumeAppointmentEvent(String message) {
        log.info("📥 [KAFKA CONSUMER] Successfully received event from Kafka topic: {}", message);
        System.out.println("🎉 [KAFKA EVENT PROCESSED]: " + message);
    }
}
