//src/app/devices.ts
import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeviceService } from '@core/services/device.service';


@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './devices.html'
})
export class DevicesComponent implements OnInit {
  devices = signal<any[]>([]);

  constructor(
    private deviceService: DeviceService
  ) {}

  ngOnInit() {

    this.deviceService.getAll().subscribe((data: any[]) => {
      this.devices.set(data);
      console.log('Devices:', this.devices());
    });
  }
}
