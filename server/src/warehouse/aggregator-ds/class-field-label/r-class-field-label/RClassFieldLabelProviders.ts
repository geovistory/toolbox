import {Provider} from '../../../base/classes/Provider';
import {Providers} from '../../../base/interfaces/Providers';
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
import {RClassFieldLabelDependencies} from './RClassFieldLabelDependencies';
import {RClassFieldId} from './RClassFieldLabelService';


export class RClassFieldLabelProviders extends Providers<RClassFieldId> {
  dfhPropertyLabel: Provider<RClassFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: Provider<RClassFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  constructor(
    dep: RClassFieldLabelDependencies,
    protected receiverKey: RClassFieldId
  ) {
    super()
    this.dfhPropertyLabel = this.registerProvider(dep.dfhPropertyLabel, receiverKey)
    this.proPropertyLabel = this.registerProvider(dep.proPropertyLabel, receiverKey);
  }
}

