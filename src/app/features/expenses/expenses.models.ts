export interface ExpenseRequest {
  id?: number;
  amount: number;
  date: string;
  target: string; 
  description: string;
  recurring: boolean;
  expenseStartDate?: string;
  expenseEndDate?: string;
}

export interface FinanceResponse {
  id: string;
  expenses: any[];
  // ... weitere Felder
}