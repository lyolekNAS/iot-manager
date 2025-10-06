//src/app/device.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { AppConfigService } from '@core/services/app-config.service';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}

  getAll(): Observable<any[]> {
    const baseUrl = `${this.appConfig.apiBaseUrl}/api/device`;
    return this.http.get<any[]>(`${baseUrl}/all`);
  }

}

