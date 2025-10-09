//src/app/devices.ts
import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaceControllerService } from '@core/api/api/placeController.service';


@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './devices.html'
})
export class DevicesComponent implements OnInit {
  places = signal<any[]>([]);

  constructor(
    private placeService: PlaceControllerService
  ) {}

  ngOnInit() {

    this.placeService.getAll().subscribe((data: any[]) => {
      this.places.set(data);
      console.log('Places:', this.places());
    });
  }
}
