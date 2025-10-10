// src/app/core/services/notification.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  public accessDenied = signal<string | null>(null);

  showAccessDenied(message: string) {
    this.accessDenied.set(message);
  }

  clear() {
    this.accessDenied.set(null);
  }
}
