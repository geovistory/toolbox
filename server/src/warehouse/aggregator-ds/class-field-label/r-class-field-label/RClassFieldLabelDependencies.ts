import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {dfhPropertyIdToString, proPropertyIdToString, rClassFieldIdToString, stringToDfhPropertyId, stringToProPropertyId, stringToRClassFieldId} from '../../../base/functions'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../../Warehouse'
import {RClassFieldId} from './RClassFieldLabelService'

export class RClassFieldLabelDependencies extends Dependencies {
  dfhPropertyLabel: DependencyIndex<RClassFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<RClassFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()

    this.dfhPropertyLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.rClassFieldLabel,
      wh.prim.dfhPropertyLabel,
      rClassFieldIdToString,
      stringToRClassFieldId,
      dfhPropertyIdToString,
      stringToDfhPropertyId
    ))

    this.proPropertyLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.rClassFieldLabel,
      wh.prim.proPropertyLabel,
      rClassFieldIdToString,
      stringToRClassFieldId,
      proPropertyIdToString,
      stringToProPropertyId
    ))
  }

}
