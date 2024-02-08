import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Modal } from '../modal/modal';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import User from '../auth/user';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  public loadingModal: Modal = {
    title: 'Sua requisição está sendo carregada! ⏳',
    description: '',
    canClose: false,
    showFooter: false,
    visibility: false,
    display: false,
    loadingIcon: true,
    redirect: false,
    setVisibleModal: function (val: boolean): void {
    }
  };

  public messageModal: Modal = {
    title: 'Tudo certo, você foi registrado! ✔',
    description: 'Ao clicar em OK, você será redirecionado para o menu!',
    canClose: true,
    showFooter: true,
    visibility: false,
    display: false,
    loadingIcon: false,
    redirect: '/',
    setVisibleModal: function (val: boolean): void {
    }
  };

  private authService: AuthService;

  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;

    this.authService.login().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('/');
      }
    });
  }
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/g),
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  getPasswordValue(): string {
    return (
      this.registerForm.get('password') == null ||
        this.registerForm.get('password') == undefined
        ? ''
        : this.registerForm.get('password')?.value
    ) as string;
  }

  submitForm() {
    this.loadingModal.display = true;
    this.loadingModal.visibility = true;

    new Promise((success) => {
      setTimeout(() => {
        this.loadingModal.visibility = false;
        setTimeout(() => {
          this.loadingModal.display = false;
          success(true);
        }, 500);
      }, 1000);
    }).then((_) => {
      this.messageModal.display = true;
      this.messageModal.visibility = true;

      const user = new User(
        this.registerForm.get('name')?.value as string,
        this.registerForm.get('email')?.value as string,
        this.registerForm.get('password')?.value as string
      );
      User.setUser(user);
      this.loadingModal.visibility = false;
      setTimeout(() => {
        this.loadingModal.display = false;
      }, 500);

      this.messageModal.display = true;
      this.messageModal.visibility = true;
    });
  }
}
