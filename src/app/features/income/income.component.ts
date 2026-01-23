import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent {
  activeView: 'list' | 'prognose' = 'list';

  stats = {
    actual: 0.00,
    planned: 0.00
  };


  setView(view: 'list' | 'prognose') {
    this.activeView = view;
  }


  isActive(view: string): boolean {
    return this.activeView === view;
  }
}
