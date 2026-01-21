import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})

export class ExpensesComponent {
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

  toggleDropdown(type: string) {
    if (type === 'cat') this.isCategoryOpen = !this.isCategoryOpen;
    if (type === 'month') this.isMonthOpen = !this.isMonthOpen;
    if (type === 'type') this.isTypeOpen = !this.isTypeOpen;
  }

  // Verarbeitet die Auswahl
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