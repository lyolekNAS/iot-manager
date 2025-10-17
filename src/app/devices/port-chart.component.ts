import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
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
  onDate!: string;
  loading = signal('');

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private _isVisible: boolean = false;
  @Input()
  set isVisible(value: boolean) {
    this._isVisible = value;
    if (this._isVisible) {
      this.loadHistory();
    }
  }

  get isVisible(): boolean {
    return this._isVisible;
  }



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
    this.onDate = this.formatDate(new Date());
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addDay(day: number): void {
    const currentDate = new Date(this.onDate);
    currentDate.setDate(currentDate.getDate() + day);
    this.onDate = this.formatDate(currentDate);
    this.loadHistory();
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
        this.chart?.update();
      },
      error: (err) => {
        console.error('Error loading device', err);
        this.loading.set(`Не вдалось завантажити: ${err.message} [${err.status}]`);
      }
    });
  }
}
