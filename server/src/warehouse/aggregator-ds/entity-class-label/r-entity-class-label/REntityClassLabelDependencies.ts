import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService'
import {REntityClassLabelVal} from './REntityClassLabelService'
import {Injectable, Inject, forwardRef} from 'injection-js';

@Injectable()
export class REntityClassLabelDependencies extends Dependencies {
    rEntity: DependencyIndex<REntityId, REntityClassLabelVal, REntityId, REntity>
    rClassLabel: DependencyIndex<REntityId, REntityClassLabelVal, RClassId, RClassLabelValue>

      constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.rEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityClassLabel,
            this.wh.prim.rEntity,
        ))
        // stores the dependency of rEntityLabel (receiver) on rClassLabel (provider)
        this.rClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityClassLabel,
            this.wh.agg.rClassLabel,
        ));


    }

}
