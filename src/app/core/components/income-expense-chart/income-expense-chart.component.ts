import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-income-expense-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './income-expense-chart.component.html',
  styleUrl: './income-expense-chart.component.scss'
})
export class IncomeExpenseChartComponent implements OnInit, OnChanges {
  @Input() income: number = 0;
  @Input() expenses: number = 0;
  @Input() title: string = 'Finanzcheck im aktuellen Monat';

  public showPercentage: boolean = false;

  public balance: number = 0;
  public savingsRate: number = 0;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Finanzen'],
    datasets: []
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const raw = context.raw as number;
            return ` ${raw.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: '#e5e7eb' },
        beginAtZero: true
      }
    }
  };

  ngOnInit() {
    this.updateChart();
    this.calculateStats();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['income'] || changes['expenses']) {
      this.updateChart();
      this.calculateStats();
    }
  }

  toggleLabelMode() {
    this.showPercentage = !this.showPercentage;
  }

  private calculateStats() {
    this.balance = this.income - this.expenses;
    this.savingsRate = this.income > 0 ? (this.balance / this.income) * 100 : 0;
  }

  private calculateSmartMax(value: number): number {

    if (value < 50) return 50;
    if (value < 100) return 100;
    const bufferedValue = value * 1.1;

    if (value < 500) {
      return Math.ceil(bufferedValue / 100) * 100;
    } else {

      return Math.ceil(bufferedValue / 500) * 500;
    }
  }

  private updateChart() {
    var highestValue = Math.max(this.income, this.expenses);

    const dynamicMax = this.calculateSmartMax(highestValue);

    this.barChartOptions = {
      ...this.barChartOptions,
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          grid: { color: '#e5e7eb' },
          beginAtZero: true,
          max: dynamicMax
        }
      }
    };

    this.barChartData = {
      labels: ['Monatsübersicht'],
      datasets: [
        {
          data: [this.income],
          label: 'Einnahmen',
          backgroundColor: '#22c55e',
          hoverBackgroundColor: '#16a34a',
          borderRadius: 4,
          maxBarThickness: 60,
        },
        {
          data: [this.expenses],
          label: 'Ausgaben',
          backgroundColor: '#ef4444',
          hoverBackgroundColor: '#dc2626',
          borderRadius: 4,
          maxBarThickness: 60,
        }
      ]
    };
  }
}