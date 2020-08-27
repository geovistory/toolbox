import {Providers} from '../../base/interfaces/Providers';

import {PPropertyLabelDependencies} from './PPropertyLabelDependencies';
import {Provider} from '../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService';
import {PPropertyId} from '../../primary-ds/PPropertyService';
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../primary-ds/ProPropertyLabelService';

export class PPropertyLabelProviders extends Providers<PPropertyId> {
  project: Provider<PPropertyId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: Provider<PPropertyId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: Provider<PPropertyId, string, ProPropertyLabelId, ProPropertyLabelVal>

  constructor(
    dep: PPropertyLabelDependencies,
    protected receiverKey: PPropertyId
  ) {
    super()
    this.project = this.registerProvider(dep.project, receiverKey);
    this.dfhPropertyLabel = this.registerProvider(dep.dfhPropertyLabel, receiverKey)
    this.proPropertyLabel = this.registerProvider(dep.proPropertyLabel, receiverKey);
  }
}

