// import {Provider} from '../../../base/classes/Provider';
// import {Providers} from '../../../base/interfaces/Providers';
// import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService';
// import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService';
// import {RClassFieldId, RClassFieldLabelService, RClassFieldVal} from './RClassFieldLabelService';


// export class RClassFieldLabelProviders extends Providers<RClassFieldId> {
//   dfhPropertyLabel: Provider<RClassFieldId, RClassFieldVal, DfhPropertyLabelId, DfhPropertyLabelVal>
//   proPropertyLabel: Provider<RClassFieldId, RClassFieldVal, ProPropertyLabelId, ProPropertyLabelVal>

//   constructor(
//     dep: RClassFieldLabelService,
//     protected receiverKey: RClassFieldId
//   ) {
//     super()
//     this.dfhPropertyLabel = this.registerProvider(dep.depDfhPropertyLabel, receiverKey)
//     this.proPropertyLabel = this.registerProvider(dep.depProPropertyLabel, receiverKey);
//   }
// }

