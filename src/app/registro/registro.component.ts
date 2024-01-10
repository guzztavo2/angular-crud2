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
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  // public successModal: Modal;
  public loadingModal: Modal = {
    title: 'Sua requisição está sendo carregada! ⏳',
    description: '',
    canClose: false,
    showFooter: false,
    visibility: false,
    display: false,
    loadingIcon: true,
  };
  private authService: AuthService;
  private router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
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
    console.log(this);
    console.log(this.registerForm);
    this.loadingModal.display = true;
    this.loadingModal.visibility = true;

    User.setUser(
      new User(
        this.registerForm.get('name')?.value as string,
        this.registerForm.get('email')?.value as string,
        this.registerForm.get('password')?.value as string
      )
    );
    // this.router.navigateByUrl('/');
  }
}
