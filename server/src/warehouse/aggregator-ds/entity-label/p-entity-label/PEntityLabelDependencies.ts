import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {EntityLabelConfig} from '../../../primary-ds/ProEntityLabelConfigService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {Warehouse} from '../../../Warehouse'
import {pEntityIdToString, stringToPEntityId, pClassIdToString, stringToPClassId, stringToRClassId, rClassIdToString} from '../../../base/functions'
import {ClearAll} from '../../../base/classes/ClearAll'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService'
import {EntityLabelVal} from '../entity-label.commons'

export class PEntityLabelDependencies extends ClearAll {
    entity: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, PEntity>
    entityLabelConfig: DependencyIndex<PEntityId, EntityLabelVal, PClassId, EntityLabelConfig>
    identifyingProperty: DependencyIndex<PEntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>
    edge: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        )

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.proEntityLabelConfig,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId
        )
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.agg.identifyingProperty,
            pEntityIdToString,
            stringToPEntityId,
            rClassIdToString,
            stringToRClassId
        )


        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.agg.pEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
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
