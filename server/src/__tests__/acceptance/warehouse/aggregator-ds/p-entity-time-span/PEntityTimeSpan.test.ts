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
        const {teEn, project} = await createMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: teEn.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {time_span: {eq: {}}},
        ])
        expect(result.time_span).to.equal({

        });
    })



})

// create the mock data:
async function createMock() {
    // - Langage and Project
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);

    // - Class: Naming, TimePrimitive
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


    // - teEn Y (Naming of peIt X = 'City')
    const teEn = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_CITY);

    // TimePrimitive 1
    // Stmt to TimePrimitive 1

    // TimePrimitive 2
    // Stmt to TimePrimitive 2

    // TimePrimitive 3
    // Stmt to TimePrimitive 3

    // TimePrimitive 4
    // Stmt to TimePrimitive 4

    // TimePrimitive 5
    // Stmt to TimePrimitive 5

    // TimePrimitive 5
    // Stmt to TimePrimitive 5




    return {teEn, project};
}



