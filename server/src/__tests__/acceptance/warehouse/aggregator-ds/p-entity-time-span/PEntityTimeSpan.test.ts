/* eslint-disable @typescript-eslint/camelcase */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {equals} from 'ramda';
import {PEntityTimeSpan, PEntityTimeSpanService} from '../../../../../warehouse/aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {PEdgeService} from '../../../../../warehouse/primary-ds/edge/PEdgeService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createInfTimePrimitive} from '../../../../helpers/atomic/inf-time-primitive.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {getWarEntityPreview} from '../../../../helpers/atomic/war-entity_preview.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {InfTimePrimitiveMock} from '../../../../helpers/data/gvDB/InfTimePrimitiveMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, wait, waitForEntityPreview, waitForEntityPreviewUntil} from '../../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
const pEntityTimeSpanStub: WarehouseStubs = {
    primaryDataServices: [
        PEntityService,
        PEdgeService
    ],
    aggDataServices: [
        PEntityTimeSpanService,
        EntityPreviewService
    ]
}
/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityTimeSpanService', function () {
    let wh: Warehouse;
    let edgeService: PEdgeService;
    let s: PEntityTimeSpanService

    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(pEntityTimeSpanStub)
        wh = injector.get(Warehouse)
        s = injector.get(PEntityTimeSpanService)
        edgeService = injector.get(PEdgeService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })
    it('should create edges with time primitives', async () => {
        const {shipVoyage, project} = await PEntityTimeSpanMock.createMock();

        await searchUntilSatisfy({
            notifier$: edgeService.afterChange$,
            getFn: () => edgeService.index.getFromIdx({
                fkProject: project.pk_entity ?? -1,
                pkEntity: shipVoyage.pk_entity ?? -1,
            }),
            compare: (val) => !!val?.outgoing?.[71]?.length
        })

    })


    it('should create timespanval of time primitive', async () => {
        const {shipVoyage, project} = await PEntityTimeSpanMock.createMock();

        const expectedTimeSpan: PEntityTimeSpan = {
            "p81": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2362729
            },
            "p82": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2362730
            },
            "p81a": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2362731
            },
            "p81b": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2362732
            },
            "p82a": {
                "calendar": "julian",
                "duration": "1 day",
                "julianDay": 2362733
            },
            "p82b": {
                "calendar": "julian",
                "duration": "1 day",
                "julianDay": 2362734
            }
        }
        const expectedFirstSec = '204139785600';
        const expectedLastSec = '204140303999';

        const result = await waitForEntityPreviewUntil(wh, (entPreview) => {
            return entPreview.pk_entity === shipVoyage.pk_entity
                && entPreview.fk_project === project.pk_entity
                && equals(entPreview.time_span, expectedTimeSpan)
                && entPreview.first_second === expectedFirstSec
                && entPreview.last_second === expectedLastSec
        })

        expect(result.time_span).to.deepEqual(expectedTimeSpan);
    })

    it('should create empty (null) time values', async () => {
        // - Langage and Project
        const project = await PEntityTimeSpanMock.createProjectAndModelMock();

        // - shipVoyage
        const shipVoyage = await createInfTemporalEntity(InfTemporalEntityMock.SHIP_VOYAGE);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_SHIP_VOYAGE);
        await wait(800)
        const result = await getWarEntityPreview(shipVoyage.pk_entity ?? -1, project.pk_entity ?? -1)

        expect(result?.[0].time_span).to.be.null()
        expect(result?.[0].first_second).to.be.null()
        expect(result?.[0].last_second).to.be.null()
    })


    it('should delete entity time span from index when entity is removed from project', async () => {
        await PEntityTimeSpanMock.createProjectAndModelMock();
        const shipVoyage = await createInfTemporalEntity(InfTemporalEntityMock.SHIP_VOYAGE);
        const prel = await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_SHIP_VOYAGE);

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: shipVoyage.pk_entity}},
            {fk_project: {eq: prel.fk_project}}
        ])
        expect(result)
        // remove person from the project
        await updateProInfoProjRel(prel.pk_entity ?? -1, {is_in_project: false})
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdxWithTmsps({pkEntity: shipVoyage.pk_entity ?? -1, fkProject: prel.fk_project ?? -1}),
            compare: (item) => !!item?.deleted
        })

    })

})
export namespace PEntityTimeSpanMock {

    // create the mock data:
    export async function createMock() {
        // - Langage and Project
        const project = await createProjectAndModelMock();

        // - shipVoyage
        const shipVoyage = await createInfTemporalEntity(InfTemporalEntityMock.SHIP_VOYAGE);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_SHIP_VOYAGE);

        // TimePrimitive 1
        await createInfTimePrimitive(InfTimePrimitiveMock.TP_1);
        // Stmt to TimePrimitive 1
        await createInfStatement(InfStatementMock.SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1);
        // Project rel for stmt (With calender info !)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_ONGOING_THROUGHOUT_TP_1)

        // TimePrimitive 2
        await createInfTimePrimitive(InfTimePrimitiveMock.TP_2);
        // Stmt to TimePrimitive 2
        await createInfStatement(InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2);
        // Project rel for stmt (With calender info !)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2)

        // TimePrimitive 3
        await createInfTimePrimitive(InfTimePrimitiveMock.TP_3);
        // Stmt to TimePrimitive 3
        await createInfStatement(InfStatementMock.SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3);
        // Project rel for stmt (With calender info !)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_END_OF_THE_BEGIN_TP_3)

        // TimePrimitive 4
        await createInfTimePrimitive(InfTimePrimitiveMock.TP_4);
        // Stmt to TimePrimitive 4
        await createInfStatement(InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4);
        // Project rel for stmt (With calender info !)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4)

        // TimePrimitive 5
        await createInfTimePrimitive(InfTimePrimitiveMock.TP_5);
        // Stmt to TimePrimitive 5
        await createInfStatement(InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5);
        // Project rel for stmt (With calender info !)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5)

        // TimePrimitive 6
        await createInfTimePrimitive(InfTimePrimitiveMock.TP_6);
        // Stmt to TimePrimitive 6
        await createInfStatement(InfStatementMock.SHIP_VOYAGE_END_OF_THE_END_TP_6);
        // Project rel for stmt (With calender info !)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_END_OF_THE_END_TP_6)

        return {shipVoyage, project};
    }




    export async function createProjectAndModelMock() {
        await createInfLanguage(InfLanguageMock.GERMAN);
        const project = await createProProject(ProProjectMock.PROJECT_1);

        // - Class: Ship Voyage, TimePrimitive
        await createDfhApiClass(DfhApiClassMock.EN_523_SHIP_VOYAGE);
        await createDfhApiClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE);

        // P81 ongoing throughout
        await createDfhApiProperty(DfhApiPropertyMock.EN_71_ONGOING_THOUGHOUT);
        // P82 at some time within
        await createDfhApiProperty(DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN);
        // P81a end of the begin
        await createDfhApiProperty(DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN);
        // P81b begin of the end
        await createDfhApiProperty(DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END);
        // P82a begin of the begin
        await createDfhApiProperty(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN);
        // P82b end of the end
        await createDfhApiProperty(DfhApiPropertyMock.EN_153_END_OF_THE_END);
        return project;
    }
}

/**

select *
FROM
information.time_primitive t1,
projects.info_proj_rel t2
WHERE t1.pk_entity=t2.fk_entity
LIMIT 10;


select t2.calendar
FROM
information."statement" t0,
information.time_primitive t1,
projects.info_proj_rel t2
WHERE
t0.fk_object_info = t1.pk_entity
AND t0.pk_entity=t2.fk_entity
LIMIT 10

 */
