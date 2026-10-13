import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface ReservationResource extends BaseResource {
  id: number;
  aquaticCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
export interface ReservationsResponse extends BaseResponse {
  reservations: ReservationResource[];
}
