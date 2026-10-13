import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';

export interface AquaticCenterResource extends BaseResource {
  id:number;
  activityType:string;
  name: string;
  capacity:number;
  latitude:number;
  longitude:number;
}

export interface AquaticCentersResponse extends BaseResponse {
  centers:AquaticCenterResource[];
}
