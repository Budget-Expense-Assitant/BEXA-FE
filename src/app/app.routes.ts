import { Routes } from '@angular/router';

export const routes: Routes = [
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
  }
];
