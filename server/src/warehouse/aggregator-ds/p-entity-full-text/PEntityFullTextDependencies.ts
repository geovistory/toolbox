import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {pEntityIdToString, pClassIdToString, stringToPEntityId, stringToPClassId, pClassFieldIdToString, stringToPClassFieldId} from '../../base/functions'
import {ProClassFieldVal, PClassId} from '../../primary-ds/ProClassFieldsConfigService'
import {EntityFields} from "../../primary-ds/edge/edge.commons"
import {PEntityId, PEntity} from '../../primary-ds/entity/PEntityService'
import {Warehouse} from '../../Warehouse'
import {PEntityFullTextVal} from './PEntityFullTextService'
import {PClassFieldId} from '../class-field-label/p-class-field-label/PClassFieldLabelService'

export class PEntityFullTextDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, PEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, string>
    pEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    pClassLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, string>
    pClassFields: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>
    pClassFieldLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassFieldId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityFullText (receiver) on entity (provider)
        this.pEntity = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        )

        // stores the dependency of entityFullText (receiver) on entityLabel (provider)
        this.pEntityLabel = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.agg.pEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of entityFullText (receiver) on edge (provider)
        this.pEdge = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        );

        // stores the dependency of entityFullText (receiver) on dfhClassHasTypeProperty
        this.pClassFields = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.pClassFieldsConfig,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId,
        );

        // stores the dependency of entityFullText (receiver) on project class labels
        this.pClassLabel = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassLabel,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId,
        );

        this.pClassFieldLabel = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassFieldLabel,
            pEntityIdToString,
            stringToPEntityId,
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
