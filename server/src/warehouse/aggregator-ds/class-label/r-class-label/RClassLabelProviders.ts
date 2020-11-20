import {Provider} from '../../../base/classes/Provider';
import {Providers} from '../../../base/interfaces/Providers';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {RClassLabelDependencies} from './RClassLabelDependencies';
import {RClassLabelValue} from './RClassLabelService';

export class RClassLabelProviders extends Providers<RClassId> {
  dfhClassLabel: Provider<RClassId, RClassLabelValue, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: Provider<RClassId, RClassLabelValue, ProClassLabelId, ProClassLabelVal>

  constructor(
    dep: RClassLabelDependencies,
    protected receiverKey: RClassId
  ) {
    super()
    this.dfhClassLabel = this.registerProvider(dep.dfhClassLabel, receiverKey)
    this.proClassLabel = this.registerProvider(dep.proClassLabel, receiverKey);
  }
}

