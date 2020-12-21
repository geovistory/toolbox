import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService';
import {EntityLabelVal} from '../../entity-label/entity-label.commons';
import {REntityTypeService, REntityTypeVal} from './REntityTypeService';
export class REntityTypeProviders extends Providers<REntityId> {
    rEntity: Provider<REntityId, REntityTypeVal, REntityId, REntity>;
    rEdges: Provider<REntityId, REntityTypeVal, REntityId, EntityFields>;
    rEntityLabel: Provider<REntityId, REntityTypeVal, REntityId, EntityLabelVal>;
    dfhClassHasTypeProp: Provider<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>;
    constructor(
        dep: REntityTypeService,
        protected receiverKey: REntityId
    ) {
        super()
        this.rEntity = this.registerProvider(dep.depREntity, receiverKey)
        this.rEntityLabel = this.registerProvider(dep.depREntityLabel, receiverKey);
        this.rEdges = this.registerProvider(dep.depREdge, receiverKey)
        this.dfhClassHasTypeProp = this.registerProvider(dep.depDfhClassHasTypeProp, receiverKey)
    }

}

