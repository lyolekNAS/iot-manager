import { Component, Input, OnInit, signal, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chart.js/auto';
import { DeviceControllerService } from '@core/api/api/deviceController.service';


@Component({
  selector: 'app-port-chart',
  standalone: true,
  templateUrl: './port-chart.component.html',
  imports: [NgIf, BaseChartDirective]
})
export class PortChartComponent implements OnInit {
  @Input() portId!: number;
  @Input() isVisible?: boolean;
  onDate!: string;
  loading = signal('');

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Sensor value',
      borderColor: '#007bff',
      backgroundColor: 'rgba(0,123,255,0.3)',
      fill: true,
      tension: 0.3
    }]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Value' } }
    }
  };

    constructor(
      private deviceService: DeviceControllerService
    ) {}

  ngOnInit() {
    this.onDate = '2025-10-17';
  }

  loadHistory() {
    const numericId = Number(this.portId);
    if (isNaN(numericId)) {
      this.loading.set(`Некоректний id: ${this.portId}`);
      return;
    }
    this.deviceService.getPortHistory(numericId, this.onDate).subscribe({
      next: (data) => {
        this.lineChartData.labels = data.map(d => d.onTime ? new Date(d.onTime).toLocaleTimeString() : '—');
        this.lineChartData.datasets[0].data = data.map(d => typeof d.value === 'number' ? d.value : null);
      },
      error: (err) => {
        console.error('Error loading device', err);
        this.loading.set(`Не вдалось завантажити: ${err.message} [${err.status}]`);
      }
    });
  }
}
