import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {pEntityIdToString, stringToPEntityId, classIdToString, stringToClassId} from '../../base/functions'
import {EntityFields} from '../../primary-ds/PEdgeService'
import {PEntityId, PEntity} from '../../primary-ds/PEntityService'
import {Warehouse} from '../../Warehouse'
import {PEntityTypeVal} from './PEntityTypeService'
import {ClassId, DfhClassHasTypePropVal} from '../../primary-ds/DfhClassHasTypePropertyService'

export class PEntityTypeDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, PEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, string>
    pEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityTypeVal, ClassId, DfhClassHasTypePropVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.pEntity = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        )

        // stores the dependency of entityType (receiver) on entityLabel (provider)
        this.pEntityLabel = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.agg.pEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of entityType (receiver) on edge (provider)
        this.pEdge = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of entityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.dfhClassHasTypeProperty,
            pEntityIdToString,
            stringToPEntityId,
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
