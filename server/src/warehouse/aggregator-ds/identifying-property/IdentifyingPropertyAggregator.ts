import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
import {IdentifyingPropertyProviders} from './IdentifyingPropertyProviders';
import {IdentifyingPropertyVal} from './IdentifyingPropertyService';

export class IdentifyingPropertyAggregator extends AbstractAggregator<IdentifyingPropertyVal> {


  // the resulting label
  identyfyingProperties: IdentifyingPropertyVal = [];

  constructor(
    public providers: IdentifyingPropertyProviders,
    public id: RClassId
  ) {
    super()
  }

  async create() {
    const outProps = await this.providers.outgoingProperty.getItemsWith({fkDomain: this.id.pkClass});
    for (const p of outProps) {
      if (p.value.dfhIdentityDefining) {
        this.identyfyingProperties.push(p.value)
      }

    }
    return this.identyfyingProperties
  }

}
