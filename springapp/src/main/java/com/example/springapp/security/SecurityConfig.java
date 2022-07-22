package com.example.springapp.security;


import com.example.springapp.database.enums.Role;
import com.example.springapp.security.filters.JwtAuthenticationFilter;
import com.example.springapp.security.filters.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpHeaders.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String LOGIN_URL = "/user/login";

    private final AuthDetailsService authDetailsService;
    private final JwtManager jwtManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(AuthDetailsService authDetailsService, JwtManager jwtManager, PasswordEncoder passwordEncoder) {
        this.authDetailsService = authDetailsService;
        this.jwtManager = jwtManager;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager(), jwtManager, authDetailsService);
        jwtAuthenticationFilter.setFilterProcessesUrl(LOGIN_URL);

        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests().antMatchers(String.format("%s/**", LOGIN_URL), "/user/signup/**").permitAll();
        http.authorizeRequests().antMatchers("/admin/**").hasAnyAuthority(Role.ADMIN.name());
        http.authorizeRequests().antMatchers("/user/**").hasAnyAuthority(Role.CUSTOMER.name());
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(jwtAuthenticationFilter);
        http.addFilterBefore(new JwtAuthorizationFilter(jwtManager, authDetailsService), UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList(AUTHORIZATION, CACHE_CONTROL, CONTENT_TYPE));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}