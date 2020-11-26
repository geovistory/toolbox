import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService'
import {PClassId, ProClassFieldVal} from '../../../primary-ds/ProClassFieldsConfigService'
import {Warehouse} from '../../../Warehouse'
import {RClassFieldId, RClassFieldVal} from '../../class-field-label/r-class-field-label/RClassFieldLabelService'
import {RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService'
import {EntityLabelVal} from '../../entity-label/entity-label.commons'
import {REntityFullTextVal} from './REntityFullTextService'
import {Injectable, Inject, forwardRef} from 'injection-js';

@Injectable()
export class REntityFullTextDependencies extends Dependencies {
    rEntity: DependencyIndex<REntityId, REntityFullTextVal, REntityId, REntity>
    rEntityLabel: DependencyIndex<REntityId, REntityFullTextVal, REntityId, EntityLabelVal>
    rEdge: DependencyIndex<REntityId, REntityFullTextVal, REntityId, EntityFields>
    rClassLabel: DependencyIndex<REntityId, REntityFullTextVal, RClassId, RClassLabelValue>
    rClassFieldLabel: DependencyIndex<REntityId, REntityFullTextVal, RClassFieldId, RClassFieldVal>

    pClassFields: DependencyIndex<REntityId, REntityFullTextVal, PClassId, ProClassFieldVal>

      constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
        super()
        // stores the dependency of entityFullText (receiver) on rEntity (provider)
        this.rEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityFullText,
            this.wh.prim.rEntity,
        ))

        // stores the dependency of entityFullText (receiver) on rEntityLabel (provider)
        this.rEntityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityFullText,
            this.wh.agg.rEntityLabel,
        ));

        // stores the dependency of entityFullText (receiver) on rEdge (provider)
        this.rEdge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityFullText,
            this.wh.prim.rEdge,
        ));

        // stores the dependency of entityFullText (receiver) on dfhClassHasTypeProperty
        this.pClassFields = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityFullText,
            this.wh.prim.pClassFieldsConfig,
        ));

        // stores the dependency of entityFullText (receiver) on project class labels
        this.rClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityFullText,
            this.wh.agg.rClassLabel,
        ));

        this.rClassFieldLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityFullText,
            this.wh.agg.rClassFieldLabel,
        ));
    }
}
