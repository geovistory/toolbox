import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pEntityIdToString, stringToPEntityId, rClassIdToString, stringToRClassId, stringToREntityId, rEntityIdToString} from '../../../base/functions'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService'
import {Warehouse} from '../../../Warehouse'
import {PEntityTypeVal} from './PEntityTypeService'
import {RClassId, DfhClassHasTypePropVal} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {REntityId} from '../../../primary-ds/entity/REntityService'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'

export class PEntityTypeDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, PEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityLabelVal>
    rEntityLabel: DependencyIndex<PEntityId, PEntityTypeVal, REntityId, EntityLabelVal>
    pEdge: DependencyIndex<PEntityId, PEntityTypeVal, PEntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityTypeVal, RClassId, DfhClassHasTypePropVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of pEntityType (receiver) on pEntity (provider)
        this.pEntity = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        )

        // stores the dependency of pEntityType (receiver) on pEntityLabel (provider)
        this.pEntityLabel = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.agg.pEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of pEntityType (receiver) on rEntityLabel (provider)
        this.rEntityLabel = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.agg.rEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            rEntityIdToString,
            stringToREntityId,
        );

        // stores the dependency of pEntityType (receiver) on pEdge (provider)
        this.pEdge = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of pEntityType (receiver) on dfhClassHasTypeProperty
        this.dfhClassHasTypeProp = new DependencyIndex(
            this.wh.agg.pEntityType,
            this.wh.prim.dfhClassHasTypeProperty,
            pEntityIdToString,
            stringToPEntityId,
            rClassIdToString,
            stringToRClassId,
        );


    }

    async clearAll() {
        await Promise.all([
            this.pEdge.clearAll(),
            this.pEntity.clearAll(),
            this.pEntityLabel.clearAll(),
        ])
    }

    async initIdx() {}



}
