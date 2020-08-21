// import { ClassId, FieldsConfig } from '../data-services/primary/ClassConfigService';
// import { Edge, EdgesPerEntity } from '../data-services/primary/EdgeService';
// import { EntityLabelConfig } from '../data-services/primary/EntityLabelConfigService';
// import { Entity, EntityId } from '../data-services/primary/EntityService';
// import { FieldId } from '../data-services/primary/FieldLabelService';
// import { FieldWithEdges, Main } from '../Main';
// import { PreviousEntityPreviewProviders } from './PreviousEntityPreviewProviders';
// import { flatten } from 'ramda';

// export interface ClassLabelConfig {
//     fkProperty: number,
//     isOutgoing: boolean,
//     ordNum: number
//     nrOfStatementsInLabel?: number
// }
// export interface EntityRich extends Entity {
//     fields: FieldWithEdges[];
//     fullText: string
//     label: string
//     classLabel: string

//     // For testing / debugging 
//     labelDependsOnEntity: number[]

//     // For testing / debugging 
//     labelMissing?: boolean
// }

// export class EntityPreviewCreator {

//     entityRich: EntityRich;

//     // array of strings to create label
//     labelArr: string[] = [];

//     // array of strings to create full text
//     fullTextArr: string[] = [];

//     previousProviders: PreviousEntityPreviewProviders;

//     private entityId: EntityId;
//     private classId: ClassId;

//     constructor(
//         private main: Main,
//         private entity: Entity
//     ) {
//         this.entityId = {
//             fkProject: entity.fkProject,
//             pkEntity: entity.pkEntity
//         }
//         this.classId = {
//             fkProject: entity.fkProject,
//             pkClass: entity.fkClass
//         }
//         this.entityRich = {
//             fkProject: entity.fkProject,
//             fkClass: entity.fkClass,
//             pkEntity: entity.pkEntity,
//             fields: [],
//             labelDependsOnEntity: [],
//             label: '',
//             fullText: '',
//             classLabel: ''
//         };
//         this.previousProviders = new PreviousEntityPreviewProviders(this.main.dep, this.entityId)

//     }


//     /************************************************************************
//      * Methods for creating entity preview
//      ************************************************************************/

//     /**
//      *  Create EntityPreview (EP)
//      *
//      *  Gets values from Indexes and chaches dependencies in itself.
//      *
//      *  Example for getting related value:
//      *  - The `EP-12-Person` gets created and needs label of `EP-33-Naming`.
//      *    - Calls `this.getEpLabel(33)` to get label. `getEpLabel()` returns label from `EntityPreviewIdx` (which is still `undefined`) and adds `33` to `this.dependsOnEpLabels` cache
//      *  - The `EP-12-Person` needs label of `ClassLabel-591-21`.
//      *    - Calls `this.getClassLabel(591-21)` to get label. `getClassLabel()` returns label from `ClassLabelIdx` and adds `591-21` to `this.dependsOnClassLabels` cache
//      *
//      */
//     async createPreview() {
//         // we load previous providers in order to be able to potentially delete unnecessary
//         // providers in the end
//         const [fieldsWithEdges] = await Promise.all([
//             await this.getEdges(this.entityId) ?? {},
//             await this.previousProviders.load(),

//         ])


//         await Promise.all([
//             this.createLabel(fieldsWithEdges),
//             this.createFullTextAndEdges(fieldsWithEdges)
//         ])
//         return this
//     }


//     async createLabel(entityFieldsWithEdges: EdgesPerEntity) {
//         // get label config
//         const entityLabelConfig = await this.getEntityLabelConfig(this.classId)
//         const labelParts = entityLabelConfig?.labelParts ?? [];

//         // iterate over fields of label config first
//         const promises: Promise<{
//             strings: string[];
//             labelProviders: number[];
//         }>[] = []
//         for (const labelPart of labelParts) {
//             if (labelPart.field) {
//                 const edges = entityFieldsWithEdges?.[labelPart.field.fkProperty]?.[labelPart.field.isOutgoing ? 'outgoing' : 'incoming'];
//                 promises.push(this.createEntityLabelArray(edges, labelPart?.field?.nrOfStatementsInLabel))
//                 // const { strings, labelProviders } = await
//                 //     this.entityRich.labelDependsOnEntity.push(...labelProviders)
//                 // this.labelArr.push(...strings);
//             }
//         }
//         const res = await Promise.all(promises)
//         this.labelArr = []
//         res.forEach(x => {
//             this.labelArr.push(...x.strings)
//             this.entityRich.labelDependsOnEntity.push(...x.labelProviders)
//         })

