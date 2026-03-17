import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'investigadores',
    loadComponent: () => import('./pages/investigadores/investigadores').then(m => m.Investigadores)
  },
  {
    path: 'projetos',
    loadComponent: () => import('./pages/projetos/projetos').then(m => m.Projetos)
  },
  {
    path: 'equipamentos',
    loadComponent: () => import('./pages/equipamentos/equipamentos').then(m => m.Equipamentos)
  },
  {
    path: 'detalhe/:tipo/:id',
    loadComponent: () => import('./pages/detalhe/detalhe').then(m => m.Detalhe)
  },
  {
    path: 'formulario/:tipo',
    loadComponent: () => import('./pages/formulario/formulario').then(m => m.Formulario)
  },
  {
    path: 'formulario/:tipo/:id',
    loadComponent: () => import('./pages/formulario/formulario').then(m => m.Formulario)
  },

    {
    path: 'auth',
    loadComponent: () => import('./auth/auth'). then(m => m.Auth)
  },
  
  {
    path: '**',
    redirectTo: 'dashboard'
  },


];
