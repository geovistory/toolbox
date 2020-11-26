import {Dependencies} from '../../base/classes/Dependencies'
import {DependencyIndex} from '../../base/classes/DependencyIndex'
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService'
import {OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService'
import {Warehouse} from '../../Warehouse'
import {IdentifyingPropertyVal} from './IdentifyingPropertyService'
import {Injectable, Inject, forwardRef} from 'injection-js';

@Injectable()
export class IdentifyingPropertyDependencies extends Dependencies {
  outgoingProperty: DependencyIndex<RClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

  // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
    constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
    super()
    this.outgoingProperty = this.registerDepIdx(new DependencyIndex(
      wh,
      wh.agg.identifyingProperty,
      wh.prim.dfhOutgoingProperty,
    ))

  }


}
