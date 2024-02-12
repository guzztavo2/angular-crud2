import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  authService: AuthService;
  isLoading = true;
  public user!: User;
  constructor(authService: AuthService) {
    this.authService = authService;

    new Promise(resolve => {
      this.authService.currentUser.subscribe(user => {
        this.user = (user as any);
      })
      setTimeout(() => {
        resolve("");
      }, 500);
    }).finally(() => {
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    // this.isLoading = false;
  }


  title = 'crudAngular';
}
