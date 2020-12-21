import {Provider} from '../../base/classes/Provider';
import {Providers} from '../../base/interfaces/Providers';
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {OutgoingPropertyVal, OutgoingProperyId} from '../../primary-ds/DfhOutgoingPropertyService';
import {IdentifyingPropertyService, IdentifyingPropertyVal} from './IdentifyingPropertyService';


export class IdentifyingPropertyProviders extends Providers<RClassId> {
  outgoingProperty: Provider<RClassId, IdentifyingPropertyVal, OutgoingProperyId, OutgoingPropertyVal>

  constructor(
    dep: IdentifyingPropertyService,
    protected receiverKey: RClassId
  ) {
    super()
    this.outgoingProperty = this.registerProvider(dep.outgoingProperty, receiverKey);
  }
}

