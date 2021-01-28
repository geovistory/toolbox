// import {Provider} from '../../../base/classes/Provider';
// import {Providers} from "../../../base/interfaces/Providers";
// import {DfhClassHasTypePropVal, RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
// import {EntityFields} from "../../../primary-ds/edge/edge.commons";
// import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService';
// import {PEntityTimeSpanService, PEntityTimeSpanVal} from './PEntityTimeSpanService';

// export class PEntityTimeSpanProviders extends Providers<PEntityId> {
//     pEntity: Provider<PEntityId, PEntityTimeSpanVal, PEntityId, PEntity>;
//     pEdges: Provider<PEntityId, PEntityTimeSpanVal, PEntityId, EntityFields>;
//     pEntityLabel: Provider<PEntityId, PEntityTimeSpanVal, PEntityId, string>;
//     dfhClassHasTypeProp: Provider<PEntityId, PEntityTimeSpanVal, RClassId, DfhClassHasTypePropVal>;
//     constructor(
//         dep: PEntityTimeSpanService,
//         protected receiverKey: PEntityId
//     ) {
//         super()
//         this.pEntity = this.registerProvider(dep.depPEntity, receiverKey)
//         this.pEdges = this.registerProvider(dep.depPEdge, receiverKey)
//     }

// }

