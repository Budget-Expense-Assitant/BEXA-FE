import { Component, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

registerLocaleData(localeDe);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
  activeTab = 'Übersicht';
  activeTimeframe = 'Laufendes Jahr';
  title = 'Monatsvergleich';

  balance = 1250.50;
  savingsRate = 18.4;
  showPercentage = false;

  private labels = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  private income = [3250, 2900, 3100, 3500, 3400, 3250, 3100, 3200, 3050, 4200, 4500, 3250];
  private expenses = [2100, 2450, 1900, 2800, 2100, 2000, 2200, 2100, 2300, 2500, 3800, 2100];

  public chartDataH1: ChartData<'bar'> = { labels: [], datasets: [] };
  public chartDataH2: ChartData<'bar'> = { labels: [], datasets: [] };
  public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top' } },
    scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
  };

  ngOnInit() {
    this.updateCharts();
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  setTimeframe(time: string) {
    this.activeTimeframe = time;
    this.updateCharts();
  }

  private updateCharts() {
    const currentMonth = new Date().getMonth();

    this.chartDataH1 = {
      labels: this.labels.slice(0, 6),
      datasets: [
        { label: 'Einnahmen', backgroundColor: '#2ecc71', borderRadius: 6, data: this.income.slice(0, 6).map((v, i) => i <= currentMonth ? v : 0) },
        { label: 'Ausgaben', backgroundColor: '#FF6B6B', borderRadius: 6, data: this.expenses.slice(0, 6).map((v, i) => i <= currentMonth ? v : 0) }
      ]
    };

    this.chartDataH2 = {
      labels: this.labels.slice(6, 12),
      datasets: [
        { label: 'Einnahmen', backgroundColor: '#2ecc71', borderRadius: 6, data: this.income.slice(6, 12).map(() => 0) },
        { label: 'Ausgaben', backgroundColor: '#FF6B6B', borderRadius: 6, data: this.expenses.slice(6, 12).map(() => 0) }
      ]
    };

    this.barChartData = {
      labels: ['Aug', 'Sep', 'Okt', 'Nov', 'Dez', 'Jan'],
      datasets: [
        { label: 'Einnahmen', backgroundColor: '#2ecc71', borderRadius: 6, data: [3050, 3200, 3100, 4200, 4500, 3250] },
        { label: 'Ausgaben', backgroundColor: '#FF6B6B', borderRadius: 6, data: [2300, 2100, 2300, 2500, 3800, 2100] }
      ]
    };

    this.balance = this.activeTimeframe === 'Letzte 6 Monate' ? 1450.75 : 1250.50;
  }

  toggleLabelMode() { this.showPercentage = !this.showPercentage; }
}