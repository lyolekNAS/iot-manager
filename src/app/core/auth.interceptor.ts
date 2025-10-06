import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { AppConfigService } from '@core/services/app-config.service';



export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const configService = inject(AppConfigService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const currentUrl = window.location.href;
        const redirectState = btoa(currentUrl); // закодуємо в base64

        document.cookie = `bffRedirectAfterLogin=${btoa(window.location.href)}; path=/;`;
        window.location.href = `${configService.apiBaseUrl}/oauth2/authorization/iot-manager`;
      }
      return throwError(() => err);
    })
  );
};
