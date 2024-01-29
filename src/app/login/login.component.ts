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
  public modalMessage: Modal = {
    title: 'Sua requisição está sendo carregada! ⏳',
    description: '',
    canClose: true,
    showFooter: true,
    visibility: false,
    display: false,
    loadingIcon: false,
    redirect: false,
  };

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  visibilityModal(val: boolean) {
    this.modalMessage.visibility = val;

    setTimeout(() => {
      this.modalMessage.display = val;
    }, 500);
  }
  submitForm() {
    this.loadingModal.display = true;
    this.loadingModal.visibility = true;

    new Promise((success, error) => {
      const user = User.getUserFromUsersList(
        this.loginForm.get('email')?.value as string,
        this.loginForm.get('password')?.value as string
      );
      if (user !== null) success(user as User);
      error('Não foi possível localizar o usuário.');
    })
      .then((user: any) => {
        user = user as User;
        this.modalMessage.title = 'Sucesso!';
        this.modalMessage.description = 'Bem vindo de volta, ' + user['name'];
        this.modalMessage.display = true;
        this.modalMessage.visibility = true;
      })
      .catch((error) => {
        this.modalMessage.title = error;
        this.modalMessage.description =
          'Não será possível acessar o painel de administrador, pois o usuário não foi identificado. Tente de novo mais tarde.';
        this.modalMessage.display = true;
        this.modalMessage.visibility = true;
      })
      .finally(() => {
        this.loadingModal.visibility = false;
        setTimeout(() => {
          this.loadingModal.display = false;
        }, 500);
      });
  }
}
