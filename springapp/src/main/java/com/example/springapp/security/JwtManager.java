package com.example.springapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.stream.Collectors;

@Component
@ConfigurationProperties(prefix = "application.jwt")
public class JwtManager {

    private String secretKey;
    private String tokenPrefix;
    private Integer accessTokenExpirationAfterDays;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getTokenPrefix() {
        return tokenPrefix;
    }

    public void setTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;
    }

    public Integer getAccessTokenExpirationAfterDays() {
        return accessTokenExpirationAfterDays;
    }

    public void setAccessTokenExpirationAfterDays(Integer accessTokenExpirationAfterDays) {
        this.accessTokenExpirationAfterDays = accessTokenExpirationAfterDays;
    }

    public Algorithm getAlgorithm() {
        return Algorithm.HMAC256(getSecretKey().getBytes());
    }

    public String generateAccessToken(String email, String requestUrl, Collection<? extends GrantedAuthority> authorities){
        String accessToken = JWT.create()
                .withSubject(email)
                .withExpiresAt(Date.valueOf(LocalDate.now().plusDays(getAccessTokenExpirationAfterDays())))
                .withIssuer(requestUrl)
                .withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(getAlgorithm());
        return accessToken;
    }
}
