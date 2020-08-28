import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {PClassFieldVal, PClassId} from '../../primary-ds/PClassFieldsConfigService';
import {EntityFields} from '../../primary-ds/PEdgeService';
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService';
import {PEntityFullTextDependencies} from './PEntityFullTextDependencies';
import {PEntityFullTextVal} from './PEntityFullTextService';
import {PFieldId} from '../p-property-label/PPropertyLabelService';
export class PEntityFullTextProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityFullTextVal, PEntityId, ProjectEntity>;
    pEdges: Provider<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityFullTextVal, PEntityId, string>;
    pClassLabel: Provider<PEntityId, PEntityFullTextVal, PClassId, string>;
    pClassFields: Provider<PEntityId, PEntityFullTextVal, PClassId, PClassFieldVal>;
    pClassFieldLabel: Provider<PEntityId, PEntityFullTextVal, PFieldId, string>;

    constructor(
        dep: PEntityFullTextDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.pEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.pEntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.pEdge, receiverKey)
        this.pClassLabel = this.registerProvider(dep.pClassLabel, receiverKey)
        this.pClassFields = this.registerProvider(dep.pClassFields, receiverKey)
        this.pClassFieldLabel = this.registerProvider(dep.pClassFieldLabel, receiverKey)
    }

}

