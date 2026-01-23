import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface passend zu deinem Java 'ExpenseRequest'
export interface ExpenseRequest {
  amount: number;
  date: string;       // Format: YYYY-MM-DD
  target: string;
  description: string;
  recurring: boolean;
  expenseStartDate?: string;
  expenseEndDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private http = inject(HttpClient);
  private readonly API_BASE = '/api/v1/users';

  addExpense(userId: string, payload: ExpenseRequest): Observable<any> {
    // URL: /api/v1/users/{userId}/finances/expenses
    return this.http.post(`${this.API_BASE}/${userId}/finances/expenses`, payload, {
      withCredentials: true
    });
  }

  getFinances(userId: string): Observable<any> {
    return this.http.get(`${this.API_BASE}/${userId}/finances`, {
      withCredentials: true
    });
  }
}