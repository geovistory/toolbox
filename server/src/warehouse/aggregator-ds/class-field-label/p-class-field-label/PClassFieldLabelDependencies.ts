import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService'
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../../Warehouse'
import {PClassFieldLabelId, PClassFieldLabelVal} from './PClassFieldLabelService'

export class PClassFieldLabelDependencies extends Dependencies {
  project: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, ProjectId, ProjectVal>
  dfhPropertyLabel: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<PClassFieldLabelId, PClassFieldLabelVal, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassFieldLabel,
      wh.prim.proProject,
    ))

    this.dfhPropertyLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassFieldLabel,
      wh.prim.dfhPropertyLabel,
    ))

    this.proPropertyLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassFieldLabel,
      wh.prim.proPropertyLabel,
    ))
  }


}
