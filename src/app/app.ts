// src/app/app.ts
import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage, NgIf } from '@angular/common';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgOptimizedImage, NgIf],
  templateUrl: '/app.html'
})
export class App {
  constructor(public notificationService: NotificationService) {}
}
