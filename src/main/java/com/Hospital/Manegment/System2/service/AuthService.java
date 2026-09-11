package com.Hospital.Manegment.System2.service;

import com.Hospital.Manegment.System2.dto.AuthRequest;
import com.Hospital.Manegment.System2.dto.AuthResponse;
import com.Hospital.Manegment.System2.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(AuthRequest request);

    AuthResponse googleOAuthLogin(com.Hospital.Manegment.System2.dto.GoogleOAuthRequest request);
}
