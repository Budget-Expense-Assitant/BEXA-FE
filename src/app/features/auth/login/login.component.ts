import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]], 
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = signal('');
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(value => !value);
  }

  onSubmit() {
    this.errorMessage.set('');

    if (this.loginForm.valid) {
      const request: LoginRequest = this.loginForm.getRawValue();

      this.authService.login(request).subscribe({
        next: (response) => {
          console.log('Login success', response);
          
          const token = response.bearerToken;
          const userId = response.userId; 

          if (token && userId) {
             localStorage.setItem('token', token);
             localStorage.setItem('userId', userId);

             this.router.navigate(['/dashboard']);
          } else {
             this.errorMessage.set('Fehler: Login-Daten unvollständig.');
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage.set('Benutzername oder Passwort falsch.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}