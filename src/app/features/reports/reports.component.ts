import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  activeTab = 'Übersicht';
  activeTimeframe = 'Laufendes Jahr';

  setTab(tab: string) { this.activeTab = tab; }
  setTimeframe(time: string) { this.activeTimeframe = time; }
}
