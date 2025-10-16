//src/app/device.ts
import { Component, OnInit, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeviceControllerService } from '@core/api/api/deviceController.service';
import { PortView } from '@core/api/model/portView';


@Component({
  selector: 'app-device',
  standalone: true,
  templateUrl: './device.html',
  imports: [NgIf, NgFor, FormsModule]
})
export class DeviceComponent implements OnInit {
  device = signal<any | null>([]);
  id = signal<string>("");

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

  refreshDevice(){
    this.loadDevice(this.id());
  }

  updatePort(port: PortView) {
    this.loading.set('Завантаження');

    this.deviceService.updatePort(port.id!, port.value!).subscribe({
      next: () => {
        console.log(`${port.name} змінено`);
        this.loading.set(``);
      },
      error: (err) => {
        console.error(`❌ Не вдалось змінити ${port.name}:`, err);
        this.loading.set(`Не вдалось оновити: ${err.message} [${err.status}]`);
      },
    });
  }
}
