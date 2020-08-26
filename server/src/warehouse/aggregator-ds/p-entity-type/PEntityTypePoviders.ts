import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {FieldsPerEntity} from '../../primary-ds/PEdgeService';
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService';
import {PEntityTypeDependencies} from './PEntityTypeDependencies';
import {PEntityTypeVal} from './PEntityTypeService';
export class PEntityTypeProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityTypeVal, PEntityId, ProjectEntity>;
    pEdges: Provider<PEntityId, PEntityTypeVal, PEntityId, FieldsPerEntity>;
    pEntityLabel: Provider<PEntityId, PEntityTypeVal, PEntityId, string>;
    constructor(
        dep: PEntityTypeDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.pEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.pEntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.pEdge, receiverKey)
    }

}

