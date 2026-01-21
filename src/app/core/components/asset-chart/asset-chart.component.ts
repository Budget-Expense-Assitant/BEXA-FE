import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-asset-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())], // Chart.js registrieren
  templateUrl: './asset-chart.component.html',
  styleUrl: './asset-chart.component.scss'
})
export class AssetChartComponent implements OnInit {
  @Input() labels: string[] = []; // Z.B. ['Jan', 'Feb', 'März']
  @Input() data: number[] = [];   // Z.B. [1500, 2300, 2100]
  @Input() label: string = 'Gesamtvermögen';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4, // Glatte Kurve
        borderColor: '#6366f1', // Indigo style
        borderWidth: 2,
        fill: 'origin', // Optional: Fläche unter der Linie füllen
        backgroundColor: 'rgba(99, 102, 241, 0.2)' // Leichter Schleier drunter
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#4338ca'
      }
    },
    interaction: {
      mode: 'index', // Zeigt Tooltip für alle Punkte auf der X-Achse
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false } // Kein vertikales Gitter
      },
      y: {
        grid: { color: '#e5e7eb' }, // Dezentes horizontales Gitter
        beginAtZero: false // Skaliert dynamisch mit dem Vermögen
      }
    },
    plugins: {
      tooltip: {
        enabled: true,  
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 14, weight: 'bold' },
        padding: 10,
        callbacks: {
          label: (context) => ` ${context.parsed.y !== null ? context.parsed.y.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) : '0'}`
        }
      },
      legend: { display: true, position: 'top' }
    }
  };

  ngOnInit() {
    // Initialdaten mappen
    this.updateChart();
  }

  // Helper falls sich Daten ändern (z.B. durch Filter)
  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    this.lineChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          label: this.label,
        }
      ]
    };
  }
}