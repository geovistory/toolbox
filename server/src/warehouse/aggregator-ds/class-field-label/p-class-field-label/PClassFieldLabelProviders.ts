import {Providers} from '../../../base/interfaces/Providers';

import {PClassFieldLabelDependencies} from './PClassFieldLabelDependencies';
import {Provider} from '../../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService';
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
import {PClassFieldLabelId, PClassFieldLabelVal} from './PClassFieldLabelService';

export class PClassFieldLabelProviders extends Providers<PClassFieldLabelId> {
  project: Provider<PClassFieldLabelId, PClassFieldLabelVal, ProjectId, ProjectVal>
  dfhPropertyLabel: Provider<PClassFieldLabelId, PClassFieldLabelVal, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: Provider<PClassFieldLabelId, PClassFieldLabelVal, ProPropertyLabelId, ProPropertyLabelVal>

  constructor(
    dep: PClassFieldLabelDependencies,
    protected receiverKey: PClassFieldLabelId
  ) {
    super()
    this.project = this.registerProvider(dep.project, receiverKey);
    this.dfhPropertyLabel = this.registerProvider(dep.dfhPropertyLabel, receiverKey)
    this.proPropertyLabel = this.registerProvider(dep.proPropertyLabel, receiverKey);
  }
}

