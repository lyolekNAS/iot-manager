import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: '/menu.html'
})
export class MenuComponent {
}