//         // create string
//         if (this.labelArr.length === 0) {
//             this.labelArr.push('(no label)')
//             this.entityRich.labelMissing = true
//         }
//         this.entityRich.label = `${this.labelArr.join(', ')}`;
//     }

//     /**
//      * This function iterates over all fields. Per field:
//      * 1. it adds string elements to the full text of the entity
//      * 2. it adds all the edges (statements) to the entity
//      * 
//      * The order of the iteration is defined so:
//      * - it first iterates over fields of the class fields configuration in the given order of these fields
//      * - if edges are left, it iterates over the remaining edges, grouped by field, in an arbitrary order
//      *  
//      * @param entityFieldsWithEdges 
//      */
//     async createFullTextAndEdges(entityFieldsWithEdges: EdgesPerEntity) {
//         const c = await this.getFieldsConfig(this.classId)
//         const classConfigFields = c?.fields ?? []

//         const coveredFields: { [key: string]: boolean; } = {};

//         // iterate over the fields of this class config first
//         const promises: Promise<string[]>[] = []

//         for (const conf of classConfigFields) {

//             if (!coveredFields[conf.fkProperty + '_' + conf.isOutgoing]) {
//                 // get the edges of that field
//                 const edges = entityFieldsWithEdges?.[conf.fkProperty]?.[conf.isOutgoing ? 'outgoing' : 'incoming'];

//                 // add edges to resulting entity
//                 promises.push(this.processField(edges, conf.fkProperty, conf.isOutgoing));
//             }

//             // mark field as covered
//             coveredFields[conf.fkProperty + '_' + conf.isOutgoing] = true;
//         }

//         // iterate over the remaining fields of the entity (not covered by class config)
//         const isOutgoing = true;
//         for (const fkProperty in entityFieldsWithEdges) {

//             if (!coveredFields[fkProperty + '_' + isOutgoing]) {
//                 const edges = entityFieldsWithEdges[fkProperty].outgoing;
//                 promises.push(this.processField(edges, parseInt(fkProperty, 10), isOutgoing));
//             }
//             if (!coveredFields[fkProperty + '_' + !isOutgoing]) {
//                 const edges = entityFieldsWithEdges[fkProperty].incoming;
//                 promises.push(this.processField(edges, parseInt(fkProperty, 10), !isOutgoing));
//             }
//         }
//         const res = await Promise.all(promises)
//         this.fullTextArr = flatten(res);
//         let classLabel = await this.getClassLabel(this.classId)
//         classLabel = classLabel ?? `[${this.entity.fkClass}]`;
//         this.entityRich.fullText = `${classLabel} – ${this.fullTextArr.join(', ')}`;
//         this.entityRich.classLabel = classLabel
//     }



//     /**
//      *
//      * @param edges
//      * @param fkProperty
//      * @param isOutgoing
//      * @param addToLabel
//      * @param nrOfStatementsInLabel
//      */
//     private async processField(edges: Edge[], fkProperty: number, isOutgoing: boolean): Promise<string[]> {

//         this.addEdgesToEntity(edges, fkProperty, isOutgoing);

//         // convert edges to strings and add them to this.fullTextArr
//         // this.fullTextArr.push(...await this.createFullTextArray(edges, fkProperty, isOutgoing));
//         const strings = await this.createFullTextArray(edges, fkProperty, isOutgoing)
//         return strings

//     }

//     /**
//      * Adds the edges of given field (property + direction) to resulting entity
//      * @param edges
//      * @param fkProperty
//      * @param isOutgoing
//      */
//     private addEdgesToEntity(edges: Edge[], fkProperty: number, isOutgoing: boolean) {
//         // are there any edges?
//         if (edges?.length) {

//             // create the field with edges
//             const fieldWithEdges: FieldWithEdges = {
//                 edges,
//                 fkProperty: fkProperty,
//                 isOutgoing: isOutgoing
//             };

//             // add field to resulting fields
//             this.entityRich.fields.push(fieldWithEdges);
//         }
//     }

