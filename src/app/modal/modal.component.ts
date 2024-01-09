import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Input() title: String = '';
  @Input() description: String = '';
  @Input() showFooter: Boolean = true;
  @Input() canClose: Boolean = true;
  @Input() loadingModal: boolean = true;
  public backDropVisibleClass: string = '';
  public modalVisibleClass: string = '';

  ngOnInit(): void {
    this.setModalVisibility(this.modalVisible);
    this.clickEvent();
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
  setModalVisibility(modalVisible: boolean) {
    if (!modalVisible) {
      this.modalVisible = true;
      setTimeout(() => {
        this.backDropVisibleClass = 'fade-in';
        this.modalVisibleClass = 'fade-in-top';
      }, 300);
    } else {
      this.backDropVisibleClass = 'fade-out';
      this.modalVisibleClass = 'fade-out-top';
      setTimeout(() => {
        this.modalVisible = false;
      }, 300);
    }
  }
}
