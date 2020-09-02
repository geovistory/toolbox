import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {ProClassFieldVal, PClassId} from '../../primary-ds/ProClassFieldsConfigService';
import {EntityFields} from "../../primary-ds/edge/edge.commons";
import {PEntityId, PEntity} from '../../primary-ds/entity/PEntityService';
import {PEntityFullTextDependencies} from './PEntityFullTextDependencies';
import {PEntityFullTextVal} from './PEntityFullTextService';
import {PClassFieldId} from '../class-field-label/p-class-field-label/PClassFieldLabelService';
export class PEntityFullTextProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityFullTextVal, PEntityId, PEntity>;
    pEdges: Provider<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityFullTextVal, PEntityId, string>;
    pClassLabel: Provider<PEntityId, PEntityFullTextVal, PClassId, string>;
    pClassFields: Provider<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>;
    pClassFieldLabel: Provider<PEntityId, PEntityFullTextVal, PClassFieldId, string>;

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

