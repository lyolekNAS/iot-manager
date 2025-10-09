//src/app/device.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '@core/services/app-config.service';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {
    this.baseUrl = `${this.appConfig.apiBaseUrl}/api/device`;
  }


  baseUrl = '';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getDevice(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`);
  }

}

