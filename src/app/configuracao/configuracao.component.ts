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
  selector: 'app-configuracao',
  standalone: true,
  imports: [],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
})
export class ConfiguracaoComponent {
  private authService;
  public user;
  constructor(authService: AuthService) {
    this.authService = authService;

    this.authService.login().subscribe();
    this.user = User.getActualUser();
  }

  configuracaoForm = new FormGroup({
    nomeUsuario: new FormControl('gustavo_bonifacio2020@outlook.com', [
      Validators.required,
    ]),
    email: new FormControl('gustavo_bonifacio2020@outlook.com', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('gututeleS2010@', [Validators.required]),
  });

  submitForm() {}
}
