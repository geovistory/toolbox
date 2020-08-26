import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {entityIdToString, stringToEntityId, classIdToString, stringToClassId} from '../../base/functions'
import {FieldsPerEntity} from '../../primary-ds/PEdgeService'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {Warehouse} from '../../Warehouse'
import {PEntityTypeVal} from './PEntityTypeService'
import {ClassId, DfhClassHasTypePropVal} from '../../primary-ds/DfhClassHasTypePropertyService'

export class PEntityTypeDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, ProjectEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, string>
    pEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, FieldsPerEntity>
    dfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityTypeVal, ClassId, DfhClassHasTypePropVal>

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

        // stores the dependency of entityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.dfhClassHasTypeProperty,
            entityIdToString,
            stringToEntityId,
            classIdToString,
            stringToClassId,
        );


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
