import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RouterLink } from '@angular/router';
import User from './auth/user';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, LoadingComponent],
  templateUrl: 'app.component.html',

})
export class AppComponent implements OnInit {
  isLoading = true;

  authService: AuthService;
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
    this.isLoading = false;
  }


  title = 'crudAngular';
}
