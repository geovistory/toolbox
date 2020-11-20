import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {pClassIdToString, pEntityIdToString, stringToPClassId, stringToPEntityId} from '../../../base/functions'
import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {Warehouse} from '../../../Warehouse'
import {PEntityClassLabelVal} from './PEntityClassLabelService'
import {PClassLabelVal} from '../../class-label/p-class-label/PClassLabelService'

export class PEntityClassLabelDependencies extends Dependencies {
    entity: DependencyIndex<PEntityId, PEntityClassLabelVal, PEntityId, PEntity>
    pClassLabel: DependencyIndex<PEntityId, PEntityClassLabelVal, PClassId, PClassLabelVal>

    constructor(private wh: Warehouse) {
        super()
        // stores the dependency of entityLabel (receiver) on entity (provider)
        this.entity = this.registerDepIdx(new DependencyIndex(
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
