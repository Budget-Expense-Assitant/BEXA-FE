import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout'; // Pfad ggf. checken
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';

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
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'ausgaben', 
        loadComponent: () => import('./features/expenses/expenses.component').then(m => m.ExpensesComponent) 
      },
      { 
        path: 'einnahmen', 
        loadComponent: () => import('./features/income/income.component').then(m => m.IncomeComponent) 
      },
      { 
        path: 'sparziele', 
        loadComponent: () => import('./features/savings/savings.component').then(m => m.SavingsComponent) 
      },
      { 
        path: 'uebersicht', 
        loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent) 
      },
      { 
        path: 'einstellungen', 
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) 
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];