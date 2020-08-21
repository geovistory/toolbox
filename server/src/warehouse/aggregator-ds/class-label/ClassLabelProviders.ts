import {Providers} from '../../base/interfaces/Providers';
import {ClassId} from '../../primary-ds/FieldsConfigService';
import {DfhClassLabelId, DfhClassLabelVal} from '../../primary-ds/DfhClassLabelService';
import {ProClassLabelId, ProClassLabelVal} from '../../primary-ds/ProClassLabelService';
import {ClassLabelDependencies} from './ClassLabelDependencies';
import {Provider} from '../../base/classes/Provider';
import {ProjectId, ProjectVal} from '../../primary-ds/ProjectService';

export class ClassLabelProviders extends Providers<ClassId> {
  project: Provider<ClassId, string, ProjectId, ProjectVal>
  dfhClassLabel: Provider<ClassId, string, DfhClassLabelId, DfhClassLabelVal>
  proClassLabel: Provider<ClassId, string, ProClassLabelId, ProClassLabelVal>

  constructor(
    dep: ClassLabelDependencies,
    protected receiverKey: ClassId
  ) {
    super()
    this.project = this.registerProvider(dep.project, receiverKey);
    this.dfhClassLabel = this.registerProvider(dep.dfhClassLabel, receiverKey)
    this.proClassLabel = this.registerProvider(dep.proClassLabel, receiverKey);
  }
}

