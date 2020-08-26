import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {PClassId} from '../../primary-ds/FieldsConfigService'
import {EntityLabelConfig} from '../../primary-ds/EntityLabelConfigService'
import {FieldsPerEntity} from '../../primary-ds/PEdgeService'
import {Warehouse} from '../../Warehouse'
import {entityIdToString, stringToEntityId, classIdToString, stringToClassId} from '../../base/functions'
import {ClearAll} from '../../base/classes/ClearAll'

export class PEntityTypeDependencies extends ClearAll {
    entity: DependencyIndex<PEntityId, string, PEntityId, ProjectEntity>
    entityTypeConfig: DependencyIndex<PEntityId, string, PClassId, EntityLabelConfig>
    entityType: DependencyIndex<PEntityId, string, PEntityId, string>
    edge: DependencyIndex<PEntityId, string, PEntityId, FieldsPerEntity>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.entity = new DependencyIndex<PEntityId, string, PEntityId, ProjectEntity>(
            this.wh.agg.pEntityType,
            this.wh.prim.pEntity,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )

        // stores the dependency of entityType (receiver) on entityTypeConfig (provider)
        this.entityTypeConfig = new DependencyIndex<PEntityId, string, PClassId, EntityLabelConfig>(
            this.wh.agg.pEntityType,
            this.wh.prim.entityTypeConfig,
            entityIdToString,
            stringToEntityId,
            classIdToString,
            stringToClassId
        )

        // stores the dependency of entityType (receiver) on entityType (provider)
        this.entityType = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.agg.pEntityType,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityType (receiver) on edge (provider)
        this.edge = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.pEdge,
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
            this.entityTypeConfig.clearIdx(),
            this.entityType.clearIdx(),
        ])
    }

    async initIdx() {}



}
