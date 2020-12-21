import {Provider} from '../../../base/classes/Provider';
import {Providers} from '../../../base/interfaces/Providers';
import {DfhClassLabelId, DfhClassLabelVal} from '../../../primary-ds/DfhClassLabelService';
import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService';
import {ProClassLabelId, ProClassLabelVal} from '../../../primary-ds/ProClassLabelService';
import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService';
import {PClassLabelService, PClassLabelVal} from './PClassLabelService';

export class PClassLabelProviders extends Providers<PClassId> {
  proProject: Provider<PClassId, PClassLabelVal, ProjectId, ProjectVal>
  dfhClassLabel: Provider<PClassId, PClassLabelVal, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: Provider<PClassId, PClassLabelVal, ProClassLabelId, ProClassLabelVal>

  constructor(
    dep: PClassLabelService,
    protected receiverKey: PClassId
  ) {
    super()
    this.proProject = this.registerProvider(dep.depProProject, receiverKey);
    this.dfhClassLabel = this.registerProvider(dep.depDfhClassLabel, receiverKey)
    this.proClassLabel = this.registerProvider(dep.depProClassLabel, receiverKey);
  }
}

