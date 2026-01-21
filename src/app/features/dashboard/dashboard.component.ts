import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetChartComponent } from '../../core/components/asset-chart/asset-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AssetChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  chartLabels = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  chartData = [12500, 13200, 12800, 14500, 15100, 16250, 14000, 18000, 17500, 19000, 10000, 20000];
}