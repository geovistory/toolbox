import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pEntityIdToString, stringToPEntityId, pClassIdToString, stringToPClassId} from '../../../base/functions'
import {PEntityId, PEntity} from '../../../primary-ds/entity/PEntityService'
import {Warehouse} from '../../../Warehouse'
import {PClassId} from '../../../primary-ds/PClassFieldsConfigService'

export class PEntityClassLabelDependencies extends ClearAll {
    entity: DependencyIndex<PEntityId, string, PEntityId, PEntity>
    pClassLabel: DependencyIndex<PEntityId, string, PClassId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex<PEntityId, string, PEntityId, PEntity>(
            this.wh.agg.pEntityClassLabel,
            this.wh.prim.pEntity,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
        )
        // stores the dependency of pEntityLabel (receiver) on pClassLabel (provider)
        this.pClassLabel = new DependencyIndex(
            this.wh.agg.pEntityClassLabel,
            this.wh.agg.pClassLabel,
            pEntityIdToString,
            stringToPEntityId,
            pClassIdToString,
            stringToPClassId,
        );


    }

    async clearAll() {
        await Promise.all([
            this.pClassLabel.clearIdx(),
        ])
    }

    async initIdx() {}



}
