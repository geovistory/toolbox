import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {EntityLabelConfig} from '../../../primary-ds/ProEntityLabelConfigService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {Warehouse} from '../../../Warehouse'
import {rEntityIdToString, stringToREntityId, pClassIdToString, stringToPClassId, stringToRClassId, rClassIdToString} from '../../../base/functions'
import {ClearAll} from '../../../base/classes/ClearAll'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService'
import {EntityLabelVal} from '../entity-label.commons'

export class REntityLabelDependencies extends ClearAll {
    entity: DependencyIndex<REntityId, EntityLabelVal, REntityId, REntity>
    entityLabelConfig: DependencyIndex<REntityId, EntityLabelVal, PClassId, EntityLabelConfig>
    identifyingProperty: DependencyIndex<REntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityLabelVal>
    edge: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex(
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        )

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = new DependencyIndex(
            this.wh.agg.rEntityLabel,
            this.wh.prim.proEntityLabelConfig,
            rEntityIdToString,
            stringToREntityId,
            pClassIdToString,
            stringToPClassId
        )
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = new DependencyIndex(
            this.wh.agg.rEntityLabel,
            this.wh.agg.identifyingProperty,
            rEntityIdToString,
            stringToREntityId,
            rClassIdToString,
            stringToRClassId
        )


        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = new DependencyIndex(
            this.wh.agg.rEntityLabel,
            this.wh.agg.rEntityLabel,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        );

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = new DependencyIndex(
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEdge,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        );

        // stores the dependency of entityFullText (receiver) on the classLabel (provider)
        // entityClassLabelDep = new EntityClassDependencyIndex();

    }

    async clearAll() {
        await Promise.all([
            this.edge.clearAll(),
            this.entity.clearAll(),
            this.entityLabelConfig.clearAll(),
            this.entityLabel.clearAll(),
        ])
    }

    async initIdx() {}



}
