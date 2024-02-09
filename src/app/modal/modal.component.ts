import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Informacao from '../Informacao/Informacao';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() showFooter: boolean = true;
  @Input() canClose: boolean = true;
  @Input() loading: boolean = true;
  @Input() redirect: string | false = false;
  @Input() informacao: Informacao | undefined = undefined;
  @Input() modal_type: string | false = false;
  @Output() modalVisibleEvent = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<any>();

  public backDropVisibleClass: string = '';
  public modalVisibleClass: string = '';
  public dataAtualizacao: string | undefined = undefined;

  ngOnInit(): void {
    this.clickEvent();
    this.setModalVisibility(this.modalVisible);
    if (this.informacao !== undefined) {
      this.modalData = this.informacao.getName();
      this.dataAtualizacao = (new Date()).toLocaleString('br')
      setInterval(() => {
        this.dataAtualizacao = (new Date()).toLocaleString('br')
      }, 1000);
    }
  }

  clickEvent() {
    window.addEventListener('click', (e) => {
      if (
        ((e.target as HTMLObjectElement).classList.contains('modal_v2') ||
          (e.target as HTMLObjectElement).classList.contains('close-modal')) &&
        this.canClose
      ) {
        this.setModalVisibility(true);
      }
    });
  }

  private router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  setModalVisibility(modalVisible: boolean) {
    this.modalVisibleEvent.emit(!modalVisible);
    if (!modalVisible) {
      this.modalVisible = true;
      this.backDropVisibleClass = 'fade-in';
      this.modalVisibleClass = 'fade-in-top';
    } else {
      this.backDropVisibleClass = 'fade-out';
      this.modalVisibleClass = 'fade-out-top';
      setTimeout(() => {
        this.modalVisible = false;
        if (this.redirect !== false) {
          this.router.navigateByUrl(this.redirect);
        }
      }, 150);
    }
  }

  public modalData: string = "";
  saveInformation() {
    this.data.emit(this.modalData);
    this.setModalVisibility(true);
  }

  onlyNonNumeric() {
    this.modalData = this.modalData.replace(/\D/g, '');
    if (Number.parseInt(this.modalData) > 100) {
      this.modalData = '100';
    }
  }
}
