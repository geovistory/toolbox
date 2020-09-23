import {Providers} from '../../../base/interfaces/Providers';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {PClassLabelDependencies} from './PClassLabelDependencies';
import {Provider} from '../../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService';

export class PClassLabelProviders extends Providers<PClassId> {
  project: Provider<PClassId, string, ProjectId, ProjectVal>
  dfhClassLabel: Provider<PClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: Provider<PClassId, string, ProClassLabelId, ProClassLabelVal>

  constructor(
    dep: PClassLabelDependencies,
    protected receiverKey: PClassId
  ) {
    super()
    this.project = this.registerProvider(dep.project, receiverKey);
    this.dfhClassLabel = this.registerProvider(dep.dfhClassLabel, receiverKey)
    this.proClassLabel = this.registerProvider(dep.proClassLabel, receiverKey);
  }
}

