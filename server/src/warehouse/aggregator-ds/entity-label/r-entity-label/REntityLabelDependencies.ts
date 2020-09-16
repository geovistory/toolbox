import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pClassIdToString, rClassIdToString, rEntityIdToString, stringToPClassId, stringToRClassId, stringToREntityId} from '../../../base/functions'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {EntityLabelConfig} from '../../../primary-ds/ProEntityLabelConfigService'
import {Warehouse} from '../../../Warehouse'
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService'
import {EntityLabelVal} from '../entity-label.commons'

export class REntityLabelDependencies extends Dependencies {
    entity: DependencyIndex<REntityId, EntityLabelVal, REntityId, REntity>
    entityLabelConfig: DependencyIndex<REntityId, EntityLabelVal, PClassId, EntityLabelConfig>
    identifyingProperty: DependencyIndex<REntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityLabelVal>
    edge: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ))

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.prim.proEntityLabelConfig,
            rEntityIdToString,
            stringToREntityId,
            pClassIdToString,
            stringToPClassId
        ))
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.agg.identifyingProperty,
            rEntityIdToString,
            stringToREntityId,
            rClassIdToString,
            stringToRClassId
        ))


        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.agg.rEntityLabel,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ));

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEdge,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ));

        // stores the dependency of entityFullText (receiver) on the classLabel (provider)
        // entityClassLabelDep = new EntityClassDependencyIndex();

    }

}
