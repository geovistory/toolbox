import {Provider} from '../../../base/classes/Provider';
import {Providers} from '../../../base/interfaces/Providers';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {RClassLabelDependencies} from './RClassLabelDependencies';

export class RClassLabelProviders extends Providers<RClassId> {
  dfhClassLabel: Provider<RClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: Provider<RClassId, string, ProClassLabelId, ProClassLabelVal>

  constructor(
    dep: RClassLabelDependencies,
    protected receiverKey: RClassId
  ) {
    super()
    this.dfhClassLabel = this.registerProvider(dep.dfhClassLabel, receiverKey)
    this.proClassLabel = this.registerProvider(dep.proClassLabel, receiverKey);
  }
}

