import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {classIdToString, dfhClassIdToString, proClassIdToString, stringToClassId, stringToDfhClassId, stringToProClassId, projectIdToString, stringToProjectId} from '../../base/functions'
import {PClassId} from '../../primary-ds/FieldsConfigService'
import {DfhClassLabelId, DfhClassLabelVal} from '../../primary-ds/DfhClassLabelService'
import {ProClassLabelId, ProClassLabelVal} from '../../primary-ds/ProClassLabelService'
import {Warehouse} from '../../Warehouse'
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService'
import {ClearAll} from '../../base/classes/ClearAll'

export class PClassLabelDependencies extends ClearAll {
  project: DependencyIndex<PClassId, string, ProjectId, ProjectVal>
  dfhClassLabel: DependencyIndex<PClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<PClassId, string, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = new DependencyIndex(
      wh.agg.pClassLabel,
      wh.prim.project,
      classIdToString,
      stringToClassId,
      projectIdToString,
      stringToProjectId
    )

    this.dfhClassLabel = new DependencyIndex(
      wh.agg.pClassLabel,
      wh.prim.dfhClassLabel,
      classIdToString,
      stringToClassId,
      dfhClassIdToString,
      stringToDfhClassId
    )

    this.proClassLabel = new DependencyIndex(
      wh.agg.pClassLabel,
      wh.prim.proClassLabel,
      classIdToString,
      stringToClassId,
      proClassIdToString,
      stringToProClassId
    )
  }


  async clearAll() {
    await Promise.all([
      this.project.clearIdx(),
      this.dfhClassLabel.clearIdx(),
      this.proClassLabel.clearIdx(),
    ])
  }

  async initIdx() {}

}
