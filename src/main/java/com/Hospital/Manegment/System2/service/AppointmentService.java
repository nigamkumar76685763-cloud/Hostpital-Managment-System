package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.dto.AppointmentDTO;
import java.util.List;

public interface AppointmentService {

    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);

    List<AppointmentDTO> getAllAppointments();

    AppointmentDTO getAppointmentById(String id);

    AppointmentDTO updateAppointment(String id, AppointmentDTO appointmentDTO);

    String deleteAppointment(String id);
}
