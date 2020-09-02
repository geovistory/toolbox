import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService';
import {REntityTypeDependencies} from './REntityTypeDependencies';
import {REntityTypeVal} from './REntityTypeService';
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService';
export class REntityTypeProviders extends Providers<REntityId> {
    rEntity: Provider<REntityId, REntityTypeVal, REntityId, REntity>;
    rEdges: Provider<REntityId, REntityTypeVal, REntityId, EntityFields>;
    rEntityLabel: Provider<REntityId, REntityTypeVal, REntityId, string>;
    dfhClassHasTypeProp: Provider<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: REntityTypeDependencies,
        protected receiverKey: REntityId
    ) {
        super()
        this.rEntity = this.registerProvider(dep.rEntity, receiverKey)
        this.rEntityLabel = this.registerProvider(dep.rEntityLabel, receiverKey);
        this.rEdges = this.registerProvider(dep.rEdge, receiverKey)
        this.dfhClassHasTypeProp = this.registerProvider(dep.dfhClassHasTypeProp, receiverKey)
    }

}

