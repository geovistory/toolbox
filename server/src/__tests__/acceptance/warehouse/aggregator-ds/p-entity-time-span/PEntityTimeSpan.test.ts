/* eslint-disable @typescript-eslint/camelcase */
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';
import {expect} from '@loopback/testlab';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityTimeSpan', function () {
    let wh: Warehouse;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
    })

    it('should create fk_type of geographical place', async () => {
        const {shipVoyage, project} = await createMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: shipVoyage.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {time_span: {eq: {}}},
        ])
        const expected: PEntityTimeSpanVal = {
            "p81a": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2362729
            },
            "p81b": {
                "calendar": "gregorian",
                "duration": "1 day",
                "julianDay": 2362970
            }
        }
        expect(result.time_span).to.deepEqual(expected);
    })



})




// create the mock data:
async function createMock() {
    // - Langage and Project
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


    // - shipVoyage
    const shipVoyage = await createInfTemporalEntity(InfTemporalEntityMock.SHIP_VOYAGE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_SHIP_VOYAGE);

    // TimePrimitive 1
    // Stmt to TimePrimitive 1
    // Project rel for stmt (With calender info !)

    // TimePrimitive 2
    // Stmt to TimePrimitive 2
    // Project rel for stmt (With calender info !)

    // TimePrimitive 3
    // Stmt to TimePrimitive 3
    // Project rel for stmt (With calender info !)

    // TimePrimitive 4
    // Stmt to TimePrimitive 4
    // Project rel for stmt (With calender info !)

    // TimePrimitive 5
    // Stmt to TimePrimitive 5
    // Project rel for stmt (With calender info !)

    // TimePrimitive 5
    // Stmt to TimePrimitive 5
    // Project rel for stmt (With calender info !)



    return {shipVoyage, project};
}


/**
 * TODO
 * These interfaces are now in the test file because the implementation
 * does not yet exist.
 * Move the interfaces to the PEntityTimeSpanService.ts, once this file exists.
 */
type CalendarType = 'gregorian' | 'julian';
type Granularity =
    '1 century' |
    '1 decade' |
    '1 year' |
    '1 month' |
    '1 day' |
    '1 hour' |
    '1 minute' |
    '1 second';

interface PEntityTimePrimitive {
    julianDay?: number;
    duration?: Granularity;
    calendar?: CalendarType;
}

interface PEntityTimeSpanVal {
    p82?: PEntityTimePrimitive; // At some time within | outer bounds | not before – not after
    p81?: PEntityTimePrimitive; // Ongoing throughout | inner bounds | surely from – surely to
    p81a?: PEntityTimePrimitive; // end of the begin | left inner bound | surely from
    p82a?: PEntityTimePrimitive; // begin of the begin | left outer bound | not before
    p81b?: PEntityTimePrimitive; // begin of the end | right inner bound | surely to
    p82b?: PEntityTimePrimitive; // end of the end | right outer bound | not after
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
