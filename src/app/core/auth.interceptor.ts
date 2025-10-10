import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { from, of, throwError, EMPTY } from 'rxjs';
import { AppConfigService } from '@core/services/app-config.service';
import { NotificationService } from '@core/services/notification.service';



export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const configService = inject(AppConfigService);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const currentUrl = window.location.href;
        const redirectState = btoa(currentUrl); // закодуємо в base64

        document.cookie = `bffRedirectAfterLogin=${btoa(window.location.href)}; path=/;`;
        window.location.href = `${configService.apiBaseUrl}/oauth2/authorization/iot-manager`;
      } else if (err.status === 403) {
        console.log("У вас немає доступу");
        notificationService.showAccessDenied("У вас немає доступу");
        return EMPTY;
      }
      return throwError(() => err);
    })
  );
};
