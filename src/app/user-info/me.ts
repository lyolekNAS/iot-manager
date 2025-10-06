import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UserInfoService, UserInfo } from '@core/services/user-info.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './me.html'
})
export class MeComponent implements OnInit {
  userInfo = signal<UserInfo | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit(): void {
    this.userInfoService.getUserInfo().subscribe({
      next: data => {
        this.userInfo.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.error.set('Не вдалося завантажити інформацію про користувача');
        this.loading.set(false);
      }
    });
  }
}
