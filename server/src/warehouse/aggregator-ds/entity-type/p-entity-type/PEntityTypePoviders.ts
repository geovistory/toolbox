import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {PEntityTypeService, PEntityTypeVal} from './PEntityTypeService';
export class PEntityTypeProviders extends Providers<PEntityId> {
    pEntity: Provider<PEntityId, PEntityTypeVal, PEntityId, PEntity>;
    pEdges: Provider<PEntityId, PEntityTypeVal, PEntityId, EntityFields>;
    pEntityLabel: Provider<PEntityId, PEntityTypeVal, PEntityId, EntityLabelVal>;
    rEntityLabel: Provider<PEntityId, PEntityTypeVal, REntityId, EntityLabelVal>;
    dfhClassHasTypeProp: Provider<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: PEntityTypeService,
        protected receiverKey: PEntityId
    ) {
        super()
        this.pEntity = this.registerProvider(dep.depPEntity, receiverKey)
        this.pEntityLabel = this.registerProvider(dep.depPEntityLabel, receiverKey);
        this.rEntityLabel = this.registerProvider(dep.depREntityLabel, receiverKey);
        this.pEdges = this.registerProvider(dep.depPEdge, receiverKey)
        this.dfhClassHasTypeProp = this.registerProvider(dep.depDfhClassHasTypeProp, receiverKey)
    }

}

