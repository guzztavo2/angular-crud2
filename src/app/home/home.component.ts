import { Component } from '@angular/core';
import Informacao from '../Informacao/Informacao';
import { Modal } from '../modal/modal';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public modalAdicionar: Modal = {
    title: 'Sua requisição está sendo carregada! ⏳',
    description: '',
    canClose: true,
    showFooter: true,
    visibility: false,
    display: false,
    loadingIcon: false,
    redirect: false,
  };
  public informacoes: Informacao[];
  constructor() {
    this.informacoes = Informacao.get_all();
    this.modalAdicionar.display = true;
    this.modalAdicionar.visibility = true;
  }
}
