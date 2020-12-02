import {Provider} from '../../../base/classes/Provider';
import {Providers} from "../../../base/interfaces/Providers";
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {EntityFields} from "../../../primary-ds/edge/edge.commons";
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {EntityLabelConfigVal} from '../../../primary-ds/ProEntityLabelConfigService';
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService';
import {EntityLabelVal} from '../entity-label.commons';
import {PEntityLabelService} from './PEntityLabelService';

export class PEntityLabelProviders extends Providers<PEntityId> {
    entity: Provider<PEntityId, EntityLabelVal, PEntityId, PEntity>;
    entityLabels: Provider<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>;
    entityLabelConfig: Provider<PEntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>;
    identifyingProperty: Provider<PEntityId, EntityLabelVal, RClassId,IdentifyingPropertyVal>;
    edges: Provider<PEntityId, EntityLabelVal, PEntityId, EntityFields>;
    constructor(
        dep: PEntityLabelService,
        protected receiverKey: PEntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.depPEntity, receiverKey)
        this.entityLabels = this.registerProvider(dep.depPEntityLabel, receiverKey);
        this.entityLabelConfig = this.registerProvider(dep.depProEntityLabelConfig, receiverKey);
        this.identifyingProperty = this.registerProvider(dep.depIdentifyingProperty, receiverKey);
        this.edges = this.registerProvider(dep.depPEdge, receiverKey)
    }

}

