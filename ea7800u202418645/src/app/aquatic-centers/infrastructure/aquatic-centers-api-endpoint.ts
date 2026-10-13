import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {AquaticCenterResource, AquaticCentersResponse} from './aquatic-centers-response';
import {AquaticCenterAssembler} from './aquatic-center-assembler';

export class AquaticCentersApiEndpoint extends BaseApiEndpoint<AquaticCenter, AquaticCenterResource, AquaticCentersResponse, AquaticCenterAssembler> {
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}/aquatic-centers`,
      new AquaticCenterAssembler());
  }
}
