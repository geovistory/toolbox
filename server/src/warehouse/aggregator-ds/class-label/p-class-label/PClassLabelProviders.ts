import {Providers} from '../../../base/interfaces/Providers';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {PClassLabelDependencies} from './PClassLabelDependencies';
import {Provider} from '../../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService';
import {PClassLabelVal} from './PClassLabelService';

export class PClassLabelProviders extends Providers<PClassId> {
  proProject: Provider<PClassId, PClassLabelVal, ProjectId, ProjectVal>
  dfhClassLabel: Provider<PClassId, PClassLabelVal, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: Provider<PClassId, PClassLabelVal, ProClassLabelId, ProClassLabelVal>

  constructor(
    dep: PClassLabelDependencies,
    protected receiverKey: PClassId
  ) {
    super()
    this.proProject = this.registerProvider(dep.proProject, receiverKey);
    this.dfhClassLabel = this.registerProvider(dep.dfhClassLabel, receiverKey)
    this.proClassLabel = this.registerProvider(dep.proClassLabel, receiverKey);
  }
}

