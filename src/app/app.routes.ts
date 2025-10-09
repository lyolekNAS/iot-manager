//src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MenuComponent } from '@app/menu';
import { DevicesComponent } from '@devices/devices';
import { DeviceComponent } from '@devices/device';
import { MeComponent } from '@user-info/me';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'device/:id', component: DeviceComponent },
  { path: 'user-info', component: MeComponent }
];
