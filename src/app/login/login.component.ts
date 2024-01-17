import { Component } from '@angular/core';

import { RouterLink, Router } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import User from '../auth/user';
import { Modal } from '../modal/modal';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RegistroComponent,
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
  ],
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

  public loadingModal: Modal = {
    title: 'Sua requisição está sendo carregada! ⏳',
    description: '',
    canClose: false,
    showFooter: false,
    visibility: false,
    display: false,
    loadingIcon: true,
    redirect: false,
  };

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submitForm() {
    this.loadingModal.display = true;
    this.loadingModal.visibility = true;

    new Promise((ex) => {
      const user = User.getUserFromUsersList(
        this.loginForm.get('email')?.value as string,
        this.loginForm.get('password')?.value as string
      );
    });
  }
}
