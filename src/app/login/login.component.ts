import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(authService: AuthService, router: Router) {
    authService.login().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigateByUrl('/');
      }
    });
  }
}
