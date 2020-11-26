import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {Warehouse} from '../../../Warehouse'
import {PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService'
import {PEntityClassLabelVal} from './PEntityClassLabelService'
import {Injectable, Inject, forwardRef} from 'injection-js';

@Injectable()
export class PEntityClassLabelDependencies extends Dependencies {
    entity: DependencyIndex<PEntityId, PEntityClassLabelVal, PEntityId, PEntity>
    pClassLabel: DependencyIndex<PEntityId, PEntityClassLabelVal, PClassId, PClassLabelVal>

      constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityClassLabel,
            this.wh.prim.pEntity,
        ))
        // stores the dependency of pEntityLabel (receiver) on pClassLabel (provider)
        this.pClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityClassLabel,
            this.wh.agg.pClassLabel,
        ))


    }



}
