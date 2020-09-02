import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService';
import {REntityTimeSpanDependencies} from './REntityTimeSpanDependencies';
import {REntityTimeSpanVal} from './REntityTimeSpanService';
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService';
export class REntityTimeSpanProviders extends Providers<REntityId> {
    rEntity: Provider<REntityId, REntityTimeSpanVal, REntityId, REntity>;
    rEdges: Provider<REntityId, REntityTimeSpanVal, REntityId, EntityFields>;
    rEntityLabel: Provider<REntityId, REntityTimeSpanVal, REntityId, string>;
    dfhClassHasTypeProp: Provider<REntityId, REntityTimeSpanVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: REntityTimeSpanDependencies,
        protected receiverKey: REntityId
    ) {
        super()
        this.rEntity = this.registerProvider(dep.rEntity, receiverKey)
        this.rEdges = this.registerProvider(dep.rEdge, receiverKey)
    }

}

