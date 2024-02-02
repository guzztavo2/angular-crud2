import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import User from '../auth/user';
import { Modal } from '../modal/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
})
export class ConfiguracaoComponent {
  private authService;
  public user: User;
  public configuracaoForm: FormGroup;

  constructor(authService: AuthService) {
    this.authService = authService;

    this.authService.login().subscribe();

    let user = User.getActualUser();

    if (user == null)
      this.user = new User('', '', '');

    this.user = user as User;

    this.configuracaoForm = new FormGroup({
      nomeUsuario: new FormControl(this.user.name, [
        Validators.minLength(5)
      ]),
      emailUsuario: new FormControl(this.user.email, [
        Validators.email,
      ]),

      senhaUsuario: new FormControl('', [Validators.required,
      ConfiguracaoComponent.checkPassword()]),
    });



  }

  static checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      console.log(control)
      alert("a");

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
      alert("a");
      return !passwordValid ? { passwordStrength: true } : null;
    }
  }

  submitForm() { }
}
