import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {rEntityIdToString, stringToREntityId, rClassIdToString, stringToRClassId} from '../../../base/functions'
import {REntityId, REntity} from '../../../primary-ds/entity/REntityService'
import {Warehouse} from '../../../Warehouse'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {Dependencies} from '../../../base/classes/Dependencies'

export class REntityClassLabelDependencies extends Dependencies {
    entity: DependencyIndex<REntityId, string, REntityId, REntity>
    rClassLabel: DependencyIndex<REntityId, string, RClassId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex<REntityId, string, REntityId, REntity>(
            this.wh.agg.rEntityClassLabel,
            this.wh.prim.rEntity,
            rEntityIdToString,
            stringToREntityId,
            rEntityIdToString,
            stringToREntityId,
        ))
        // stores the dependency of rEntityLabel (receiver) on rClassLabel (provider)
        this.rClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh.agg.rEntityClassLabel,
            this.wh.agg.rClassLabel,
            rEntityIdToString,
            stringToREntityId,
            rClassIdToString,
            stringToRClassId,
        ));


    }

}
