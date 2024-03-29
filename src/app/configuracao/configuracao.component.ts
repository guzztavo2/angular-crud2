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
  public confirmPasssword: boolean = false;
  public loadingModal: Modal;
  public modalMessage: Modal;

  constructor(authService: AuthService) {

    this.loadingModal = new Modal('Sua requisição está sendo carregada! ⏳', '', false, false, false, false, true);
    this.modalMessage = new Modal('', '', true, true, false, false, false);

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

  atualizarUsuario() {
    this.loadingModal.display = true;
    this.loadingModal.visibility = true;

    new Promise(resolve => {
      const nomeUsuario = this.configuracaoForm.get("nomeUsuario");
      const emailUsuario = this.configuracaoForm.get("emailUsuario");
      const newPassword = this.configuracaoForm.get("newPassword");

      const check_value = (el: AbstractControl<any, any> | null) => {
        if (el !== null && el.value !== "" && el.value !== null) {
          return el.value;
        }
        return null;
      };

      let nome = check_value(nomeUsuario);
      let email = check_value(emailUsuario);
      let senha = check_value(newPassword);

      nome = nome == null ? this.user.name : nome;
      email = email == null ? this.user.email : email;
      senha = senha == null ? this.user.password : senha;

      User.removeFromID(this.user.id);

      const user = new User(nome, email, senha, this.user.id);

      this.user = user;

      User.removeActualUser();
      User.setUser(user);
      User.setActualUser(user);

      let nomeAux = nome == null ? "" : "Nome, ";
      let emailAux = email == null ? "" : "E-mail, ";
      let senhaAux = senha == null ? "" : "Senha, ";
      this.authService.updateUser(user);

      resolve(String(nomeAux + emailAux + senhaAux));
    }).then((user) => {
      this.modalMessage.title = "Usuário atualizado com sucesso ✔";
      this.modalMessage.description = "Seu usuário foi atualizado com sucesso!";

      this.modalMessage.display = true;
      this.modalMessage.visibility = true;
      this.modalMessage.redirect = '/';
    }).finally(() => {
      this.loadingModal.visibility = false;
      setTimeout(() => {
        this.loadingModal.display = false;
      })
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
      this.confirmPasssword = true;
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
