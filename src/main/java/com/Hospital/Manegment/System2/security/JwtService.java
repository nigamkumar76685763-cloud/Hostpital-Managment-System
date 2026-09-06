package com.Hospital.Manegment.System2.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // 256-bit Base64-encoded Secret Encryption Key
    private static final String SECRET_KEY = "NDI0MzQ0NDU0NjQ3NDg0OTRhNGI0YzRkNGU0ZjUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YjVjNWQ1ZTVmNjA2MTYy";

    // 24 Hours Expiration Time in Milliseconds
    private static final long JWT_EXPIRATION = 1000L * 60 * 60 * 24;

    // 1. Token se Email / Username nikalna
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 2. Token se koi bhi specific Claim (property) nikalna
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 3. Simple UserDetails se Token banana
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // 4. Extra Claims (jaise Role) jod kar Token banana (JJWT 0.12.x standard)
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(getSignInKey())
                .compact();
    }

    // 5. Check karna ki Token Valid hai ya nahi
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // 6. Check karna ki Token Expire toh nahi hua
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 7. Token ki Expiry Date nikalna
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 8. Token ko Secret Key se verify karke saare Claims nikalna
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 9. Secret Key ko cryptographic key me badalna
    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
