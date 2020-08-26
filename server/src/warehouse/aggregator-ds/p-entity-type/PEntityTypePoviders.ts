import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {PClassId} from '../../primary-ds/FieldsConfigService';
import {FieldsPerEntity} from '../../primary-ds/PEdgeService';
import {EntityLabelConfig} from '../../primary-ds/EntityLabelConfigService';
import {ProjectEntity, PEntityId} from '../../primary-ds/PEntityService';
import {PEntityTypeDependencies} from './PEntityTypeDependencies';
export class PEntityTypeProviders extends Providers<PEntityId> {
    entity: Provider<PEntityId, string, PEntityId, ProjectEntity>;
    entityTypes: Provider<PEntityId, string, PEntityId, string>;
    entityTypeConfig: Provider<PEntityId, string, PClassId, EntityLabelConfig>;
    edges: Provider<PEntityId, string, PEntityId, FieldsPerEntity>;
    constructor(
        dep: PEntityTypeDependencies,
        protected receiverKey: PEntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.entityTypes = this.registerProvider(dep.entityType, receiverKey);
        this.entityTypeConfig = this.registerProvider(dep.entityTypeConfig, receiverKey);
        this.edges = this.registerProvider(dep.edge, receiverKey)
    }

}

