import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService';
import {RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService';
import {REntityClassLabelService, REntityClassLabelVal} from './REntityClassLabelService';

export class REntityClassLabelProviders extends Providers<REntityId> {
    entity: Provider<REntityId, REntityClassLabelVal, REntityId, REntity>;
    rClassLabels: Provider<REntityId, REntityClassLabelVal, RClassId, RClassLabelValue>;
    constructor(
        dep: REntityClassLabelService,
        protected receiverKey: REntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.depREntity, receiverKey)
        this.rClassLabels = this.registerProvider(dep.depRClassLabel, receiverKey)
    }

}

