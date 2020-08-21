import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {EntityId, Entity} from '../../primary-ds/EntityService'
import {ClassId} from '../../primary-ds/FieldsConfigService'
import {EntityLabelConfig} from '../../primary-ds/EntityLabelConfigService'
import {FieldsPerEntity} from '../../primary-ds/EdgeService'
import {Warehouse} from '../../Warehouse'
import {entityIdToString, stringToEntityId, classIdToString, stringToClassId} from '../../base/functions'
import {ClearAll} from '../../base/classes/ClearAll'

export class EntityLabelDependencies extends ClearAll {
    entity: DependencyIndex<EntityId, string, EntityId, Entity>
    entityLabelConfig: DependencyIndex<EntityId, string, ClassId, EntityLabelConfig>
    entityLabel: DependencyIndex<EntityId, string, EntityId, string>
    edge: DependencyIndex<EntityId, string, EntityId, FieldsPerEntity>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private main: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex<EntityId, string, EntityId, Entity>(
            this.main.agg.entityLabel,
            this.main.prim.entity,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = new DependencyIndex<EntityId, string, ClassId, EntityLabelConfig>(
            this.main.agg.entityLabel,
            this.main.prim.entityLabelConfig,
            entityIdToString,
            stringToEntityId,
            classIdToString,
            stringToClassId
        )

        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = new DependencyIndex(
            this.main.agg.entityLabel,
            this.main.agg.entityLabel,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = new DependencyIndex(
            this.main.agg.entityLabel,
            this.main.prim.edge,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityFullText (receiver) on the classLabel (provider)
        // entityClassLabelDep = new EntityClassDependencyIndex();

    }

    async clearAll() {
        await Promise.all([
            this.edge.clearIdx(),
            this.entity.clearIdx(),
            this.entityLabelConfig.clearIdx(),
            this.entityLabel.clearIdx(),
        ])
    }

    async initIdx() {}



}
