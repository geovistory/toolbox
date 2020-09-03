import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pClassIdToString, pEntityIdToString, rClassIdToString, stringToPClassId, stringToPEntityId, stringToRClassId} from '../../../base/functions'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {EntityLabelConfig} from '../../../primary-ds/ProEntityLabelConfigService'
import {Warehouse} from '../../../Warehouse'
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService'
import {EntityLabelVal} from '../entity-label.commons'

export class PEntityLabelDependencies extends Dependencies {
    entity: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, PEntity>
    entityLabelConfig: DependencyIndex<PEntityId, EntityLabelVal, PClassId, EntityLabelConfig>
    identifyingProperty: DependencyIndex<PEntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>
    edge: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ))

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.proEntityLabelConfig,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId
        ))
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.agg.identifyingProperty,
            pEntityIdToString,
            stringToPEntityId,
            rClassIdToString,
            stringToRClassId
        ))


        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.agg.pEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ))

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ))

        // stores the dependency of entityFullText (receiver) on the classLabel (provider)
        // entityClassLabelDep = new EntityClassDependencyIndex();

    }



}
