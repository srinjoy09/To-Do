package com.example.springapp.security;


import com.example.springapp.database.entities.User;
import com.example.springapp.database.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@Service
public class AuthDetailsService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByEmail(email);

        user.orElseThrow(() -> new UsernameNotFoundException("User Not found: " + email));

        User authUser = user.get();

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(authUser.getRole().name()));

        return new org.springframework.security.core.userdetails.User(authUser.getEmail(), authUser.getPassword(), authorities);
    }

    public User loadUserByEmail(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepo.findByEmail(email);

        userOptional.orElseThrow(() -> new UsernameNotFoundException("User Not Found: " + email));

        return userOptional.get();
    }
}
