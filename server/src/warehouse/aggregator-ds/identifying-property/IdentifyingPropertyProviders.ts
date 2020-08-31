import {Provider} from '../../base/classes/Provider';
import {Providers} from '../../base/interfaces/Providers';
import {ClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService';
import {IdentifyingPropertyDependencies} from './IdentifyingPropertyDependencies';
import {IdentifyingPropertyVal} from './IdentifyingPropertyService';


export class IdentifyingPropertyProviders extends Providers<ClassId> {
  outgoingProperty: Provider<ClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

  constructor(
    dep: IdentifyingPropertyDependencies,
    protected receiverKey: ClassId
  ) {
    super()
    this.outgoingProperty = this.registerProvider(dep.outgoingProperty, receiverKey);
  }
}

