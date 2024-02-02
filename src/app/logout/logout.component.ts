import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent {
  constructor(authService: AuthService, router: Router) {
    authService.logout();
    router.navigateByUrl('/');
  }
}
