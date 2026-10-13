import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./shared/presentation/views/home/home').then(m => m.Home) },
  { path: 'reservations'},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound) }
];
