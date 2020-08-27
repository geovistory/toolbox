import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {pPropertyIdToString, dfhPropertyIdToString, proPropertyIdToString, stringToPPropertyId, stringToDfhPropertyId, stringToProPropertyId, projectIdToString, stringToProjectId} from '../../base/functions'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../primary-ds/DfhPropertyLabelService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../Warehouse'
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService'
import {ClearAll} from '../../base/classes/ClearAll'
import {PPropertyId} from '../../primary-ds/PPropertyService'

export class PPropertyLabelDependencies extends ClearAll {
  project: DependencyIndex<PPropertyId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: DependencyIndex<PPropertyId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<PPropertyId, string, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = new DependencyIndex(
      wh.agg.pPropertyLabel,
      wh.prim.project,
      pPropertyIdToString,
      stringToPPropertyId,
      projectIdToString,
      stringToProjectId
    )

    this.dfhPropertyLabel = new DependencyIndex(
      wh.agg.pPropertyLabel,
      wh.prim.dfhPropertyLabel,
      pPropertyIdToString,
      stringToPPropertyId,
      dfhPropertyIdToString,
      stringToDfhPropertyId
    )

    this.proPropertyLabel = new DependencyIndex(
      wh.agg.pPropertyLabel,
      wh.prim.proPropertyLabel,
      pPropertyIdToString,
      stringToPPropertyId,
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
