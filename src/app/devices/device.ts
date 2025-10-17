//src/app/device.ts
import { Component, OnInit, signal} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DeviceControllerService } from '@core/api/api/deviceController.service';
import { LoadingStatusEvent } from '@core/model/loadingStatusEvent';
import { PortComponent } from '@devices/port.component';


@Component({
  selector: 'app-device',
  standalone: true,
  templateUrl: './device.html',
  imports: [NgIf, NgFor, PortComponent]
})
export class DeviceComponent implements OnInit {
  device = signal<any | null>([]);
  id = signal<string>('');


  loading = signal<LoadingStatusEvent>({ msg: '', type: '' });

  constructor(
    private deviceService: DeviceControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.loading.set({msg: 'Невизначений id', type: 'err'});
        return;
      }

      this.id.set(id);
      this.loadDevice(id);
    });
  }

  private loadDevice(id: string) {
    this.loading.set({msg: 'Завантаження', type: 'load'});

    const numericId = Number(id);
    if (isNaN(numericId)) {
      this.loading.set({msg: `Некоректний id: ' + ${id}`, type: 'err'});
      return;
    }

    this.deviceService.getById(numericId).subscribe({
      next: (data) => {
        console.log('Loaded device:', data);
        this.device.set(data);
        this.loading.set({msg: '', type: ''});
      },
      error: (err) => {
        console.error('Error loading device', err);
        this.loading.set({msg: `Не вдалось завантажити: ${err.message} [${err.status}]`, type: 'err'});
      }
    });
  }

  refreshDevice(){
    this.loadDevice(this.id());
  }
}
