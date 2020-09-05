import {Dependencies} from '../../base/classes/Dependencies'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {outgoingProperyIdToString, rClassIdToString, stringToOutgoingProperyId, stringToRClassId} from '../../base/functions'
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService'
import {OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService'
import {Warehouse} from '../../Warehouse'
import {IdentifyingPropertyVal} from './IdentifyingPropertyService'

export class IdentifyingPropertyDependencies extends Dependencies {
  outgoingProperty: DependencyIndex<RClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.outgoingProperty = this.registerDepIdx(new DependencyIndex(
      wh.agg.identifyingProperty,
      wh.prim.dfhOutgoingProperty,
      rClassIdToString,
      stringToRClassId,
      outgoingProperyIdToString,
      stringToOutgoingProperyId
    ))

  }


}
