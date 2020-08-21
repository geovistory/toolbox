// import { DependencyDataServices } from '../data-service-bundles/DependencyDataServices';
// import { EntityId } from '../data-services/primary/EntityService';
// import { Provider } from '../base/classes/Provider';
// import { Providers } from "../base/classes/Providers";
// import { ClassId } from '../data-services/primary/ClassConfigService';
// export class PreviousEntityPreviewProviders implements Providers {
//     entityLabels: Provider<EntityId, EntityId>;
//     classLabels: Provider<EntityId, ClassId>;
//     constructor(
//         dep: DependencyDataServices,
//         private entityId: EntityId
//     ) {
//         this.entityLabels = new Provider(dep.entityLabelEntityLabelDep, entityId);
//         this.classLabels = new Provider(dep.entityClassLabelDep, entityId);
//     }
//     async load() {
//         await Promise.all([
//             this.entityLabels.loadProvidersInCache(this.entityId),
//             this.classLabels.loadProvidersInCache(this.entityId)
//         ])
//     }
//     async removeProvidersFromIndexes() {
//         await Promise.all([
//             this.entityLabels.removeCachedProvidersFromIndex(),
//             this.classLabels.removeCachedProvidersFromIndex()
//         ])
//     }
// }
