import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityTimeSpanService, REntityTimeSpanVal} from './REntityTimeSpanService';
export class REntityTimeSpanProviders extends Providers<REntityId> {
    rEntity: Provider<REntityId, REntityTimeSpanVal, REntityId, REntity>;
    rEdges: Provider<REntityId, REntityTimeSpanVal, REntityId, EntityFields>;
    rEntityLabel: Provider<REntityId, REntityTimeSpanVal, REntityId, string>;
    dfhClassHasTypeProp: Provider<REntityId, REntityTimeSpanVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: REntityTimeSpanService,
        protected receiverKey: REntityId
    ) {
        super()
        this.rEntity = this.registerProvider(dep.depREntity, receiverKey)
        this.rEdges = this.registerProvider(dep.depREdge, receiverKey)
    }

}

