import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RouterLink } from '@angular/router';
import User from './auth/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService: AuthService;
  user!: User;
  constructor(authService: AuthService) {
    const result = User.getActualUser();
    if (result !== null) this.user = result;
    this.authService = authService;

    this.authService.login().subscribe();
  }
  title = 'crudAngular';
}
