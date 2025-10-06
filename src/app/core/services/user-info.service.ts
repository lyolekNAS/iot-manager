import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '@core/services/app-config.service';

export interface UserInfo {
  sub: string;
  roles: string[];
  iss: string;
  nonce: string;
  userId: number;
  aud: string[];
  azp: string;
  surname: string;
  name: string;
  exp: string;
  iat: string;
  jti: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserInfoService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}

  getUserInfo(): Observable<UserInfo> {
    const apiUrl = `${this.appConfig.apiBaseUrl}/user-info`;
    return this.http.get<UserInfo>(apiUrl);
  }
}
