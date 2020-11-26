import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {EntityLabelConfigVal} from '../../../primary-ds/ProEntityLabelConfigService';
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService';
import {PEntityLabelDependencies} from './PEntityLabelDependencies';
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityLabelVal} from '../entity-label.commons';

export class PEntityLabelProviders extends Providers<PEntityId> {
    entity: Provider<PEntityId, EntityLabelVal, PEntityId, PEntity>;
    entityLabels: Provider<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>;
    entityLabelConfig: Provider<PEntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>;
    identifyingProperty: Provider<PEntityId, EntityLabelVal, RClassId,IdentifyingPropertyVal>;
    edges: Provider<PEntityId, EntityLabelVal, PEntityId, EntityFields>;
    constructor(
        dep: PEntityLabelDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.entityLabels = this.registerProvider(dep.entityLabel, receiverKey);
        this.entityLabelConfig = this.registerProvider(dep.entityLabelConfig, receiverKey);
        this.identifyingProperty = this.registerProvider(dep.identifyingProperty, receiverKey);
        this.edges = this.registerProvider(dep.edge, receiverKey)
    }

}

