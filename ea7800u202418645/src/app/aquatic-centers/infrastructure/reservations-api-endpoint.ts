import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Reservation} from '../domain/model/reservation.entity';
import {ReservationResource, ReservationsResponse} from './reservations-response';
import {ReservationAssembler} from './reservation-assembler';

export class ReservationsApiEndpoint extends BaseApiEndpoint<Reservation, ReservationResource, ReservationsResponse, ReservationAssembler> {
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}/reservations`,
      new ReservationAssembler());
  }
}
