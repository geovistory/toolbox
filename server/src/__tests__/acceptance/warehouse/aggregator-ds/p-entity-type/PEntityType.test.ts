/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {setupCleanAndStartWarehouse, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';
import {retryWhen} from 'rxjs/operators';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {createProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityType', function () {
    let wh: Warehouse;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()

    })

    it('should create fk_type of geographical place', async () => {


        const {naming, project, appellation} = await createMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })


})
// create the mock data:
async function createMock() {
    // - Langage and Project
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);

    // - Class: Geo Place, Geo Place type
    await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE);
    await createDfhApiClass(DfhApiClassMock.EN_364_GEO_PLACE_TYPE);
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);

    // - Property: has geo. place type
    await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);

    // - peIt (Geo Place (Madrid))
    const madrid = await createInfPersistentItem(InfPersistentItemMock.GEO_PLACE_MADRID);

    // - stmt (has geo. place type, (Madrid has type 'City'))

    // - peIt (Geo Place Type X)
    const cityType = await createInfPersistentItem(InfPersistentItemMock.GEO_PLACE_TYPE_CITY);

    // - appe ('City)
    await createInfAppellation(InfAppellationMock.CITY)

    // - teEn Y (Naming of peIt X = 'City')
    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_CITY);

    // - stmt (Y has spelling appe 'City')

    // - stmt (Y is Naming of Geo Place Type X)


    const naming = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1);

    const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE);
    return {naming, project, appellation};
}
