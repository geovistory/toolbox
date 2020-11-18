import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService';
import {REntityClassLabelDependencies} from './REntityClassLabelDependencies';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService';
import {REntityClassLabelVal} from './REntityClassLabelService';
export class REntityClassLabelProviders extends Providers<REntityId> {
    entity: Provider<REntityId, REntityClassLabelVal, REntityId, REntity>;
    rClassLabels: Provider<REntityId, REntityClassLabelVal, RClassId, RClassLabelValue>;
    constructor(
        dep: REntityClassLabelDependencies,
        protected receiverKey: REntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.rEntity, receiverKey)
        this.rClassLabels = this.registerProvider(dep.rClassLabel, receiverKey)
    }

}

