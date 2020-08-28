import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {dfhPropertyIdToString, pFieldIdToString, projectIdToString, proPropertyIdToString, stringToDfhPropertyId, stringToPFieldId, stringToProjectId, stringToProPropertyId} from '../../base/functions'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../primary-ds/DfhPropertyLabelService'
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../Warehouse'
import {PFieldId} from './PPropertyLabelService'

export class PPropertyLabelDependencies extends ClearAll {
  project: DependencyIndex<PFieldId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: DependencyIndex<PFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<PFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = new DependencyIndex(
      wh.agg.pPropertyLabel,
      wh.prim.project,
      pFieldIdToString,
      stringToPFieldId,
      projectIdToString,
      stringToProjectId
    )

    this.dfhPropertyLabel = new DependencyIndex(
      wh.agg.pPropertyLabel,
      wh.prim.dfhPropertyLabel,
      pFieldIdToString,
      stringToPFieldId,
      dfhPropertyIdToString,
      stringToDfhPropertyId
    )

    this.proPropertyLabel = new DependencyIndex(
      wh.agg.pPropertyLabel,
      wh.prim.proPropertyLabel,
      pFieldIdToString,
      stringToPFieldId,
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
