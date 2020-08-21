// import { Main } from '../../Main';
// import { IndexDB } from '../../base/classes/IndexDB';
// import { EntityRich } from '../../aggregators/EntityPreviewCreator';
// import { EntityId } from '../primary/EntityService';


// export class EntityPreviewService extends IndexDB<EntityId, EntityRich> {


//     constructor(private main: Main) { super() }

//     async add(key: EntityId, val: EntityRich) {

//         // if entity label differs, add request for entities receiving label from this entity
//         const existingEp = await this.getFromIdx(key);
//         if (existingEp?.label !== val.label) {
//             const receivers = await this.main.dep.entityLabelEntityLabelDep.getReceivers(key)
//             for (const receiver of receivers) {
//                 await this.main.updateService.addUpdateRequest(receiver)
//             }
//         }

//         await this.addToIdx(key, val)


//     }

//     async remove(key: EntityId) {
//         // add update requests for everything dependent on this entity

//         await this.removeFromIdx(key)
//     };


//     keyToString(key: EntityId): string {
//         return key.fkProject + '_' + key.pkEntity
//     }

//     stringToKey(str: string): EntityId {
//         const [fkProject, pkEntity] = str.split('_')
//         return { fkProject: parseInt(fkProject, 10), pkEntity: parseInt(pkEntity, 10) };
//     }

// }