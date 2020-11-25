import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {REntityId} from '../../../primary-ds/entity/REntityService'
import {PClassId, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService'
import {Warehouse} from '../../../Warehouse'
import {PClassFieldLabelId, PClassFieldLabelVal} from '../../class-field-label/p-class-field-label/PClassFieldLabelService'
import {PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'
import {PEntityFullTextVal} from './PEntityFullTextService'

export class PEntityFullTextDependencies extends Dependencies {
    pEntity: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, PEntity>
    pEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityLabelVal>
    rEntityLabel: DependencyIndex<PEntityId, PEntityFullTextVal, REntityId, EntityLabelVal>
    pEdge: DependencyIndex<PEntityId, PEntityFullTextVal, PEntityId, EntityFields>
    pClassLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, PClassLabelVal>
    pClassFields: DependencyIndex<PEntityId, PEntityFullTextVal, PClassId, ProClassFieldVal>
    pClassFieldLabel: DependencyIndex<PEntityId, PEntityFullTextVal, PClassFieldLabelId, PClassFieldLabelVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityFullText (receiver) on pEntity (provider)
        this.pEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEntity,
        ))

        // stores the dependency of entityFullText (receiver) on pEntityLabel (provider)
        this.pEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.pEntityLabel,
        ));

        // stores the dependency of entityFullText (receiver) on rEntityLabel (provider)
        this.rEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.rEntityLabel,
        ));

        // stores the dependency of entityFullText (receiver) on pEdge (provider)
        this.pEdge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.prim.pEdge,
        ));

        // stores the dependency of entityFullText (receiver) on dfhClassHasTypeProperty
        this.pClassFields = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.prim.pClassFieldsConfig,
        ));

        // stores the dependency of entityFullText (receiver) on project class labels
        this.pClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassLabel,
        ));

        this.pClassFieldLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityFullText,
            this.wh.agg.pClassFieldLabel,
        ));
    }

}
