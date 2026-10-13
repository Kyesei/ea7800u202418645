import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Observable} from 'rxjs';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {AquaticCentersApiEndpoint} from './aquatic-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';

@Service()
export class AquaticCentersService extends BaseApi {
  private http = inject(HttpClient);
  private centersEndpoint = new AquaticCentersApiEndpoint(this.http);
  private reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getCenters = (): Observable<AquaticCenter[]> =>
    this.centersEndpoint.getAll();

  getReservations = (): Observable<Reservation[]> =>
    this.reservationsEndpoint.getAll();

  createReservation = (item: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.create(item);

}
