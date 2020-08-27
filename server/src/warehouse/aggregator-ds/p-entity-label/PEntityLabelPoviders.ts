import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {PClassId} from '../../primary-ds/PClassFieldsConfigService';
import {EntityFields} from '../../primary-ds/PEdgeService';
import {EntityLabelConfig} from '../../primary-ds/EntityLabelConfigService';
import {ProjectEntity, PEntityId} from '../../primary-ds/PEntityService';
import {PEntityLabelDependencies} from './PEntityLabelDependencies';
export class PEntityLabelProviders extends Providers<PEntityId> {
    entity: Provider<PEntityId, string, PEntityId, ProjectEntity>;
    entityLabels: Provider<PEntityId, string, PEntityId, string>;
    entityLabelConfig: Provider<PEntityId, string, PClassId, EntityLabelConfig>;
    edges: Provider<PEntityId, string, PEntityId, EntityFields>;
    constructor(
        dep: PEntityLabelDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.entityLabels = this.registerProvider(dep.entityLabel, receiverKey);
        this.entityLabelConfig = this.registerProvider(dep.entityLabelConfig, receiverKey);
        this.edges = this.registerProvider(dep.edge, receiverKey)
    }

}

