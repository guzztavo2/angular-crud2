import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
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
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private router: Router;
  private authService: AuthService;
  constructor(authService: AuthService, router: Router) {
    this.router = router;
    this.authService = authService;

    this.authService.login().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/');
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
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
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

    if (this.loginForm.status !== 'VALID') {
      this.loadingModal.visibility = false;
      this.loadingModal.display = false;

      this.modalMessage.title = 'Dados inválidos! ☹';
      this.modalMessage.description =
        'Lembre-se de preencher todo o formulário antes de acessar sua conta!';
      this.modalMessage.display = true;
      this.modalMessage.visibility = true;
    } else {
      new Promise((success, error) => {
        const user = User.getUserFromUsersList(
          this.loginForm.get('email')?.value as string,
          this.loginForm.get('password')?.value as string
        );
        if (user !== null) success(user as User);
        error('Não foi possível localizar o usuário.');
      })
        .then((user: any) => {
          User.setActualUser(user);
          this.authService.login().subscribe((val) => {
            if (val) {
              this.router.navigateByUrl('/');
            }
          });
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
}
