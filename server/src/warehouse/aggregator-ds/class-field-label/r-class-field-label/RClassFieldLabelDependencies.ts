import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {dfhPropertyIdToString, proPropertyIdToString, rClassFieldIdToString, stringToDfhPropertyId, stringToProPropertyId, stringToRClassFieldId} from '../../../base/functions'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../../Warehouse'
import {RClassFieldId} from './RClassFieldLabelService'

export class RClassFieldLabelDependencies extends ClearAll {
  dfhPropertyLabel: DependencyIndex<RClassFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<RClassFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()

    this.dfhPropertyLabel = new DependencyIndex(
      wh.agg.rClassFieldLabel,
      wh.prim.dfhPropertyLabel,
      rClassFieldIdToString,
      stringToRClassFieldId,
      dfhPropertyIdToString,
      stringToDfhPropertyId
    )

    this.proPropertyLabel = new DependencyIndex(
      wh.agg.rClassFieldLabel,
      wh.prim.proPropertyLabel,
      rClassFieldIdToString,
      stringToRClassFieldId,
      proPropertyIdToString,
      stringToProPropertyId
    )
  }


  async clearAll() {
    await Promise.all([
      this.dfhPropertyLabel.clearIdx(),
      this.proPropertyLabel.clearIdx(),
    ])
  }

  async initIdx() {}

}
