import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService';
import {PEntityTypeDependencies} from './PEntityTypeDependencies';
import {PEntityTypeVal} from './PEntityTypeService';
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService';
export class PEntityTypeProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityTypeVal, PEntityId, PEntity>;
    pEdges: Provider<PEntityId, PEntityTypeVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityTypeVal, PEntityId, string>;
    dfhClassHasTypeProp: Provider<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: PEntityTypeDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.pEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.pEntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.pEdge, receiverKey)
        this.dfhClassHasTypeProp = this.registerProvider(dep.dfhClassHasTypeProp, receiverKey)
    }

}

