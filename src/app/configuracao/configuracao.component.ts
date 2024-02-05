import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
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
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent, FormsModule],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.css',
})
export class ConfiguracaoComponent {
  private authService;
  public user: User;
  public configuracaoForm: FormGroup;

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

  constructor(authService: AuthService) {
    this.authService = authService;

    this.authService.login().subscribe();

    let user = User.getActualUser();

    if (user == null)
      this.user = new User('', '', '');
    else
      this.user = user as User;

    this.configuracaoForm = new FormGroup({
      nomeUsuario: new FormControl(this.user.name, [
        Validators.minLength(5)
      ]),
      emailUsuario: new FormControl(this.user.email, [
        Validators.email
      ]),
      actualPassword: new FormControl(""),
      confirmActualPassword: new FormControl(""),
      newPassword: new FormControl(""),
      confirmNewPassword: new FormControl(""),
    });

  }


  confirmarSenha() {

    this.loadingModal.display = true;
    this.loadingModal.visibility = true;

    new Promise((resolve, error) => {
      const senha = this.configuracaoForm.get("actualPassword") as FormControl;
      const confirmarSenha = this.configuracaoForm.get("confirmActualPassword") as FormControl;

      if (senha.value == confirmarSenha.value) {
        const user = User.getUserFromUsersList(this.user.email, senha.value);

        if (user == null)
          error("Senha inválida.");

        resolve("Agora você pode preencher os novos campos de senha para trocar sua senha");
      } else {
        error("As senhas precisam ser iguais.");
      }
    }).then(success => {
      this.modalMessage.display = true;
      this.modalMessage.title = "Sucesso ao acessar sua senha";
      this.modalMessage.description = success as string;
      this.modalMessage.visibility = true;
    })
      .catch(reason => {
        this.modalMessage.display = true;
        this.modalMessage.title = "Erro ao trocar a senha";
        this.modalMessage.description = reason;
        this.modalMessage.visibility = true;
      }).finally(() => {
        this.loadingModal.display = false;
        this.loadingModal.visibility = false;
      });
  }
  visibilityModal(value: boolean) {
    this.modalMessage.visibility = value;
    setTimeout(() => {
      this.modalMessage.display = value;
    }, 250);
  }
  submitForm() { }
}
