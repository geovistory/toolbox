import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {PClassId} from '../../primary-ds/PClassFieldsConfigService'
import {EntityLabelConfig} from '../../primary-ds/ProEntityLabelConfigService'
import {EntityFields} from '../../primary-ds/PEdgeService'
import {Warehouse} from '../../Warehouse'
import {entityIdToString, stringToEntityId, pClassIdToString, stringToPClassId, stringToClassId, classIdToString} from '../../base/functions'
import {ClearAll} from '../../base/classes/ClearAll'
import {IdentifyingPropertyVal} from '../identifying-property/IdentifyingPropertyService'
import {ClassId} from '../../primary-ds/DfhClassHasTypePropertyService'

export class PEntityLabelDependencies extends ClearAll {
    entity: DependencyIndex<PEntityId, string, PEntityId, ProjectEntity>
    entityLabelConfig: DependencyIndex<PEntityId, string, PClassId, EntityLabelConfig>
    identifyingProperty: DependencyIndex<PEntityId, string, ClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<PEntityId, string, PEntityId, string>
    edge: DependencyIndex<PEntityId, string, PEntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex<PEntityId, string, PEntityId, ProjectEntity>(
            this.wh.agg.pEntityLabel,
            this.wh.prim.pEntity,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = new DependencyIndex<PEntityId, string, PClassId, EntityLabelConfig>(
            this.wh.agg.pEntityLabel,
            this.wh.prim.proEntityLabelConfig,
            entityIdToString,
            stringToEntityId,
            pClassIdToString,
            stringToPClassId
        )
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = new DependencyIndex<PEntityId, string, ClassId, IdentifyingPropertyVal>(
            this.wh.agg.pEntityLabel,
            this.wh.agg.identifyingProperty,
            entityIdToString,
            stringToEntityId,
            classIdToString,
            stringToClassId
        )


        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.agg.pEntityLabel,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = new DependencyIndex(
            this.wh.agg.pEntityLabel,
            this.wh.prim.pEdge,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
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