//     /**
//     * Creates strings array for given field-edges (edges must be of same field, i.e. property + direction)
//     *
//     * example result: ["fieldLabel:", "edgeTargetLabel1", "edgeTargetLabel2", ...]
//     *
//     * @param edges Array of edges
//     * @param config `
//     *      fkProject: project
//     *      fkClass: class of the entity
//     *      fkProperty: property of edges/field (needed to get fieldLabel)
//     *      isOutgoing: direction of edges/field (needed to get fieldLabel)
//     *      addFieldLabel: if true, fieldLabel is added as first element of array
//     *      singleQuotesForEdgeLabels: if true creates "'edgeTargetLabel1'" else "edgeTargetLabel1"
//     *      maxLabelNr max number of edgeTargetLabels
//     * `
//     */
//     private async createFullTextArray(
//         edges: Edge[],
//         fkProperty: number,
//         isOutgoing: boolean
//     ) {
//         const result: string[] = [];

//         const fkProject = this.entity.fkProject, fkClass = this.entity.fkClass, maxLabelNr = 10;

//         const fieldId: FieldId = { fkProject, fkClass, fkProperty, isOutgoing }

//         // are there any edges?
//         if (edges?.length) {

//             // stop iteration at smaller number of limit or length of edges
//             const stop = Math.min(maxLabelNr, edges.length);

//             for (let i = 0; i < stop; i++) {
//                 const e = edges[i];
//                 let fieldLabel = '';

//                 if (i === 0) {
//                     // create fieldLabel (the label for property in correct direction)
//                     let l = await this.getFieldLabel(fieldId)
//                     l = l ?? `[c${fkClass},p${fkProperty},${isOutgoing ? 'out' : 'in'},]`
//                     fieldLabel = (`${l}: `);
//                 }

//                 let targetLabel;
//                 if (e.targetIsEntity) {
//                     targetLabel = await this.getEpLabel({ pkEntity: e.fkTarget, fkProject: fkProject })
//                     targetLabel = targetLabel ?? `[e${e.fkTarget}]`
//                     const targetEntityId: EntityId = { fkProject, pkEntity: e.fkTarget }
//                     const fkTargetClass = (await this.getEntity(targetEntityId))?.fkClass

//                     const targetClassLabel = (fkTargetClass ?
//                         await this.getClassLabel({ fkProject, pkClass: fkTargetClass }) :
//                         false) ?? `[c${fkTargetClass}]`;

//                     targetLabel = `${targetClassLabel} – ${targetLabel}`


//                 } else {
//                     targetLabel = e.targetLabel;
//                 }

//                 result.push(`${fieldLabel}'${targetLabel}'`);

//             }
//         }
//         return result;
//     }


//     /**
//     * Creates strings array for given field-edges (edges must be of same field, i.e. property + direction)
//     *
//     * example result: ["fieldLabel:", "edgeTargetLabel1", "edgeTargetLabel2", ...]
//     *
//     * @param edges Array of edges
//     * @param config `
//     *      fkProject: project
//     *      fkProperty: property of edges/field (needed to get fieldLabel)
//     *      isOutgoing: direction of edges/field (needed to get fieldLabel)
//     *      maxLabelNr max number of edgeTargetLabels
//     * `
//     */
//     private async createEntityLabelArray(
//         edges: Edge[],
//         maxLabelNr = 1
//     ) {
//         const result: {
//             strings: string[],
//             // the id of entities providing the label
//             labelProviders: number[]
//         } = {
//             strings: [],
//             labelProviders: []
//         }

//         // are there any edges?
//         if (edges?.length) {

//             // stop iteration at smaller number of limit or length of edges
//             const stop = Math.min(maxLabelNr, edges.length);

//             for (let i = 0; i < stop; i++) {
//                 const e = edges[i];

//                 let string;
//                 if (e.targetIsEntity) {
//                     string = await this.getEpLabel({ pkEntity: e.fkTarget, fkProject: this.entity.fkProject })
//                     result.labelProviders.push(e.fkTarget);
//                 } else {
//                     string = e.targetLabel;
//                 }

//                 if (string) result.strings.push(string);

//             }
//         }
//         return result;
//     }


//     /************************************************************************
//      * Methods for registering values of this in other indexes    
//     ************************************************************************/


//     // /**
//     //    * adds cached dependencies (providers) of this entity
//     //    * to dependency index of main.
//     //    */
//     // async registerDependencies() {
//     //     /**
//     //      * update main dependency indexes
//     //      */
//     //     await this.receivesFrom.epLabels.forEachKey(async (key) => {

//     //         // await this.main.dep.entityEntityLabelDep.addProvider(this.entityId, key)
//     //     })

//     //     return
//     // }


