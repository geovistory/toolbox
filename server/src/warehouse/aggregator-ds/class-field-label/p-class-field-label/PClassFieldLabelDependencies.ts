import {ClearAll} from '../../../base/classes/ClearAll'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {dfhPropertyIdToString, pClassFieldIdToString, projectIdToString, proPropertyIdToString, stringToDfhPropertyId, stringToPClassFieldId, stringToProjectId, stringToProPropertyId} from '../../../base/functions'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService'
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../../Warehouse'
import {PClassFieldId} from './PClassFieldLabelService'

export class PClassFieldLabelDependencies extends ClearAll {
  project: DependencyIndex<PClassFieldId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: DependencyIndex<PClassFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<PClassFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = new DependencyIndex(
      wh.agg.pClassFieldLabel,
      wh.prim.proProject,
      pClassFieldIdToString,
      stringToPClassFieldId,
      projectIdToString,
      stringToProjectId
    )

    this.dfhPropertyLabel = new DependencyIndex(
      wh.agg.pClassFieldLabel,
      wh.prim.dfhPropertyLabel,
      pClassFieldIdToString,
      stringToPClassFieldId,
      dfhPropertyIdToString,
      stringToDfhPropertyId
    )

    this.proPropertyLabel = new DependencyIndex(
      wh.agg.pClassFieldLabel,
      wh.prim.proPropertyLabel,
      pClassFieldIdToString,
      stringToPClassFieldId,
      proPropertyIdToString,
      stringToProPropertyId
    )
  }


  async clearAll() {
    await Promise.all([
      this.project.clearIdx(),
      this.dfhPropertyLabel.clearIdx(),
      this.proPropertyLabel.clearIdx(),
    ])
  }

  async initIdx() {}

}
