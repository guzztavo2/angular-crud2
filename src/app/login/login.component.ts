import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
 @Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
