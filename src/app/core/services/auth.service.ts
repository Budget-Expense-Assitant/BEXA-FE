// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, AuthResponse} from '../../features/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  
  // UserApi Controller (@RequestMapping("/api/v1/users"))
  private readonly API_URL = 'http://localhost:8080/api/v1/users'; 

  register(payload: RegisterRequest): Observable<AuthResponse> {
    // Post auf /create endpoint
    return this.http.post<AuthResponse>(`${this.API_URL}/create`, payload);
  }
}