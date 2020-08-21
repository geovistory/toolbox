import {Provider} from '../../base/classes/Provider';
import {Providers} from "../../base/interfaces/Providers";
import {ClassId} from '../../primary-ds/FieldsConfigService';
import {FieldsPerEntity} from '../../primary-ds/EdgeService';
import {EntityLabelConfig} from '../../primary-ds/EntityLabelConfigService';
import {Entity, EntityId} from '../../primary-ds/EntityService';
import {EntityLabelDependencies} from './EntityLabelDependencies';
export class EntityLabelProviders extends Providers<EntityId> {
    entity: Provider<EntityId, string, EntityId, Entity>;
    entityLabels: Provider<EntityId, string, EntityId, string>;
    entityLabelConfig: Provider<EntityId, string, ClassId, EntityLabelConfig>;
    edges: Provider<EntityId, string, EntityId, FieldsPerEntity>;
    constructor(
        dep: EntityLabelDependencies,
        protected receiverKey: EntityId
    ) {
        super()
        this.entity = this.registerProvider(dep.entity, receiverKey)
        this.entityLabels = this.registerProvider(dep.entityLabel, receiverKey);
        this.entityLabelConfig = this.registerProvider(dep.entityLabelConfig, receiverKey);
        this.edges = this.registerProvider(dep.edge, receiverKey)
    }

}

