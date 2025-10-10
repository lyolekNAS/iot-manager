//src/app/device.ts
import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DeviceControllerService } from '@core/api/api/deviceController.service';


@Component({
  selector: 'app-device',
  standalone: true,
  templateUrl: './device.html',
  imports: [NgIf]
})
export class DeviceComponent implements OnInit {
  device = signal<any | null>([]);
  id = signal<string | null>(null);
  loading = signal('');

  constructor(
    private deviceService: DeviceControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.loading.set('Невизначений id');
        return;
      }

      this.id.set(id);
      this.loadDevice(id);
    });
  }

  private loadDevice(id: string) {
    this.loading.set('Завантаження');

    const numericId = Number(id);
    if (isNaN(numericId)) {
      this.loading.set(`Некоректний id: ${id}`);
      return;
    }

    this.deviceService.getById(numericId).subscribe({
      next: (data) => {
        console.log('Loaded device:', data);
        this.device.set(data);
        this.loading.set('');
      },
      error: (err) => {
        console.error('Error loading device', err);
        this.loading.set(`Не вдалось завантажити: ${err.message} [${err.status}]`);
      }
    });
  }
}
