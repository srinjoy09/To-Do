package com.example.springapp.database.model;

public class SignupResponse {
    private String accessToken;
    private UserModel user;

    public SignupResponse(String accessToken, UserModel user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}

