import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {entityIdToString, stringToEntityId} from '../../base/functions'
import {FieldsPerEntity} from '../../primary-ds/PEdgeService'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {Warehouse} from '../../Warehouse'
import {PEntityTypeVal} from './PEntityTypeService'

export class PEntityTypeDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, ProjectEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, string>
    pEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, FieldsPerEntity>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.pEntity = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.pEntity,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )

        // stores the dependency of entityType (receiver) on entityLabel (provider)
        this.pEntityLabel = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.agg.pEntityLabel,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityType (receiver) on edge (provider)
        this.pEdge = new DependencyIndex(
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
            this.pEdge.clearIdx(),
            this.pEntity.clearIdx(),
            this.pEntityLabel.clearIdx(),
        ])
    }

    async initIdx() {}



}
