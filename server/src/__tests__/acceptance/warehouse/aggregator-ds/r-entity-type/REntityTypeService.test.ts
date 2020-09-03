/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('REntityTypeService', function () {
    let wh: Warehouse;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
    })
    afterEach(async function () {await wh.stop()})

    // TODO: Test that the entity type most often used by projects is used
    // for the repo variant (should be the case according to order by of edges)


    it('should create fk_type of geographical place', async () => {
        const {madrid, cityTypeAppe} = await createMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {project: {eq: 0}},
            {type_label: {eq: cityTypeAppe.string}},
        ])
        expect(result.type_label).to.equal(cityTypeAppe.string);
    })

    it('should update fk_type of geographical place', async () => {
        const {madrid, cityTypeAppe} = await createMock();

        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {project: {eq: 0}},
            {type_label: {eq: cityTypeAppe.string}},
        ])
        expect(result.type_label).to.equal(cityTypeAppe.string);

        await updateProInfoProjRel(
            ProInfoProjRelMock.PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE.pk_entity ?? -1,
            {is_in_project: false}
        )

        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {project: {eq: 0}},
        ])
        expect(result.type_label).to.not.equal(cityTypeAppe.string);
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
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_MADRID);

    // - peIt (Geo Place Type X)
    await createInfPersistentItem(InfPersistentItemMock.GEO_PLACE_TYPE_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_CITY_TYPE);

    // - stmt (has geo. place type, (Madrid has type 'City'))
    await createInfStatement(InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE);

    // - appe ('City)
    const cityTypeAppe = await createInfAppellation(InfAppellationMock.CITY)

    // - teEn Y (Naming of peIt X = 'City')
    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_CITY);

    // - stmt (Y refers to Name appe 'City')
    await createInfStatement(InfStatementMock.NAMING_CITY_TO_APPE_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAMING_CITY_TO_APPE_CITY);

    // - stmt (Y is Naming of Geo Place Type X)
    await createInfStatement(InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAMING_CITY_TO_GEO_PLACE_TYPE);

    return {madrid, project, cityTypeAppe};
}
