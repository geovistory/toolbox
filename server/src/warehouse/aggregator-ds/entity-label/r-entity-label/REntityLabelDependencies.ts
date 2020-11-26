import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {EntityFields} from "../../../primary-ds/edge/edge.commons"
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {EntityLabelConfigVal} from '../../../primary-ds/ProEntityLabelConfigService'
import {Warehouse} from '../../../Warehouse'
import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService'
import {EntityLabelVal} from '../entity-label.commons'
import {Injectable, Inject, forwardRef} from 'injection-js';

@Injectable()
export class REntityLabelDependencies extends Dependencies {
    entity: DependencyIndex<REntityId, EntityLabelVal, REntityId, REntity>
    entityLabelConfig: DependencyIndex<REntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>
    identifyingProperty: DependencyIndex<REntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
    entityLabel: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityLabelVal>
    edge: DependencyIndex<REntityId, EntityLabelVal, REntityId, EntityFields>

    // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
      constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEntity,
        ))

        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.entityLabelConfig = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.prim.proEntityLabelConfig,
        ))
        // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
        this.identifyingProperty = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.agg.identifyingProperty,
        ))


        // stores the dependency of entityLabel (receiver) on entityLabel (provider)
        this.entityLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.agg.rEntityLabel,
        ));

        // stores the dependency of entityLabel (receiver) on edge (provider)
        this.edge = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityLabel,
            this.wh.prim.rEdge,
        ));

        // stores the dependency of entityFullText (receiver) on the classLabel (provider)
        // entityClassLabelDep = new EntityClassDependencyIndex();

    }

}
