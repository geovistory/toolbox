import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService'
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService'
import {Warehouse} from '../../../Warehouse'
import {PClassLabelVal} from './PClassLabelService'
import {Injectable, Inject, forwardRef} from 'injection-js'

@Injectable()
export class PClassLabelDependencies extends Dependencies {
  proProject: DependencyIndex<PClassId, PClassLabelVal, ProjectId, ProjectVal>
  dfhClassLabel: DependencyIndex<PClassId, PClassLabelVal, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<PClassId, PClassLabelVal, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
    super()
    this.proProject = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassLabel,
      wh.prim.proProject,
    ))

    this.dfhClassLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassLabel,
      wh.prim.dfhClassLabel,
    ))

    this.proClassLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassLabel,
      wh.prim.proClassLabel,
    ))
  }
}
