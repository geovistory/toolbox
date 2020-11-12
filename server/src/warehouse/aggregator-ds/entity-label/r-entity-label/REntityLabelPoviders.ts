import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {EntityLabelConfigVal} from '../../../primary-ds/ProEntityLabelConfigService';
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityLabelDependencies} from './REntityLabelDependencies';
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityLabelVal} from '../entity-label.commons';
export class REntityLabelProviders extends Providers<REntityId> {
    entity: Provider<REntityId, EntityLabelVal, REntityId, REntity>;
    entityLabels: Provider<REntityId, EntityLabelVal, REntityId, EntityLabelVal>;
    entityLabelConfig: Provider<REntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>;
    identifyingProperty: Provider<REntityId, EntityLabelVal, RClassId,IdentifyingPropertyVal>;
    edges: Provider<REntityId, EntityLabelVal, REntityId, EntityFields>;
    constructor(
        dep: REntityLabelDependencies,
        protected receiverKey: REntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.entityLabels = this.registerProvider(dep.entityLabel, receiverKey);
        this.entityLabelConfig = this.registerProvider(dep.entityLabelConfig, receiverKey);
        this.identifyingProperty = this.registerProvider(dep.identifyingProperty, receiverKey);
        this.edges = this.registerProvider(dep.edge, receiverKey)
    }

}

