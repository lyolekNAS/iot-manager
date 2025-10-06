//src/app/app.config.ts
import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '@app/app.routes';
import { AppConfigService } from '@core/services/app-config.service';

import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptorFn } from '@core/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    importProvidersFrom(HttpClientModule),
    importProvidersFrom(OAuthModule.forRoot()),

    provideHttpClient(withInterceptors([AuthInterceptorFn])),

    {
      provide: APP_INITIALIZER,
      useFactory: (configService: AppConfigService) => () => configService.loadConfig(),
      deps: [AppConfigService],
      multi: true
    } as Provider
  ]
};
