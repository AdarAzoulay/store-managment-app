import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.css']
})
export class SalesByMonthComponent {

  salesData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Revenue', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 },
      { label: 'Product Сost', data: [200, 100, 400, 50, 90], tension: 0.5 },
      { label: 'Profit', data: [500, 400, 350, 450, 650], tension: 0.5 },
    ],
  };
  
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };
}
