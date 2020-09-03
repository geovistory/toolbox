import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService';
import {PEntityTypeDependencies} from './PEntityTypeDependencies';
import {PEntityTypeVal} from './PEntityTypeService';
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
export class PEntityTypeProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityTypeVal, PEntityId, PEntity>;
    pEdges: Provider<PEntityId, PEntityTypeVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityTypeVal, PEntityId, EntityLabelVal>;
    rEntityLabel: Provider<PEntityId, PEntityTypeVal, REntityId, EntityLabelVal>;
    dfhClassHasTypeProp: Provider<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: PEntityTypeDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.pEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.pEntityLabel, receiverKey);
        this.rEntityLabel = this.registerProvider(dep.rEntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.pEdge, receiverKey)
        this.dfhClassHasTypeProp = this.registerProvider(dep.dfhClassHasTypeProp, receiverKey)
    }

}

