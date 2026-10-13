import {BaseResource} from '../../shared/infrastructure/base-response';
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AquaticCenterResource} from './aquatic-centers-response';
import {AquaticCentersResponse} from './aquatic-centers-response';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';

export class AquaticCenterAssembler implements BaseAssembler<AquaticCenter, AquaticCenterResource, AquaticCentersResponse> {

  toEntitiesFromResponse = (response: AquaticCentersResponse): AquaticCenter[] =>
    response.centers.map(resource => this.toEntityFromResource(resource as AquaticCenterResource));

  toEntityFromResource = (resource: AquaticCenterResource): AquaticCenter =>
    new AquaticCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    })

  toResourceFromEntity = (entity: AquaticCenter): AquaticCenterResource =>
    ({
      id: entity.id,
      name: entity.name,
    })as AquaticCenter;

}
