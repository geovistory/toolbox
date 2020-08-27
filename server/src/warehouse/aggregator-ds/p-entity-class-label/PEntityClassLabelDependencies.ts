import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {entityIdToString, stringToEntityId, pClassIdToString, stringToPClassId} from '../../base/functions'
import {PEntityId, ProjectEntity} from '../../primary-ds/PEntityService'
import {Warehouse} from '../../Warehouse'
import {PClassId} from '../../primary-ds/PClassFieldsConfigService'

export class PEntityClassLabelDependencies extends ClearAll {
    entity: DependencyIndex<PEntityId, string, PEntityId, ProjectEntity>
    pClassLabel: DependencyIndex<PEntityId, string, PClassId, string>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = new DependencyIndex<PEntityId, string, PEntityId, ProjectEntity>(
            this.wh.agg.pEntityClassLabel,
            this.wh.prim.pEntity,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )
        // stores the dependency of pEntityLabel (receiver) on pClassLabel (provider)
        this.pClassLabel = new DependencyIndex(
            this.wh.agg.pEntityClassLabel,
            this.wh.agg.pClassLabel,
            entityIdToString,
            stringToEntityId,
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
