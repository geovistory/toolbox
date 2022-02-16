// /* eslint-disable @typescript-eslint/no-invalid-this */
// /* eslint-disable @typescript-eslint/camelcase */
// import {expect} from '@loopback/testlab';
// import 'reflect-metadata';
// import {PEntityPathService} from '../../../../../warehouse/aggregator-ds/entity-paths/PEntityPathService';
// import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
// import {PEdgeService} from '../../../../../warehouse/primary-ds/edge/PEdgeService';
// import {PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
// import {EntityPathConfigService} from '../../../../../warehouse/primary-ds/EntityPathConfigService';
// import {Warehouse} from '../../../../../warehouse/Warehouse';
// import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
// import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
// import {createInfResource} from '../../../../helpers/atomic/inf-resource.helper';
// import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
// import {addInfosToProject} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
// import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
// import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
// import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
// import {InfResourceMock} from '../../../../helpers/data/gvDB/InfResourceMock';
// import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
// import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
// import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
// import {setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, wait} from '../../../../helpers/warehouse-helpers';
// export const stub: WarehouseStubs = {
//     primaryDataServices: [
//         EntityPathConfigService,
//         PEntityService,
//         PEdgeService
//     ],
//     aggDataServices: [
//         PEntityPathService
//     ]
// }
// /**
//  * Testing whole stack from postgres to warehouse
//  */
// describe('PEntityPathService', function () {
//     let wh: Warehouse;
//     let s: PEntityPathService
//     let e: PEntityService
//     before(async function () {
//         // eslint-disable-next-line @typescript-eslint/no-invalid-this
//         // this.timeout(5000); // A very long environment setup.
//         const injector = await setupCleanAndStartWarehouse(stub)
//         wh = injector.get(Warehouse)
//         s = injector.get(PEntityPathService)
//         e = injector.get(PEntityService)
//     })
//     beforeEach(async () => {
//         await cleanDb()
//         await truncateWarehouseTables(wh)
//     })
//     after(async function () {
//         await stopWarehouse(wh)
//     })

//     it('should create entity path of chapter1', async () => {
//         await wh.gvPgPool.query(`select pg_notify('modified_entity_path_config', now()::text)`)

//         const {project, chapter1} = await PEntityPath.createExpressionAndPortionMock();
//         await wait(5000)

//         const pEntityChapter = await e.index.getFromIdx({fkProject: project.pk_entity, pkEntity: chapter1.pk_entity ?? -1})

//         expect(pEntityChapter).not.undefined()
//     })


// })



// export namespace PEntityPath {
//     export async function createProject() {
//         await createInfLanguage(InfLanguageMock.GERMAN);
//         const project = await createProProject(ProProjectMock.PROJECT_1);
//         await createProProject(ProProjectMock.DEFAULT_PROJECT);
//         return project
//     }
//     export async function createModel() {
//         await createDfhApiClass(DfhApiClassMock.EN_218_EXPRESSION);
//         await createDfhApiClass(DfhApiClassMock.EN_503_EXPRESSION_PORTION);
//     }

//     export async function createExpressionAndPortionMock() {
//         await createModel()
//         const project = await createProject()
//         // Expression portion
//         const chapter1 = await createInfResource(InfResourceMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1)
//         // Is part of
//         const stmtChapter1Expr = await createInfStatement(InfStatementMock.EXPR_PORTION_CHAPTER_1_IS_PART_OF_HABS_EMP_EXPR)
//         // Expression
//         const expr = await createInfResource(InfResourceMock.HABS_EMP_EXPR)

//         await addInfosToProject(project.pk_entity, [chapter1, stmtChapter1Expr, expr].map(x => x.pk_entity))
//         return {project, chapter1}
//     }




// }

