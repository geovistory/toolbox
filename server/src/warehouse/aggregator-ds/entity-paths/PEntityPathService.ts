// import {forwardRef, Inject, Injectable} from 'injection-js';
// import {PoolClient} from 'pg';
// import {AggregatedDataService2} from '../../base/classes/AggregatedDataService2';
// import {AggregatorSqlBuilder, CustomValSql} from '../../base/classes/AggregatorSqlBuilder';
// import {DependencyIndex} from '../../base/classes/DependencyIndex';
// import {RClassId} from '../../primary-ds/DfhClassHasTypePropertyService';
// import {EntityFields} from '../../primary-ds/edge/edge.commons';
// import {PEdgeService} from '../../primary-ds/edge/PEdgeService';
// import {PEntity, PEntityId, pEntityKeyDefs, PEntityService} from '../../primary-ds/entity/PEntityService';
// import {EntityPathConfigService, EntityPathConfigVal} from '../../primary-ds/EntityPathConfigService';
// import {Warehouse} from '../../Warehouse';
// interface EntityPathEntity {
//     pkClass: number,
//     pkEntity: number,
//     outgoing: EntityPathProperty[]
//     incoming: EntityPathProperty[]
//     // label: 'Zitrusfrüchte'

// }

// interface EntityPathProperty {
//     pkProperty: number,
//     entities: []
//     //   label: 'has broader term',
// }

// interface EntityPathVal {
//     [pathName: string]: EntityPathEntity
// }

// @Injectable()
// export class PEntityPathService extends AggregatedDataService2<PEntityId, EntityPathVal>{

//     depPEntity: DependencyIndex<PEntityId, EntityPathVal, PEntityId, PEntity>
//     depEntityPathConfig: DependencyIndex<PEntityId, EntityPathVal, RClassId, EntityPathConfigVal>
//     // depPEntityLabel: DependencyIndex<PEntityId, EntityPathVal, PEntityId, EntityPathVal>
//     depPEdge: DependencyIndex<PEntityId, EntityPathVal, PEntityId, EntityFields>

//     batchSize = 100000;
//     constructor(
//         @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
//         @Inject(forwardRef(() => EntityPathConfigService)) entityPathConfig: EntityPathConfigService,
//         @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
//         @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService,
//     ) {
//         super(
//             wh,
//             pEntityKeyDefs
//         )
//         this.registerCreatorDS({dataService: pEntity})
//         this.depEntityPathConfig = this.addDepencency(entityPathConfig);
//         this.depPEntity = this.addDepencency(pEntity);
//         // this.depPEntityLabel = this.addDepencency(this);
//         this.depPEdge = this.addDepencency(pEdge);
//     }
//     getDependencies() {
//         return this
//     };


//     async aggregateBatch(client: PoolClient, client2: PoolClient, limit: number, offset: number, currentTimestamp: string): Promise<number> {
//         const builder = new AggregatorSqlBuilder(this, client, currentTimestamp, limit, offset)

//         const pentity = await builder.joinProviderThroughDepIdx({
//             leftTable: builder.batchTmpTable.tableDef,
//             joinWithDepIdx: this.depPEntity,
//             joinOnKeys: {
//                 pkEntity: {leftCol: 'pkEntity'},
//                 fkProject: {leftCol: 'fkProject'}
//             },
//             conditionTrueIf: {
//                 providerKey: {pkEntity: 'IS NOT NULL'}
//             },
//             createCustomObject: (() => `jsonb_build_object('fkClass', (t2.val->>'fkClass')::int)`) as CustomValSql<{fkClass: number}>,
//         })
//         const pEdges = await builder.joinProviderThroughDepIdx({
//             leftTable: pentity.aggregation.tableDef,
//             joinWithDepIdx: this.depPEdge,
//             joinWhereLeftTableCondition: '= true',
//             joinOnKeys: {
//                 pkEntity: {leftCol: 'pkEntity'},
//                 fkProject: {leftCol: 'fkProject'}
//             },
//             conditionTrueIf: {
//                 or: [
//                     {providerVal: {outgoing: 'is not {}', }},
//                     {providerVal: {incoming: 'is not {}', }},
//                 ]
//             },
//             createCustomObject: ((provider) => `t1.custom`) as CustomValSql<{fkClass: number}>,
//         })

//         const entityPathConfig = await builder.joinProviderThroughDepIdx({
//             leftTable: pentity.aggregation.tableDef,
//             joinWithDepIdx: this.depEntityPathConfig,
//             joinWhereLeftTableCondition: '= true',
//             joinOnKeys: {
//                 pkClass: {
//                     leftVal: {name: 'fkClass', type: 'int'}
//                 }
//             },
//             conditionTrueIf: {
//                 providerKey: {pkClass: 'IS NOT NULL'}
//             },
//             createCustomObject: ((provider) => `jsonb_build_object(
//                 'fkClass', t1.val-à>>'fkClass')::int,
//                 'pathConfigs', t2.val->'pathConfigs'

//             )`) as CustomValSql<{fkClass: number}>,
//         })


//         await builder.printQueries()
//         const count = builder.executeQueries()

//         return count
//     }


// }

