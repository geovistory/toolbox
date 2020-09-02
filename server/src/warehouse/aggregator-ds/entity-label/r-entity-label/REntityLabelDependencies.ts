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

export class REntityLabelDependencies extends ClearAll {
    entity: DependencyIndex<REntityId, string, REntityId, REntity>
    entityLabelConfig: DependencyIndex<REntityId, string, PClassId, EntityLabelConfig>
    identifyingProperty: DependencyIndex<REntityId, string, RClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<REntityId, string, REntityId, string>
    edge: DependencyIndex<REntityId, string, REntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex<REntityId, string, REntityId, REntity>(
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        )

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = new DependencyIndex<REntityId, string, PClassId, EntityLabelConfig>(
            this.wh.agg.rEntityLabel,
            this.wh.prim.proEntityLabelConfig,
            rEntityIdToString,
            stringToREntityId,
            pClassIdToString,
            stringToPClassId
        )
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = new DependencyIndex<REntityId, string, RClassId, IdentifyingPropertyVal>(
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
            this.edge.clearIdx(),
            this.entity.clearIdx(),
            this.entityLabelConfig.clearIdx(),
            this.entityLabel.clearIdx(),
        ])
    }

    async initIdx() {}



}
