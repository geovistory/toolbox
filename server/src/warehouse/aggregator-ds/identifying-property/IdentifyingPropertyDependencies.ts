import {ClearAll} from '../../base/classes/ClearAll'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {classIdToString, outgoingProperyIdToString, stringToClassId, stringToOutgoingProperyId} from '../../base/functions'
import {ClassId} from '../../primary-ds/DfhClassHasTypePropertyService'
import {OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService'
import {Warehouse} from '../../Warehouse'
import {IdentifyingPropertyVal} from './IdentifyingPropertyService'

export class IdentifyingPropertyDependencies extends ClearAll {
  outgoingProperty: DependencyIndex<ClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
  constructor(private wh: Warehouse) {
    super()
    this.outgoingProperty = new DependencyIndex(
      wh.agg.identifyingProperty,
      wh.prim.dfhOutgoingProperty,
      classIdToString,
      stringToClassId,
      outgoingProperyIdToString,
      stringToOutgoingProperyId
    )

  }


  async clearAll() {
    await Promise.all([
      this.outgoingProperty.clearIdx(),
    ])
  }

  async initIdx() {}

}
