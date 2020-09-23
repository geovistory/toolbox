import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pClassFieldIdToString, pClassIdToString, pEntityIdToString, rEntityIdToString, stringToPClassFieldId, stringToPClassId, stringToPEntityId, stringToREntityId} from '../../../base/functions'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {REntityId} from '../../../primary-ds/entity/REntityService'
import {PClassId, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService'
import {Warehouse} from '../../../Warehouse'
import {PClassFieldId} from '../../class-field-label/p-class-field-label/PClassFieldLabelService'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'
import {PEntityFullTextVal} from './PEntityFullTextService'

export class PEntityFullTextDependencies extends Dependencies {
    pEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, PEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityLabelVal>
    rEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, REntityId, EntityLabelVal>
    pEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    pClassLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, string>
    pClassFields: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>
    pClassFieldLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassFieldId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityFullText (receiver) on pEntity (provider)
        this.pEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ))

        // stores the dependency of entityFullText (receiver) on pEntityLabel (provider)
        this.pEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.pEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ));

        // stores the dependency of entityFullText (receiver) on rEntityLabel (provider)
        this.rEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.rEntityLabel,
            pEntityIdToString,
            stringToPEntityId,
            rEntityIdToString,
            stringToREntityId,
        ));

        // stores the dependency of entityFullText (receiver) on pEdge (provider)
        this.pEdge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEdge,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ));

        // stores the dependency of entityFullText (receiver) on dfhClassHasTypeProperty
        this.pClassFields = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.prim.pClassFieldsConfig,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId,
        ));

        // stores the dependency of entityFullText (receiver) on project class labels
        this.pClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassLabel,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId,
        ));

        this.pClassFieldLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassFieldLabel,
            pEntityIdToString,
            stringToPEntityId,
            pClassFieldIdToString,
            stringToPClassFieldId,
        ));
    }

}
