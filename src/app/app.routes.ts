import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout'; // Pfad ggf. checken
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExpensesComponent } from './features/expenses/expenses.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', component: DashboardComponent
      },
      { 
        path: 'ausgaben', component: ExpensesComponent
      } 
    ]
  },
  
  // Fallback
  { path: '**', redirectTo: 'login' }
];