import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {REntityId} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'
import {PEntityTypeVal} from './PEntityTypeService'

export class PEntityTypeDependencies extends Dependencies {
    pEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, PEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityLabelVal>
    rEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, REntityId, EntityLabelVal>
    pEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of pEntityType (receiver) on pEntity (provider)
        this.pEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityType,
            this.wh.prim.pEntity,
        ))

        // stores the dependency of pEntityType (receiver) on pEntityLabel (provider)
        this.pEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityType,
            this.wh.agg.pEntityLabel,
        ));

        // stores the dependency of pEntityType (receiver) on rEntityLabel (provider)
        this.rEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityType,
            this.wh.agg.rEntityLabel
        ));

        // stores the dependency of pEntityType (receiver) on pEdge (provider)
        this.pEdge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityType,
            this.wh.prim.pEdge
        ));

        // stores the dependency of pEntityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityType,
            this.wh.prim.dfhClassHasTypeProperty
        ));


    }



}
