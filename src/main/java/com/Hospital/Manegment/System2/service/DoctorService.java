package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.dto.DoctorDTO;
import java.util.List;

public interface DoctorService {

    DoctorDTO createDoctor(DoctorDTO doctorDTO);

    List<DoctorDTO> getAllDoctors();

    DoctorDTO getDoctorById(String id);

    DoctorDTO updateDoctor(String id, DoctorDTO doctorDTO);

    String deleteDoctor(String id);

    List<DoctorDTO> getDoctorsBySpecialization(String specialization);

    DoctorDTO toggleAvailability(String id, boolean available);
}
