import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {dfhClassIdToString, proClassIdToString, rClassIdToString, stringToDfhClassId, stringToProClassId, stringToRClassId} from '../../../base/functions'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService'
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService'
import {Warehouse} from '../../../Warehouse'

export class RClassLabelDependencies extends Dependencies {
  dfhClassLabel: DependencyIndex<RClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<RClassId, string, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(private wh: Warehouse) {
    super()


    this.dfhClassLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.rClassLabel,
      wh.prim.dfhClassLabel,
      rClassIdToString,
      stringToRClassId,
      dfhClassIdToString,
      stringToDfhClassId
    ))

    this.proClassLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.rClassLabel,
      wh.prim.proClassLabel,
      rClassIdToString,
      stringToRClassId,
      proClassIdToString,
      stringToProClassId
    ))
  }



}