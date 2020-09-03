import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {dfhClassIdToString, pClassIdToString, proClassIdToString, projectIdToString, stringToDfhClassId, stringToPClassId, stringToProClassId, stringToProjectId} from '../../../base/functions'
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService'
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService'
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService'
import {Warehouse} from '../../../Warehouse'

export class PClassLabelDependencies extends Dependencies {
  project: DependencyIndex<PClassId, string, ProjectId, ProjectVal>
  dfhClassLabel: DependencyIndex<PClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<PClassId, string, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = this.registerDepIdx(new DependencyIndex(
      wh.agg.pClassLabel,
      wh.prim.proProject,
      pClassIdToString,
      stringToPClassId,
      projectIdToString,
      stringToProjectId
    ))

    this.dfhClassLabel = this.registerDepIdx(new DependencyIndex(
      wh.agg.pClassLabel,
      wh.prim.dfhClassLabel,
      pClassIdToString,
      stringToPClassId,
      dfhClassIdToString,
      stringToDfhClassId
    ))

    this.proClassLabel = this.registerDepIdx(new DependencyIndex(
      wh.agg.pClassLabel,
      wh.prim.proClassLabel,
      pClassIdToString,
      stringToPClassId,
      proClassIdToString,
      stringToProClassId
    ))
  }
}
