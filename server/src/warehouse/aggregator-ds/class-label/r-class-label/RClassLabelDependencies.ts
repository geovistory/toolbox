import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {rClassIdToString, dfhClassIdToString, proClassIdToString, stringToRClassId, stringToDfhClassId, stringToProClassId} from '../../../base/functions'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService'
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService'
import {Warehouse} from '../../../Warehouse'

export class RClassLabelDependencies extends ClearAll {
  dfhClassLabel: DependencyIndex<RClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<RClassId, string, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(private wh: Warehouse) {
    super()


    this.dfhClassLabel = new DependencyIndex(
      wh.agg.rClassLabel,
      wh.prim.dfhClassLabel,
      rClassIdToString,
      stringToRClassId,
      dfhClassIdToString,
      stringToDfhClassId
    )

    this.proClassLabel = new DependencyIndex(
      wh.agg.rClassLabel,
      wh.prim.proClassLabel,
      rClassIdToString,
      stringToRClassId,
      proClassIdToString,
      stringToProClassId
    )
  }


  async clearAll() {
    await Promise.all([
      this.dfhClassLabel.clearIdx(),
      this.proClassLabel.clearIdx(),
    ])
  }

  async initIdx() {}

}
