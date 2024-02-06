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
  public user!: User;
  constructor(authService: AuthService) {
    this.authService = authService;
    const user = authService.getUser();
    if (user !== false) this.user = user;
  }

  title = 'crudAngular';
}
