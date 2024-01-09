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
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() showFooter: boolean = true;
  @Input() canClose: boolean = true;
  @Input() loading: boolean = true;

  public backDropVisibleClass: string = '';
  public modalVisibleClass: string = '';

  ngOnInit(): void {
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

  ngOnChanges(val: any) {
    if (val.modalVisible !== undefined) {
      this.setModalVisibility(val.modalVisible.currentValue);
    }
  }
}
