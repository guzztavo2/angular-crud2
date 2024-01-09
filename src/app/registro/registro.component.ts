import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  public successModal = false;
  public loadingModal = false;
  public loadingModalComponent: any;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/g),
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  getPasswordValue(): string {
    return (
      this.registerForm.get('password') == null ||
      this.registerForm.get('password') == undefined
        ? ''
        : this.registerForm.get('password')?.value
    ) as string;
  }

  submitForm() {
    console.log(this);
    console.log(this.registerForm);
    alert('a');
  }

  ngOnInit(): void {
    this.loadingModal = true;
    console.log(this.loadingModalComponent);
    setTimeout(() => {
      this.loadingModal = false;
    }, 1000);
  }
}
