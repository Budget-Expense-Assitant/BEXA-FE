import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent {
  totalSaved = 0.00;
  totalGoal = 0.00;
  activeGoalsCount = 0;
  
  savingsGoals: any[] = [];

  openNewGoalModal() {
    console.log('Modal für neues Sparziel öffnen');
  }
}