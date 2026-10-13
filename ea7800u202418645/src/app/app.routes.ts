import {Routes} from '@angular/router';
const aquaticCentersRoutes = () => import('./aquatic-centers/aquatic-centers.routes').then(m => m.aquaticCentersRoutes);

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./shared/presentation/views/home/home').then(m => m.Home) },
  { path: 'reservations', loadChildren: aquaticCentersRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound) }
];
