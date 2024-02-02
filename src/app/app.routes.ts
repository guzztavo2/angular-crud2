import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistroComponent } from './registro/registro.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'configuracoes',
    component: ConfiguracaoComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
