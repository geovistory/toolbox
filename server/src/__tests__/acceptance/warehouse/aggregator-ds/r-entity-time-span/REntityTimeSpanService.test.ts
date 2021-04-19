/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {equals} from 'ramda';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
import {REntityTimeSpan, REntityTimeSpanService} from '../../../../../warehouse/aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {REdgeService} from '../../../../../warehouse/primary-ds/edge/REdgeService';
import {REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createInfTimePrimitive} from '../../../../helpers/atomic/inf-time-primitive.helper';
import {createProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {InfTimePrimitiveMock} from '../../../../helpers/data/gvDB/InfTimePrimitiveMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreviewUntil} from '../../../../helpers/warehouse-helpers';
import {WarEntityPreviewTimeSpan, CalendarType, Granularity} from '../../../../../models';
const rEntityTimeSpanStub: WarehouseStubs = {
    primaryDataServices: [
        REntityService,
        REdgeService
    ],
    aggDataServices: [
        REntityTimeSpanService,
        EntityPreviewService
    ]
}
/**
 * Testing whole stack from postgres to warehouse
 */
describe('REntityTimeSpanService', function () {
    let wh: Warehouse;
    let edgeService: REdgeService;
    let s: REntityTimeSpanService

    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(rEntityTimeSpanStub)
        wh = injector.get(Warehouse)
        s = injector.get(REntityTimeSpanService)
        edgeService = injector.get(REdgeService)

    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create edges with time primitives', async () => {
        const {shipVoyage} = await createMock();
        await searchUntilSatisfy({
            notifier$: edgeService.afterChange$,
            getFn: () => edgeService.index.getFromIdx({
                pkEntity: shipVoyage.pk_entity ?? -1,
            }),
            compare: (val) => !!val?.outgoing?.[71]?.length
        })
    })


    it('should create timespanval of time primitive', async () => {
        const {shipVoyage} = await createMock();
        const expectedTimeSpan: WarEntityPreviewTimeSpan = {
            "p81": {
                "calendar": CalendarType.gregorian,
                "duration": Granularity['1 day'],
                "julianDay": 2362729
            },
            "p82": {
                "calendar": CalendarType.gregorian,
                "duration": Granularity['1 day'],
                "julianDay": 2362730
            },
            "p81a": {
                "calendar": CalendarType.gregorian,
                "duration": Granularity['1 day'],
                "julianDay": 2362731
            },
            "p81b": {
                "calendar": CalendarType.gregorian,
                "duration": Granularity['1 day'],
                "julianDay": 2362732
            },
            "p82a": {
                "calendar": CalendarType.julian,
                "duration": Granularity['1 day'],
                "julianDay": 2362733
            },
            "p82b": {
                "calendar": CalendarType.julian,
                "duration": Granularity['1 day'],
                "julianDay": 2362734
            }
        }
        const expectedFirstSec = '204139785600';
        const expectedLastSec = '204140303999';

        const result = await waitForEntityPreviewUntil(wh, (entPreview) => {
            return entPreview.pk_entity === shipVoyage.pk_entity
                && entPreview.fk_project === null
                && equals(entPreview.time_span, expectedTimeSpan)
                && entPreview.first_second === expectedFirstSec
                && entPreview.last_second === expectedLastSec
        })

        expect(result.time_span).to.deepEqual(expectedTimeSpan);
    })

    it('should create empty time span object {}', async () => {
        // - Langage and Project
        await createProjectAndModelMock();

        // - shipVoyage
        const shipVoyage = await createInfTemporalEntity(InfTemporalEntityMock.SHIP_VOYAGE);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_SHIP_VOYAGE);
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx({pkEntity: shipVoyage.pk_entity ?? -1}),
            compare: (val) => {
                return equals(val?.timeSpan, {})
            }
        })
    })
})

// create the mock data:
async function createMock() {
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




async function createProjectAndModelMock() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);

    // - Class: Ship Voyage, TimePrimitive
    await createDfhApiClass(DfhApiClassMock.EN_523_SHIP_VOYAGE);
    await createDfhApiClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE);

    // P81 ongoing throughout
    await createDfhApiProperty(DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT);
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
