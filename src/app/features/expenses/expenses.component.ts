import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseDialogComponent } from '../../core/components/expense-dialog/expense-dialog.component';
import { FinancesService, ExpenseRequest } from '../../core/services/finances.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ExpenseDialogComponent],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  private financesService = inject(FinancesService);
  
  isDialogOpen = false;

  onSaveExpense(dialogData: any) {
    // 1. User ID holen 🔑
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('Kein User eingeloggt! (userId fehlt im localStorage)');
      return;
    }

    // 2. Daten mappen (Frontend -> Backend)
    const fullDescription = dialogData.merchant 
      ? `${dialogData.merchant}: ${dialogData.description}` 
      : dialogData.description || 'Keine Beschreibung';

    const payload: ExpenseRequest = {
      amount: dialogData.amount,
      date: dialogData.date,
      target: dialogData.category,
      description: fullDescription,
      recurring: false
    };

    // 3. API Call Backend
    this.financesService.addExpense(userId, payload).subscribe({
      next: (res) => {
        console.log('Ausgabe gespeichert!', res);
        this.isDialogOpen = false;
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }
}