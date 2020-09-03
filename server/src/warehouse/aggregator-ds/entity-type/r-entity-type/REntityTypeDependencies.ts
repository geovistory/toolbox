import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {rEntityIdToString, stringToREntityId, rClassIdToString, stringToRClassId} from '../../../base/functions'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {REntityTypeVal} from './REntityTypeService'
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'

export class REntityTypeDependencies extends ClearAll {
    rEntity: DependencyIndex<REntityId, REntityTypeVal, REntityId, REntity>
    rEntityLabel: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityLabelVal>
    rEdge: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.rEntity = new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        )

        // stores the dependency of entityType (receiver) on entityLabel (provider)
        this.rEntityLabel = new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.agg.rEntityLabel,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        );

        // stores the dependency of entityType (receiver) on edge (provider)
        this.rEdge = new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.prim.rEdge,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        );

        // stores the dependency of entityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.prim.dfhClassHasTypeProperty,
            rEntityIdToString,
            stringToREntityId,
            rClassIdToString,
            stringToRClassId,
        );


    }

    async clearAll() {
        await Promise.all([
            this.rEdge.clearAll(),
            this.rEntity.clearAll(),
            this.rEntityLabel.clearAll(),
        ])
    }

    async initIdx() {}



}
