import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, AuthResponse, LoginRequest, LoginResponse } from '../../features/auth/auth.models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = '/api/v1/users';
    private readonly API_URL_AUTH = '/api/v1/auth';

    register(payload: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/register`, payload, {
            withCredentials: true
        });
    }

    login(payload: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL_AUTH}/login`, payload, {
            withCredentials: true
        });
    }
}