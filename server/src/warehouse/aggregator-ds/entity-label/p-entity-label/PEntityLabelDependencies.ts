// import {Dependencies} from '../../../base/classes/Dependencies'
// import {DependencyIndex} from '../../../base/classes/DependencyIndex'
// import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService'
// import {EntityFields} from "../../../primary-ds/edge/edge.commons"
// import {PEntity, PEntityId} from '../../../primary-ds/entity/PEntityService'
// import {PClassId} from '../../../primary-ds/ProClassFieldsConfigService'
// import {EntityLabelConfigVal} from '../../../primary-ds/ProEntityLabelConfigService'
// import {Warehouse} from '../../../Warehouse'
// import {IdentifyingPropertyVal} from '../../identifying-property/IdentifyingPropertyService'
// import {EntityLabelVal} from '../entity-label.commons'
// import {Injectable, Inject, forwardRef} from 'injection-js';

// @Injectable()
// export class PEntityLabelDependencies extends Dependencies {
//     entity: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, PEntity>
//     entityLabelConfig: DependencyIndex<PEntityId, EntityLabelVal, PClassId, EntityLabelConfigVal>
//     identifyingProperty: DependencyIndex<PEntityId, EntityLabelVal, RClassId, IdentifyingPropertyVal>
//     entityLabel: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityLabelVal>
//     edge: DependencyIndex<PEntityId, EntityLabelVal, PEntityId, EntityFields>

//     // entityFulltextClassLabelDep: DependencyIndex<EntityId, string, ClassId, string>;
//       constructor(@Inject(forwardRef(() => Warehouse)) private wh: Warehouse) {
//         super()
//         // stores the dependency of entityLabel (receiver) on entity (provider)
//         this.entity = this.registerDepIdx(new DependencyIndex(
//             this.wh,
//             this.wh.agg.pEntityLabel,
//             this.wh.prim.pEntity,
//         ))

//         // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
//         this.entityLabelConfig = this.registerDepIdx(new DependencyIndex(
//             this.wh,
//             this.wh.agg.pEntityLabel,
//             this.wh.prim.proEntityLabelConfig,
//         ))
//         // stores the dependency of entityLabel (receiver) on entityLabelConfig (provider)
//         this.identifyingProperty = this.registerDepIdx(new DependencyIndex(
//             this.wh,
//             this.wh.agg.pEntityLabel,
//             this.wh.agg.identifyingProperty,
//         ))


//         // stores the dependency of entityLabel (receiver) on entityLabel (provider)
//         this.entityLabel = this.registerDepIdx(new DependencyIndex(
//             this.wh,
//             this.wh.agg.pEntityLabel,
//             this.wh.agg.pEntityLabel,
//         ))

//         // stores the dependency of entityLabel (receiver) on edge (provider)
//         this.edge = this.registerDepIdx(new DependencyIndex(
//             this.wh,
//             this.wh.agg.pEntityLabel,
//             this.wh.prim.pEdge,
//         ))

//         // stores the dependency of entityFullText (receiver) on the classLabel (provider)
//         // entityClassLabelDep = new EntityClassDependencyIndex();

//     }



// }
