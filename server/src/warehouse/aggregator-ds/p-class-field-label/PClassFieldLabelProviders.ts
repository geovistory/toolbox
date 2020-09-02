import {Providers} from '../../base/interfaces/Providers';

import {PClassFieldLabelDependencies} from './PClassFieldLabelDependencies';
import {Provider} from '../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../primary-ds/ProProjectService';
import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelId, ProPropertyLabelVal} from '../../primary-ds/ProPropertyLabelService';
import {PClassFieldId} from './PClassFieldLabelService';

export class PClassFieldLabelProviders extends Providers<PClassFieldId> {
  project: Provider<PClassFieldId, string, ProjectId, ProjectVal>
  dfhPropertyLabel: Provider<PClassFieldId, string, DfhPropertyLabelId, DfhPropertyLabelVal>
  proPropertyLabel: Provider<PClassFieldId, string, ProPropertyLabelId, ProPropertyLabelVal>

  constructor(
    dep: PClassFieldLabelDependencies,
    protected receiverKey: PClassFieldId
  ) {
    super()
    this.project = this.registerProvider(dep.project, receiverKey);
    this.dfhPropertyLabel = this.registerProvider(dep.dfhPropertyLabel, receiverKey)
    this.proPropertyLabel = this.registerProvider(dep.proPropertyLabel, receiverKey);
  }
}

