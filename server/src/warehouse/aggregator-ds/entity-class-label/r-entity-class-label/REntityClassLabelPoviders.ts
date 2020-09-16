import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService';
import {REntityClassLabelDependencies} from './REntityClassLabelDependencies';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
export class REntityClassLabelProviders extends Providers<REntityId> {
    entity: Provider<REntityId, string, REntityId, REntity>;
    rClassLabels: Provider<REntityId, string, RClassId, string>;
    constructor(
        dep: REntityClassLabelDependencies,
        protected receiverKey: REntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.rClassLabels = this.registerProvider(dep.rClassLabel, receiverKey)
    }

}

