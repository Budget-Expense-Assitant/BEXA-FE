import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage = signal('');
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(value => !value);
  }

  onSubmit() {
    this.errorMessage.set('');

    if (this.registerForm.valid) {
      const request: RegisterRequest = this.registerForm.getRawValue();

      this.authService.register(request).subscribe({
        next: (response) => {
          console.log('Registration success', response);
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Registration failed', err);
          if (err.status === 409) {
            this.errorMessage.set('Dieser Username ist bereits vergeben.');
          } else {
            this.errorMessage.set('Ein Fehler ist aufgetreten.');
          }
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}