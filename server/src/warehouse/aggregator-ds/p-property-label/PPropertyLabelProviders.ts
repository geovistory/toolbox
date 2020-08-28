import {Providers} from '../../base/interfaces/Providers';

import {PPropertyLabelDependencies} from './PPropertyLabelDependencies';
import {Provider} from '../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService';
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../primary-ds/ProPropertyLabelService';
import {PFieldId} from './PPropertyLabelService';

export class PPropertyLabelProviders extends Providers<PFieldId> {
  project: Provider<PFieldId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: Provider<PFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: Provider<PFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  constructor(
    dep: PPropertyLabelDependencies,
    protected receiverKey: PFieldId
  ) {
    super()
    this.project = this.registerProvider(dep.project, receiverKey);
    this.dfhPropertyLabel = this.registerProvider(dep.dfhPropertyLabel, receiverKey)
    this.proPropertyLabel = this.registerProvider(dep.proPropertyLabel, receiverKey);
  }
}

