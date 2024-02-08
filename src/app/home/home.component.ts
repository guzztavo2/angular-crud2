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

  public modalAdicionar: Modal;

  public dataModal = null;

  public informacoes: Informacao[];
  constructor() {
    this.modalAdicionar = new Modal();
    this.modalAdicionar.title = "";
    this.modalAdicionar.description = "";
    this.modalAdicionar.canClose = true;
    this.modalAdicionar.showFooter = true;
    this.modalAdicionar.visibility = false;
    this.modalAdicionar.display = false;
    this.modalAdicionar.loadingIcon = false;
    this.modalAdicionar.redirect = false;

    this.informacoes = Informacao.get_all();
  }

  adicionarInformacao() {
    this.modalAdicionar.setVisibleModal(true);
  }

  addInformation(data: string) {
    Informacao.create(data);
    this.informacoes = Informacao.get_all();
  }
}
