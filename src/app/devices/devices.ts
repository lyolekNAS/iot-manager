//src/app/devices.ts
import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaceControllerService } from '@core/api/api/placeController.service';


@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './devices.html'
})
export class DevicesComponent implements OnInit {
  places = signal<any[]>([]);
  loading = signal('');

  constructor(
    private placeService: PlaceControllerService
  ) {}

  ngOnInit() {
    this.loading.set('Завантаження');

    this.placeService.getAll().subscribe({
      next: (data) => {
        console.log('Places:', this.places());
        this.places.set(data);
        this.loading.set('');
      },
      error: (err) => {
        console.error('Помилка завантаження девайсів', err);
        this.loading.set(`Не вдалось завантажити: ${err.message} [${err.status}]`);
      },
      complete: () => {
        console.log('виклик complete');
        this.loading.set('');
      }
    });
  }
}
