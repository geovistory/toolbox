import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {entityIdToString, stringToEntityId, classIdToString, stringToClassId} from '../../base/functions'
import {EntityFields} from '../../primary-ds/PEdgeService'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {Warehouse} from '../../Warehouse'
import {ClassId, DfhClassHasTypePropVal} from '../../primary-ds/DfhClassHasTypePropertyService'
import {PEntityFullTextVal} from './PEntityFullTextService'

export class PEntityFullTextDependencies extends ClearAll {
    pEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, ProjectEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, string>
    pEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    dfhClassHasTypeProp: DependencyIndex<PEntityId, PEntityFullTextVal, ClassId, DfhClassHasTypePropVal>

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
        this.dfhClassHasTypeProp = new DependencyIndex(
            this.wh.agg.pEntityFullText,
            this.wh.prim.dfhClassHasTypeProperty,
            entityIdToString,
            stringToEntityId,
            classIdToString,
            stringToClassId,
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
