import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {entityIdToString, pClassIdToString, stringToEntityId, stringToPClassId, pClassFieldIdToString, stringToPClassFieldId} from '../../base/functions'
import {PClassFieldVal, PClassId} from '../../primary-ds/PClassFieldsConfigService'
import {EntityFields} from '../../primary-ds/PEdgeService'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {Warehouse} from '../../Warehouse'
import {PEntityFullTextVal} from './PEntityFullTextService'
import {PClassFieldId} from '../p-class-field-label/PClassFieldLabelService'

export class PEntityFullTextDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, ProjectEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, string>
    pEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    pClassLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, string>
    pClassFields: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, PClassFieldVal>
    pClassFieldLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassFieldId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityFullText (receiver) on entity (provider)
        this.pEntity = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEntity,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )

        // stores the dependency of entityFullText (receiver) on entityLabel (provider)
        this.pEntityLabel = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.agg.pEntityLabel,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityFullText (receiver) on edge (provider)
        this.pEdge = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEdge,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        );

        // stores the dependency of entityFullText (receiver) on dfhClassHasTypeProperty
        this.pClassFields = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.pClassFieldsConfig,
            entityIdToString,
            stringToEntityId,
            pClassIdToString,
            stringToPClassId,
        );

        // stores the dependency of entityFullText (receiver) on project class labels
        this.pClassLabel = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassLabel,
            entityIdToString,
            stringToEntityId,
            pClassIdToString,
            stringToPClassId,
        );

        this.pClassFieldLabel = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.agg.pPropertyLabel,
            entityIdToString,
            stringToEntityId,
            pClassFieldIdToString,
            stringToPClassFieldId,
        );
    }

    async clearAll() {
        await Promise.all([
            this.pEdge.clearIdx(),
            this.pEntity.clearIdx(),
            this.pEntityLabel.clearIdx(),
        ])
    }

    async initIdx() {}



}
