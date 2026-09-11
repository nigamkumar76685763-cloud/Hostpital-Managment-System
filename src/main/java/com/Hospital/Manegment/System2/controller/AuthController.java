package com.Hospital.Manegment.System2.controller;

import com.Hospital.Manegment.System2.dto.AuthRequest;
import com.Hospital.Manegment.System2.dto.AuthResponse;
import com.Hospital.Manegment.System2.dto.RegisterRequest;
import com.Hospital.Manegment.System2.service.AuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 1. User Registration -> POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Registration request received for email: {} with role: {}", request.getEmail(), request.getRole());
        AuthResponse response = authService.register(request);
        log.info("User successfully registered: {}", response.getEmail());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        log.info("Authentication attempt for email: {}", request.getEmail());
        AuthResponse response = authService.login(request);
        log.info("User {} successfully logged in with role: {}", response.getEmail(), response.getRole());
        return ResponseEntity.ok(response);
    }

    // 3. Google OAuth Login / Instant Token Generation -> POST /api/auth/google
    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@Valid @RequestBody com.Hospital.Manegment.System2.dto.GoogleOAuthRequest request) {
        log.info("Google OAuth login request for email: {}", request.getEmail());
        AuthResponse response = authService.googleOAuthLogin(request);
        log.info("User {} successfully authenticated via Google OAuth", response.getEmail());
        return ResponseEntity.ok(response);
    }
}
