import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService';
import {PEntityClassLabelDependencies} from './PEntityClassLabelDependencies';
export class PEntityClassLabelProviders extends Providers<PEntityId> {
    entity: Provider<PEntityId, string, PEntityId, PEntity>;
    classLabels: Provider<PEntityId, string, PClassId, string>;
    constructor(
        dep: PEntityClassLabelDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.classLabels = this.registerProvider(dep.pClassLabel, receiverKey)
    }

}

