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
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent, LoadingComponent],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {

  loadingModal: Modal;
  messageModal: Modal;
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

    this.loadingModal = new Modal();
    this.messageModal = new Modal();

    this.loadingModal.title = 'Sua requisição está sendo carregada! ⏳';
    this.loadingModal.description = '';
    this.loadingModal.canClose = false;
    this.loadingModal.showFooter = false;
    this.loadingModal.visibility = false;
    this.loadingModal.display = false;
    this.loadingModal.loadingIcon = true;
    this.loadingModal.redirect = false;

    this.messageModal.title = 'Tudo certo, você foi registrado! ✔';
    this.messageModal.description = 'Ao clicar em OK, você será redirecionado para o menu!';
    this.messageModal.canClose = true;
    this.messageModal.showFooter = true;
    this.messageModal.visibility = false;
    this.messageModal.display = false;
    this.messageModal.loadingIcon = false;
    this.messageModal.redirect = '/';
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
    this.loadingModal.setVisibleModal(true);

    if (this.registerForm.status == 'VALID') {
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

        this.messageModal.title = 'Tudo certo, você foi registrado! ✔';
        this.messageModal.description = 'Ao clicar em OK, você será redirecionado para o menu!';
        this.messageModal.redirect = '/';

        this.messageModal.setVisibleModal(true);
      });
    } else {
      this.loadingModal.setVisibleModal(false);

      this.messageModal.title = "Você precisa preencher o formulário corretamente:";
      this.messageModal.description = "O formulário ainda não foi preenchido, assim que verificar os problemas, poderá prosseguir.";
      this.messageModal.redirect = false;
      this.messageModal.setVisibleModal(true);
    }
  }
}
