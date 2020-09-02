import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {EntityLabelConfig} from '../../../primary-ds/ProEntityLabelConfigService';
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService';
import {REntityLabelDependencies} from './REntityLabelDependencies';
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
export class REntityLabelProviders extends Providers<REntityId> {
    entity: Provider<REntityId, string, REntityId, REntity>;
    entityLabels: Provider<REntityId, string, REntityId, string>;
    entityLabelConfig: Provider<REntityId, string, PClassId, EntityLabelConfig>;
    identifyingProperty: Provider<REntityId, string, RClassId,IdentifyingPropertyVal>;
    edges: Provider<REntityId, string, REntityId, EntityFields>;
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

