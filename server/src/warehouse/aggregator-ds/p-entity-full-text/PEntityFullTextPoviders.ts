import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {EntityFields} from '../../primary-ds/PEdgeService';
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService';
import {PEntityFullTextDependencies} from './PEntityFullTextDependencies';
import {PEntityFullTextVal} from './PEntityFullTextService';
import {ClassId, DfhClassHasTypePropVal} from '../../primary-ds/DfhClassHasTypePropertyService';
export class PEntityFullTextProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityFullTextVal, PEntityId, ProjectEntity>;
    pEdges: Provider<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityFullTextVal, PEntityId, string>;
    dfhClassHasTypeProp: Provider<PEntityId, PEntityFullTextVal, ClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: PEntityFullTextDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.pEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.pEntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.pEdge, receiverKey)
        this.dfhClassHasTypeProp = this.registerProvider(dep.dfhClassHasTypeProp, receiverKey)
    }

}

