import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pClassIdToString, pEntityIdToString, stringToPClassId, stringToPEntityId} from '../../../base/functions'
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {Warehouse} from '../../../Warehouse'

export class PEntityClassLabelDependencies extends Dependencies {
    entity: DependencyIndex<PEntityId, string, PEntityId, PEntity>
    pClassLabel: DependencyIndex<PEntityId, string, PClassId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex<PEntityId, string, PEntityId, PEntity>(
            this.wh,
            this.wh.agg.pEntityClassLabel,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        ))
        // stores the dependency of pEntityLabel (receiver) on pClassLabel (provider)
        this.pClassLabel = this.registerDepIdx(new DependencyIndex(
            this.wh,
            this.wh.agg.pEntityClassLabel,
            this.wh.agg.pClassLabel,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId,
        ))


    }



}
