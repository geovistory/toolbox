import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {rEntityIdToString, stringToREntityId, rClassIdToString, stringToRClassId} from '../../../base/functions'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {REntityTypeVal} from './REntityTypeService'
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'
import {Dependencies} from '../../../base/classes/Dependencies'

export class REntityTypeDependencies extends Dependencies {
    rEntity: DependencyIndex<REntityId, REntityTypeVal, REntityId, REntity>
    rEntityLabel: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityLabelVal>
    rEdge: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.rEntity = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ))

        // stores the dependency of entityType (receiver) on entityLabel (provider)
        this.rEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.agg.rEntityLabel,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ));

        // stores the dependency of entityType (receiver) on edge (provider)
        this.rEdge = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.prim.rEdge,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ));

        // stores the dependency of entityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.rEntityType,
            this.wh.prim.dfhClassHasTypeProperty,
            rEntityIdToString,
            stringToREntityId,
            rClassIdToString,
            stringToRClassId,
        ));


    }

}
