import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {rClassIdToString, rEntityIdToString, stringToRClassId, stringToREntityId} from '../../../base/functions'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {REntity, REntityId} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService'
import {REntityClassLabelVal} from './REntityClassLabelService'

export class REntityClassLabelDependencies extends Dependencies {
    rEntity: DependencyIndex<REntityId, REntityClassLabelVal, REntityId, REntity>
    rClassLabel: DependencyIndex<REntityId, REntityClassLabelVal, RClassId, RClassLabelValue>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.rEntity = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityClassLabel,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ))
        // stores the dependency of rEntityLabel (receiver) on rClassLabel (provider)
        this.rClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.rEntityClassLabel,
            this.wh.agg.rClassLabel,
            rEntityIdToString,
            stringToREntityId,
            rClassIdToString,
            stringToRClassId,
        ));


    }

}
