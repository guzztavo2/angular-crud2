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
  public modalEditar: Modal;
  public dataModal = null;
  public actual_page = 1;
  public per_page = 10;
  public editarInformacao: Informacao | undefined = undefined;
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

    this.modalEditar = new Modal();
    this.modalEditar.title = "";
    this.modalEditar.description = "";
    this.modalEditar.canClose = true;
    this.modalEditar.showFooter = true;
    this.modalEditar.visibility = false;
    this.modalEditar.display = false;
    this.modalEditar.loadingIcon = false;
    this.modalEditar.redirect = false;
    
    this.informacoes = this.paginateData(this.per_page, this.actual_page);

    this.editarInformacaoModal();

  }

  private paginateData(per_page: number, actualPage: number) {
    const data = Informacao.get_all();

    return data.slice((actualPage - 1) * per_page, actualPage * per_page);
  }

  public paginate() {
    const result = [];
    for (let n = 1; n <= Math.ceil(Informacao.get_all().length / this.per_page); n++) {
      result.push(n);
    }

    return result;
  }
  setPerPagePaginate(event: Event | null = null) {
    if (event !== null) {
      this.per_page = Number.parseInt((event.target as HTMLSelectElement).selectedOptions[0].getAttribute("value") as string);
      this.actual_page = 1;
    }
    this.informacoes = this.paginateData(this.per_page, this.actual_page);

  }
  setActualPage(data: number) {
    this.actual_page = data;
    this.informacoes = this.paginateData(this.per_page, this.actual_page);
  }
  adicionarInformacao() {
    this.modalAdicionar.setVisibleModal(true);
  }

  gerarInformacao() {
    this.modalGerar.setVisibleModal(true);
  }

  editarInformacaoModal() {
    this.editarInformacao = this.informacoes[0];
    this.modalEditar.setVisibleModal(true);
  }

  addInformation(data: string) {
    Informacao.create(data);
    this.informacoes = this.paginateData(this.per_page, this.actual_page);
  }

  generateInformations(data: string) {
    Informacao.generateInformations(Number.parseInt(data));
    this.informacoes = this.paginateData(this.per_page, this.actual_page);
  }

  editInformation(data: string) {
    if (this.editarInformacao !== undefined)
      Informacao.update((this.editarInformacao as Informacao).getId(), data);
  }
}
