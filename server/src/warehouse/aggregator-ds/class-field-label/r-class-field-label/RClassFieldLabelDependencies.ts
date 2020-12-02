// import {Dependencies} from '../../../base/classes/Dependencies'
// import {DependencyIndex} from '../../../base/classes/DependencyIndex'
// import {DfhPropertyLabelId, DfhPropertyLabelVal} from '../../../primary-ds/DfhPropertyLabelService'
// import {ProPropertyLabelId, ProPropertyLabelVal} from '../../../primary-ds/ProPropertyLabelService'
// import {Warehouse} from '../../../Warehouse'
// import {RClassFieldId, RClassFieldVal} from './RClassFieldLabelService'
// import {Injectable, Inject, forwardRef} from 'injection-js';

// @Injectable()
// export class RClassFieldLabelDependencies extends Dependencies {
//   dfhPropertyLabel: DependencyIndex<RClassFieldId, RClassFieldVal, DfhPropertyLabelId, DfhPropertyLabelVal>
//   proPropertyLabel: DependencyIndex<RClassFieldId, RClassFieldVal, ProPropertyLabelId, ProPropertyLabelVal>

//   // entityFulltextPropertyLabelDep: DependencyIndex<EntityId, string, PropertyId, string>;
//   constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {

//     super()

//     this.dfhPropertyLabel = this.registerDepIdx(new DependencyIndex(
//       wh,
//       wh.agg.rClassFieldLabel,
//       wh.prim.dfhPropertyLabel,
//     ))

//     this.proPropertyLabel = this.registerDepIdx(new DependencyIndex(
//       wh,
//       wh.agg.rClassFieldLabel,
//       wh.prim.proPropertyLabel,
//     ))
//   }

// }

