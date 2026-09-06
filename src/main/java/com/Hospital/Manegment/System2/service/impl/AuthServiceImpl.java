package com.Hospital.Manegment.System2.service.impl;

import com.Hospital.Manegment.System2.dto.AuthRequest;
import com.Hospital.Manegment.System2.dto.AuthResponse;
import com.Hospital.Manegment.System2.dto.RegisterRequest;
import com.Hospital.Manegment.System2.entity.Role;
import com.Hospital.Manegment.System2.entity.UserEntity;
import com.Hospital.Manegment.System2.exception.ResourceNotFoundException;
import com.Hospital.Manegment.System2.repository.UserRepository;
import com.Hospital.Manegment.System2.security.JwtService;
import com.Hospital.Manegment.System2.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // 1. User Registration Logic
    @Override
    public AuthResponse register(RegisterRequest request) {
        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered: " + request.getEmail());
        }

        // Default Role: agar user ne role nahi diya toh ROLE_PATIENT
        Role userRole = request.getRole() != null ? request.getRole() : Role.ROLE_PATIENT;

        UserEntity user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // BCrypt Hashing
                .role(userRole)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        // JWT Token Generation with Role Claim
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().name());
        String jwtToken = jwtService.generateToken(extraClaims, user);

        return AuthResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole())
                .message("User registered successfully!")
                .build();
    }

    // 2. User Login Logic
    @Override
    public AuthResponse login(AuthRequest request) {
        // Spring Security Authentication (Validates BCrypt password)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // User fetch karo
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        // JWT Token Generate karo
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().name());
        String jwtToken = jwtService.generateToken(extraClaims, user);

        return AuthResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole())
                .message("Login successful!")
                .build();
    }
}
