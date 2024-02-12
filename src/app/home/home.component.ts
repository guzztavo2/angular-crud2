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
  public deletarModal: Modal;
  public dataModal = null;
  public actual_page = 1;
  public per_page = 10;
  public editarInformacao: Informacao | undefined = undefined;
  public deletarInformacao: Informacao | undefined = undefined;
  public informacoes: Informacao[];
  public buscarInformacao: string = "";
  public sortBy: string[] = ["id", "asc"];
  public pagination: number[] = [];
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

    this.deletarModal = new Modal();
    this.deletarModal.title = "";
    this.deletarModal.description = "";
    this.deletarModal.canClose = true;
    this.deletarModal.showFooter = true;
    this.deletarModal.visibility = false;
    this.deletarModal.display = false;
    this.deletarModal.loadingIcon = false;
    this.deletarModal.redirect = false;

    this.informacoes = this.paginateData(this.per_page, this.actual_page);
  }

  private paginateData(per_page: number, actualPage: number) {
    var data;

    if (this.sortBy[0] == "id" && this.sortBy[1] == "asc")
      data = Informacao.get_all().sort((a, b) => a.getId() < b.getId() ? -1 : a.getId() > b.getId() ? 1 : 0);
    else if (this.sortBy[0] == "id" && this.sortBy[1] == "desc")
      data = Informacao.get_all().sort((a, b) => a.getId() < b.getId() ? 1 : a.getId() > b.getId() ? -1 : 0);

    else if (this.sortBy[0] == "name" && this.sortBy[1] == "asc")
      data = Informacao.get_all().sort((a, b) => a.getName() < b.getName() ? -1 : a.getName() > b.getName() ? 1 : 0);
    else if (this.sortBy[0] == "name" && this.sortBy[1] == "desc")
      data = Informacao.get_all().sort((a, b) => a.getName() < b.getName() ? 1 : a.getName() > b.getName() ? -1 : 0);

    else if (this.sortBy[0] == "created_at" && this.sortBy[1] == "asc")
      data = Informacao.get_all().sort((a, b) => a.getCreatedAt() < b.getCreatedAt() ? -1 : a.getCreatedAt() > b.getCreatedAt() ? 1 : 0);
    else if (this.sortBy[0] == "created_at" && this.sortBy[1] == "desc")
      data = Informacao.get_all().sort((a, b) => a.getCreatedAt() < b.getCreatedAt() ? 1 : a.getCreatedAt() > b.getCreatedAt() ? -1 : 0);

    else if (this.sortBy[0] == "updated_at" && this.sortBy[1] == "asc")
      data = Informacao.get_all().sort((a, b) => {
        if (a.getUpdatedAt() === null || a.getUpdatedAt() === undefined)
          return 1;
        else if (b.getUpdatedAt() === null || b.getUpdatedAt() === undefined)
          return -1;

        if (a.getUpdatedAt() < b.getUpdatedAt())
          return -1
        else if (a.getUpdatedAt() > b.getUpdatedAt())
          return 1;

        return 0;
      });
    else if (this.sortBy[0] == "updated_at" && this.sortBy[1] == "desc")
      data = Informacao.get_all().sort((a, b) => {
        if (a.getUpdatedAt() === null || a.getUpdatedAt() === undefined)
          return -1;
        else if (b.getUpdatedAt() === null || b.getUpdatedAt() === undefined)
          return 1;

        if (a.getUpdatedAt() < b.getUpdatedAt())
          return 1
        else if (a.getUpdatedAt() > b.getUpdatedAt())
          return -1;

        return 0;
      });

    if (this.buscarInformacao !== "")
      data = (data as Informacao[]).filter((str) => { return str.getName().indexOf((this.buscarInformacao as string)) !== -1; });

    this.paginate((data as Informacao[]));
    return (data as Informacao[]).slice((actualPage - 1) * per_page, actualPage * per_page);
  }

  private paginate(data: Informacao[]) {
    const result = [];
    for (let n = 1; n <= Math.ceil(data.length / this.per_page); n++) {
      result.push(n);
    }

    this.pagination = result;
  }

  public setSortBy(value: string, sortBy: string) {
    this.sortBy[0] = value;
    this.sortBy[1] = sortBy;
    console.log(this.sortBy);
    this.actual_page = 1;
    this.informacoes = this.paginateData(this.per_page, this.actual_page);
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

  editarInformacaoModal(informacao: Informacao) {
    this.editarInformacao = informacao;
    this.modalEditar.setVisibleModal(true);
  }

  deletarInformacaoModal(informacao: Informacao) {
    this.deletarInformacao = informacao;
    this.deletarModal.setVisibleModal(true);
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
  deleteInformation(data: string) {
    if (this.deletarInformacao !== undefined)
      this.deletarInformacao.delete();

    this.deletarInformacao = undefined;
    this.informacoes = this.paginateData(this.per_page, this.actual_page);
  }

  buscarInformacaoFunc(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.buscarInformacao = value;
    this.informacoes = this.paginateData(this.per_page, this.actual_page);
  }
}
