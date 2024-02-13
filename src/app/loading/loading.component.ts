import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      // this.isLoading = false;
    }, 1000);
  }
  @Input() isLoading: boolean = true;
}
