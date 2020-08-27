import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {EntityFields} from '../../primary-ds/PEdgeService';
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService';
import {PEntityTimeSpanDependencies} from './PEntityTimeSpanDependencies';
import {PEntityTimeSpanVal} from './PEntityTimeSpanService';
import {ClassId, DfhClassHasTypePropVal} from '../../primary-ds/DfhClassHasTypePropertyService';
export class PEntityTimeSpanProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityTimeSpanVal, PEntityId, ProjectEntity>;
    pEdges: Provider<PEntityId, PEntityTimeSpanVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityTimeSpanVal, PEntityId, string>;
    dfhClassHasTypeProp: Provider<PEntityId, PEntityTimeSpanVal, ClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: PEntityTimeSpanDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.pEntity, receiverKey)
        this.pEdges = this.registerProvider(dep.pEdge, receiverKey)
    }

}

