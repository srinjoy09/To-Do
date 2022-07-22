package com.example.springapp.security.filters;

import com.example.springapp.database.model.UserModel;
import com.example.springapp.security.AuthDetailsService;
import com.example.springapp.security.JwtManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtManager jwtManager;
    private final AuthDetailsService authDetailsService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtManager jwtManager, AuthDetailsService authDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtManager = jwtManager;
        this.authDetailsService = authDetailsService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();
        String accessToken = jwtManager.generateAccessToken(user.getUsername(), request.getRequestURL().toString(), user.getAuthorities());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("access_token", accessToken);
        com.example.springapp.database.entities.User authenticatedUser = authDetailsService.loadUserByEmail(user.getUsername());
        UserModel userResponseDetails = new UserModel(authenticatedUser.getEmail(), authenticatedUser.getUserName(), null, authenticatedUser.getRole());
        resultMap.put("user", userResponseDetails);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), resultMap);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("error_message", "Incorrect Email or Password");
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(FORBIDDEN.value());
        new ObjectMapper().writeValue(response.getOutputStream(), resultMap);
    }
}
