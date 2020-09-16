import {Provider} from '../../base/classes/Provider';
import {Providers} from '../../base/interfaces/Providers';
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService';
import {IdentifyingPropertyDependencies} from './IdentifyingPropertyDependencies';
import {IdentifyingPropertyVal} from './IdentifyingPropertyService';


export class IdentifyingPropertyProviders extends Providers<RClassId> {
  outgoingProperty: Provider<RClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

  constructor(
    dep: IdentifyingPropertyDependencies,
    protected receiverKey: RClassId
  ) {
    super()
    this.outgoingProperty = this.registerProvider(dep.outgoingProperty, receiverKey);
  }
}

