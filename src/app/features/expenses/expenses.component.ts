import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Stelle sicher, dass der Pfad stimmt. Oft liegt Shared unter 'src/app/shared/components...'
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
  // ----------------------------------------------------
  // Teil 1: Services & Dialog Logic (aus HEAD)
  // ----------------------------------------------------
  private financesService = inject(FinancesService);
  isDialogOpen = false;

  // ----------------------------------------------------
  // Teil 2: Filter & Dropdown Logic (aus develop)
  // ----------------------------------------------------
  isCategoryOpen = false;
  isMonthOpen = false;
  isTypeOpen = false;

  selectedCategory = 'Alle Kategorien';
  selectedMonth = 'Alle Monate';
  selectedType = 'Alle Typen';
  selectedCategoryObject: any = { name: 'Alle Kategorien', color: 'transparent' };

  categories = [
    { name: 'Alle Kategorien', color: 'transparent' },
    { name: 'Miete', color: '#FF5733' },
    { name: 'Lebensmittel', color: '#27AE60' },
    { name: 'Transport', color: '#3498DB' },
    { name: 'Versicherung', color: '#F1C40F' },
    { name: 'Unterhaltung', color: '#9B59B6' },
    { name: 'Kleidung', color: '#E67E22' },
    { name: 'Gesundheit', color: '#E74C3C' },
    { name: 'Bildung', color: '#1ABC9C' },
    { name: 'Sonstiges', color: '#95A5A6' }
  ];

  months = [
    'Alle Monate',
    'Januar', 'Februar', 'März', 'April', 
    'Mai', 'Juni', 'Juli', 'August', 
    'September', 'Oktober', 'November', 'Dezember'
  ];

  types = ['Alle Typen', 'Fixe Ausgaben', 'Variable Ausgaben'];

  // ----------------------------------------------------
  // Methoden: Speichern (aus HEAD)
  // ----------------------------------------------------
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
        // Optional: Hier könntest du noch eine Methode aufrufen, um die Liste neu zu laden
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }

  // ----------------------------------------------------
  // Methoden: UI & Filter (aus develop)
  // ----------------------------------------------------
  toggleDropdown(type: string) {
    if (type === 'cat') this.isCategoryOpen = !this.isCategoryOpen;
    if (type === 'month') this.isMonthOpen = !this.isMonthOpen;
    if (type === 'type') this.isTypeOpen = !this.isTypeOpen;
  }

  selectItem(type: string, value: any) {
    if (type === 'cat') {
      this.selectedCategory = value.name;
      this.selectedCategoryObject = value;
      this.isCategoryOpen = false;
    } else if (type === 'month') {
      this.selectedMonth = value;
      this.isMonthOpen = false;
    } else if (type === 'type') {
      this.selectedType = value;
      this.isTypeOpen = false;
    }
  }
}