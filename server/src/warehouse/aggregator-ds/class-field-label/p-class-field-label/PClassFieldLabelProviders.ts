// import {Provider} from '../../../base/classes/Provider';
// import {Providers} from '../../../base/interfaces/Providers';
// import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
// import {ProjectId, ProjectVal} from '../../../primary-ds/ProProjectService';
// import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
// import {PClassFieldLabelId, PClassFieldLabelService, PClassFieldLabelVal} from './PClassFieldLabelService';


// export class PClassFieldLabelProviders extends Providers<PClassFieldLabelId> {
//   project: Provider<PClassFieldLabelId, PClassFieldLabelVal, ProjectId, ProjectVal>
//   dfhPropertyLabel: Provider<PClassFieldLabelId, PClassFieldLabelVal, DfhPropertyLabelId, DfhPropertyLabelVal>
//   proPropertyLabel: Provider<PClassFieldLabelId, PClassFieldLabelVal, ProPropertyLabelId, ProPropertyLabelVal>

//   constructor(
//     dep: PClassFieldLabelService,
//     protected receiverKey: PClassFieldLabelId
//   ) {
//     super()
//     this.project = this.registerProvider(dep.depProProject, receiverKey);
//     this.dfhPropertyLabel = this.registerProvider(dep.depDfhPropertyLabel, receiverKey)
//     this.proPropertyLabel = this.registerProvider(dep.depProPropertyLabel, receiverKey);
//   }
// }

