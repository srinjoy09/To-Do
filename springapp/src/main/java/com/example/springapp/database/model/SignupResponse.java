package com.example.springapp.database.model;

public class SignupResponse {
    private String access_token;
    private UserModel user;

    public SignupResponse(String access_token, UserModel user) {
        this.access_token = access_token;
        this.user = user;
    }

    public String getAccessToken() {
        return access_token;
    }

    public void setAccessToken(String access_token) {
        this.access_token = access_token;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}

