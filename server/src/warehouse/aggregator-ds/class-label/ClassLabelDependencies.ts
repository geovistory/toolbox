import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {classIdToString, dfhClassIdToString, proClassIdToString, stringToClassId, stringToDfhClassId, stringToProClassId, projectIdToString, stringToProjectId} from '../../base/functions'
import {ClassId} from '../../primary-ds/FieldsConfigService'
import {DfhClassLabelId, DfhClassLabelVal} from '../../primary-ds/DfhClassLabelService'
import {ProClassLabelId, ProClassLabelVal} from '../../primary-ds/ProClassLabelService'
import {Warehouse} from '../../Warehouse'
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService'
import {ClearAll} from '../../base/classes/ClearAll'

export class ClassLabelDependencies extends ClearAll {
  project: DependencyIndex<ClassId, string, ProjectId, ProjectVal>
  dfhClassLabel: DependencyIndex<ClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: DependencyIndex<ClassId, string, ProClassLabelId, ProClassLabelVal>

  // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
  constructor(private main: Warehouse) {
    super()
    this.project = new DependencyIndex(
      main.agg.classLabel,
      main.prim.project,
      classIdToString,
      stringToClassId,
      projectIdToString,
      stringToProjectId
    )

    this.dfhClassLabel = new DependencyIndex(
      main.agg.classLabel,
      main.prim.dfhClassLabel,
      classIdToString,
      stringToClassId,
      dfhClassIdToString,
      stringToDfhClassId
    )

    this.proClassLabel = new DependencyIndex(
      main.agg.classLabel,
      main.prim.proClassLabel,
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
