import { Component, inject, OnInit } from '@angular/core'; // 1. OnInit importieren
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
export class ExpensesComponent implements OnInit { // 2. "implements OnInit" hinzufügen

  // ----------------------------------------------------
  // Services & State
  // ----------------------------------------------------
  private financesService = inject(FinancesService);

  isDialogOpen = false;
  expensesList: any[] = [];

  // ----------------------------------------------------
  // Filter & Dropdown Logic
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
    'Alle Monate', 'Januar', 'Februar', 'März', 'April',
    'Mai', 'Juni', 'Juli', 'August', 'September',
    'Oktober', 'November', 'Dezember'
  ];

  types = ['Alle Typen', 'Fixe Ausgaben', 'Variable Ausgaben'];

  isLoading = true;

  ngOnInit() {
    this.fetchExpenses();
  }

  fetchExpenses() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.isLoading = true;

    this.financesService.getFinances(userId).subscribe({
      next: (data) => {
        this.expensesList = data.expenses || [];
        this.isLoading = false;
        console.log('Ausgaben geladen:', this.expensesList);
      },
      error: (err) => {
        console.error('Konnte Ausgaben nicht laden', err);
        this.isLoading = false;
      }
    });
  }

  getCategoryColor(categoryName: string): string {
    const foundCat = this.categories.find(c => c.name === categoryName);
    return foundCat ? foundCat.color : '#999';
  }

  onSaveExpense(dialogData: any) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('Kein User eingeloggt!');
      return;
    }

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

    this.financesService.addExpense(userId, payload).subscribe({
      next: (res) => {
        console.log('Ausgabe gespeichert!', res);
        this.isDialogOpen = false;

        // 5. WICHTIG: Liste neu laden, damit die neue Ausgabe sofort erscheint
        this.fetchExpenses();
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }

  // ----------------------------------------------------
  // UI Helper
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