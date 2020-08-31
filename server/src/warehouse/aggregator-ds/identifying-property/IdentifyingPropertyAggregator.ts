import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {ClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';
import {IdentifyingPropertyVal} from './IdentifyingPropertyService';

export class IdentifyingPropertyAggregator extends AbstractAggregator<ClassId> {


  // the resulting label
  identyfyingProperties: IdentifyingPropertyVal = [];

  constructor(
    public providers: IdentifyingPropertyProviders,
    public id: ClassId
  ) {
    super()
  }

  async create() {
    await this.providers.load();

    const outProps = await this.providers.outgoingProperty.getItemsStartingWith(this.id.pkClass.toString());
    for (const p of outProps) {
      if (p.value.dfhIdentityDefining) {
        this.identyfyingProperties.push(p.value)
      }

    }
    return this
  }

}