//     /**
//      * 1. update the result index `EntityPreviewIdx`
//      *    - add the new EP to `EntityPreviewIdx`
//      *      - compares with previous value (in `EntityPreviewIdx`) and register EP update requests, based on (old) perovider indexes (before they are updated) for changed values:
//      *         - if label changed -> add pending update request for EP's depending on that label
//      *         - if xy changed -> add pending update request for EP's depending on xy
//      * 2. update perovider indexes related to the EP
//      *    - entityLabelDependency
//      *      - remove all perovider relations for that EP in `EntityLabelDepIdx`(syncing both directions)
//      *      - add all perovider relations from new EP's cache in `EntityLabelDepIdx`(syncing both directions)
//      *    - classLabelDependency
//      *      - remove all perovider relations for that EP in `ClassLabelDepIdx`(syncing both directions)
//      *      - add all perovider relations from new EP's cache in `ClassLabelDepIdx`(syncing both directions)
//      */
//     async registerPreview() {

//         /** 
//          * update the result index `EntityPreviewIdx`:
//          * this adds update requests if needed
//          */
//         await this.main.agg.entityPreview.add(this.entityId, this.entityRich)


//         /**
//         * cleanup dependency indexes:
//         * remove providers from last cycle that are not needed anymore
//         */
//         await this.previousProviders.removeProvidersFromIndexes()

//         return

//     }



//     private async getEpLabel(entityId: EntityId): Promise<string | undefined> {
//         this.previousProviders.entityLabels.removeProviderFromCache(entityId)
//         const adding = this.main.dep.entityLabelEntityLabelDep.addProvider(this.entityId, entityId)
//         const getting = this.main.agg.entityPreview.getFromIdx(entityId);
//         const [ep] = await Promise.all([getting, adding])
//         return ep?.label
//     }

//     private async getFieldsConfig(classId: ClassId): Promise<FieldsConfig | undefined> {
//         // TODO: const adding = this.receivesFrom.fieldsConfig.addToIdx(classId, true)
//         const adding = Promise.resolve()
//         const getting = this.main.prim.fieldsConfig.getClassConfig(classId)
//         const [result] = await Promise.all([getting, adding])
//         return result
//     }

//     private async getEntityLabelConfig(classId: ClassId): Promise<EntityLabelConfig | undefined> {
//         // TODO: const adding = this.receivesFrom.entityLabelConfig.addToIdx(classId, true)
//         const adding = Promise.resolve()
//         const getting = this.main.prim.entityLabelConfig.getEntityLabelConfig(classId)
//         const [result] = await Promise.all([getting, adding])
//         return result
//     }

//     private async getEdges(entityId: EntityId): Promise<EdgesPerEntity | undefined> {
//         // TODO: const adding = this.receivesFrom.edges.addToIdx(entityId, true)
//         const adding = Promise.resolve()
//         const getting = this.main.prim.edge.getFromIdx(entityId)
//         const [result] = await Promise.all([getting, adding])
//         return result
//     }

//     private async getClassLabel(classId: ClassId): Promise<string | undefined> {

//         // // TEMP
//         // if (this.entityId.pkEntity === 22 && classId.pkClass === 365) {
//         //     const cycle = this.main.updateService.cycleNr;
//         //     const previous = this.previousProviders.classLabels.providerMap;
//         //     console.log('before requesting class label', JSON.stringify({ cycle, previous }))
//         // }

//         this.previousProviders.classLabels.removeProviderFromCache(classId)

//         const adding = this.main.dep.entityClassLabelDep.addProvider(this.entityId, classId)
//         const getting = this.main.prim.classLabel.getFromIdx(classId)
//         const [result] = await Promise.all([getting, adding])


//         // // TEMP
//         // if (this.entityId.pkEntity === 22 && classId.pkClass === 365) {
//         //     const cycle = this.main.updateService.cycleNr;
//         //     const previous = this.previousProviders.classLabels.providerMap;
//         //     console.log('after requesting class label', JSON.stringify({ cycle, previous }))
//         // }
//         return result
//     }

//     private async getFieldLabel(fieldId: FieldId): Promise<string | undefined> {
//         // TODO: const adding = this.receivesFrom.fieldLabels.addToIdx(fieldId, true)
//         const adding = Promise.resolve()
//         const getting = this.main.prim.fieldLabel.getFromIdx(fieldId)
//         const [result] = await Promise.all([getting, adding])
//         return result
//     }

//     private async getEntity(entityId: EntityId): Promise<Entity | undefined> {
//         // TODO: const adding = this.receivesFrom.entity.addToIdx(entityId, true)
//         const adding = Promise.resolve()
//         const getting = this.main.prim.entity.getEntity(entityId);
//         const [result] = await Promise.all([getting, adding])
//         return result
//     }


// }