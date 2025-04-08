import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClinicaComponent } from './pages/clinica/clinica.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'clinicas/novo', component: ClinicaComponent, canActivate: [AuthGuard] },
  { path: 'clinicas/editar/:id', component: ClinicaComponent, canActivate: [AuthGuard] },
  { path: 'clinicas/visualizar/:id', component: ClinicaComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
