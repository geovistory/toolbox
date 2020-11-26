import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService';
import {PEntityClassLabelDependencies} from './PEntityClassLabelDependencies';
import {PEntityClassLabelVal} from './PEntityClassLabelService';
import {PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService';

export class PEntityClassLabelProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityClassLabelVal, PEntityId, PEntity>;
    pClassLabels: Provider<PEntityId, PEntityClassLabelVal, PClassId, PClassLabelVal>;
    constructor(
        dep: PEntityClassLabelDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.entity, receiverKey)
        this.pClassLabels = this.registerProvider(dep.pClassLabel, receiverKey)
    }

}

