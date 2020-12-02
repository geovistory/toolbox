import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';
import {PEntityClassLabelService, PEntityClassLabelVal} from './PEntityClassLabelService';

export class PEntityClassLabelProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityClassLabelVal, PEntityId, PEntity>;
    pClassLabels: Provider<PEntityId, PEntityClassLabelVal, PClassId, PClassLabelVal>;
    constructor(
        dep: PEntityClassLabelService,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.depEntity, receiverKey)
        this.pClassLabels = this.registerProvider(dep.depPClassLabel, receiverKey)
    }

}

