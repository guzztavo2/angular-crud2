import { Component } from '@angular/core';
import Informacao from '../Informacao/Informacao';
import { Modal } from '../modal/modal';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public modalAdicionar: Modal;
  public modalGerar: Modal;
  public dataModal = null;
  public actual_page = 1;

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

    this.modalGerar = new Modal();
    this.modalGerar.title = "";
    this.modalGerar.description = "";
    this.modalGerar.canClose = true;
    this.modalGerar.showFooter = true;
    this.modalGerar.visibility = false;
    this.modalGerar.display = false;
    this.modalGerar.loadingIcon = false;
    this.modalGerar.redirect = false;


    this.informacoes = this.paginateData(10, 1);
  }

  private paginateData(per_page: number, actualPage: number) {
    const data = Informacao.get_all();
    return data.slice((actualPage - 1) * per_page, actualPage * per_page);
  }

  setPaginate(event = null) {
    let per_page = 10;

    if (event !== null) {
      per_page = (event as any).target.selectedOptions[0].getAttribute('value');
    }

    this.informacoes = this.paginateData(per_page, 1);
  }
  adicionarInformacao() {
    this.modalAdicionar.setVisibleModal(true);
  }

  gerarInformacao() {
    this.modalGerar.setVisibleModal(true);
  }
  addInformation(data: string) {
    Informacao.create(data);
    this.informacoes = Informacao.get_all();
  }

  generateInformations(data: string) {
    Informacao.generateInformations(Number.parseInt(data));
    this.informacoes = Informacao.get_all();
  }
}
