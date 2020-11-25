import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'
import {REntityTypeVal} from './REntityTypeService'

export class REntityTypeDependencies extends Dependencies {
    rEntity: DependencyIndex<REntityId, REntityTypeVal, REntityId, REntity>
    rEntityLabel: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityLabelVal>
    rEdge: DependencyIndex<REntityId, REntityTypeVal, REntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<REntityId, REntityTypeVal, RClassId, DfhClassHasTypePropVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityType (receiver) on entity (provider)
        this.rEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityType,
            this.wh.prim.rEntity,
        ))

        // stores the dependency of entityType (receiver) on entityLabel (provider)
        this.rEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityType,
            this.wh.agg.rEntityLabel,
        ));

        // stores the dependency of entityType (receiver) on edge (provider)
        this.rEdge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityType,
            this.wh.prim.rEdge
        ));

        // stores the dependency of entityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityType,
            this.wh.prim.dfhClassHasTypeProperty,
        ));


    }

}
