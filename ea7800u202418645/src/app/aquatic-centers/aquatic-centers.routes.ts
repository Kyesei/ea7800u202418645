import {Routes} from '@angular/router';

export const aquaticCentersRoutes: Routes = [
  { path: 'new', loadComponent: () => import('./presentation/views/new-reservation/new-reservation').then(m => m.NewReservation) }
];
