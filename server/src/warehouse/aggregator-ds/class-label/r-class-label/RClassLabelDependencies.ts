import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService'
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService'
import {Warehouse} from '../../../Warehouse'
import {RClassLabelValue} from './RClassLabelService'

export class RClassLabelDependencies extends Dependencies {
  dfhClassLabel: DependencyIndex<RClassId, RClassLabelValue, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<RClassId, RClassLabelValue, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(private wh: Warehouse) {
    super()


    this.dfhClassLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.rClassLabel,
      wh.prim.dfhClassLabel,
    ))

    this.proClassLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.rClassLabel,
      wh.prim.proClassLabel,
    ))
  }



}
