import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then(m => m.Auth)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'investigadores',
    loadComponent: () => import('./pages/investigadores/investigadores').then(m => m.Investigadores),
    canActivate: [authGuard]
  },
  {
    path: 'projetos',
    loadComponent: () => import('./pages/projetos/projetos').then(m => m.Projetos),
    canActivate: [authGuard]
  },
  {
    path: 'equipamentos',
    loadComponent: () => import('./pages/equipamentos/equipamentos').then(m => m.Equipamentos),
    canActivate: [authGuard]
  },
  {
    path: 'detalhe/:tipo/:id',
    loadComponent: () => import('./pages/detalhe/detalhe').then(m => m.Detalhe),
    canActivate: [authGuard]
  },
  {
    path: 'formulario/:tipo',
    loadComponent: () => import('./pages/formulario/formulario').then(m => m.Formulario),
    canActivate: [authGuard]
  },
  {
    path: 'formulario/:tipo/:id',
    loadComponent: () => import('./pages/formulario/formulario').then(m => m.Formulario),
    canActivate: [authGuard]
  },


  {
    path: '**',
    redirectTo: 'dashboard'
  },


];
