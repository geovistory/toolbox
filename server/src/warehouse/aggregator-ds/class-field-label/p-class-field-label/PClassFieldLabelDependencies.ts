import {Dependencies} from '../../../base/classes/Dependencies'
import {DependencyIndex} from '../../../base/classes/DependencyIndex'
import {dfhPropertyIdToString, pClassFieldIdToString, projectIdToString, proPropertyIdToString, stringToDfhPropertyId, stringToPClassFieldId, stringToProjectId, stringToProPropertyId} from '../../../base/functions'
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService'
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService'
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService'
import {Warehouse} from '../../../Warehouse'
import {PClassFieldLabelId} from './PClassFieldLabelService'

export class PClassFieldLabelDependencies extends Dependencies {
  project: DependencyIndex<PClassFieldLabelId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: DependencyIndex<PClassFieldLabelId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: DependencyIndex<PClassFieldLabelId, string, ProPropertyLabelId, ProPropertyLabelVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.project = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassFieldLabel,
      wh.prim.proProject,
      pClassFieldIdToString,
      stringToPClassFieldId,
      projectIdToString,
      stringToProjectId
    ))

    this.dfhPropertyLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassFieldLabel,
      wh.prim.dfhPropertyLabel,
      pClassFieldIdToString,
      stringToPClassFieldId,
      dfhPropertyIdToString,
      stringToDfhPropertyId
    ))

    this.proPropertyLabel = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.pClassFieldLabel,
      wh.prim.proPropertyLabel,
      pClassFieldIdToString,
      stringToPClassFieldId,
      proPropertyIdToString,
      stringToProPropertyId
    ))
  }


}
