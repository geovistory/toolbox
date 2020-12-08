/* eslint-disable @typescript-eslint/camelcase */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {PEntityTypeService} from '../../../../../warehouse/aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage, createLanguages} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {addInfosToProject, createProInfoProjRel, removeEntityFromProject, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
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
import {createInstancesForCityType, createModelMockForCityType, createProject1, createProject2, createProject3} from '../../../../helpers/graphs/cityType.helper';
import {createInstancesForMadrid, createModelMockForMadrid} from '../../../../helpers/graphs/madrid.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview, waitForEntityPreviewUntil, wait} from '../../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {PEntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
import {PEdgeService} from '../../../../../warehouse/primary-ds/edge/PEdgeService';
import {DfhClassHasTypePropertyService} from '../../../../../warehouse/primary-ds/DfhClassHasTypePropertyService';
import {REntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {DfhOutgoingPropertyService} from '../../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {ProEntityLabelConfigService} from '../../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {IdentifyingPropertyService} from '../../../../../warehouse/aggregator-ds/identifying-property/IdentifyingPropertyService';
import {REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {REdgeService} from '../../../../../warehouse/primary-ds/edge/REdgeService';
const pEntityTypeServiceStub: WarehouseStubs = {
    primaryDataServices: [
        DfhOutgoingPropertyService,
        ProEntityLabelConfigService,
        PEntityService,
        PEdgeService,
        REntityService,
        REdgeService,
        DfhClassHasTypePropertyService
    ],
    aggDataServices: [
        IdentifyingPropertyService,
        PEntityLabelService,
        REntityLabelService,
        PEntityTypeService
    ]
}

/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityTypeService', function () {
    let wh: Warehouse;
    let s: PEntityTypeService
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(pEntityTypeServiceStub)
        wh = injector.get(Warehouse)
        s = injector.get(PEntityTypeService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })
    it('should create fk_type of geographical place', async () => {
        const {madrid, project, cityTypeProjRel} = await createMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {fk_type: {eq: cityTypeProjRel.fk_entity}},
        ])
        expect(result);
    })

    it('should update fk_type of geographical place', async () => {
        const {madrid, project, cityTypeProjRel, cityTypeAppe} = await createMock();

        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {fk_type: {eq: cityTypeProjRel.fk_entity}},
            {type_label: {eq: cityTypeAppe.string}},
        ])
        expect(result.type_label).to.equal(cityTypeAppe.string);

        await updateProInfoProjRel(
            ProInfoProjRelMock.PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE.pk_entity ?? -1,
            {is_in_project: false}
        )

        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {fk_type: {eq: null}},
            {type_label: {eq: null}},
        ])
        expect(result.type_label).to.not.equal(cityTypeAppe.string);
    })

    it('should take repo-label of type, if type is not in project', async () => {
        await createLanguages()
        await createModelMockForCityType();

        const {project1} = await createProject1();

        const {project2} = await createProject2();

        const {project3} = await createProject3();

        // create type instances
        const {
            cityType,
            appeCity,
            appeStadt,
            naming1,
            naming1RefersTo,
            naming1IsAppeOf,
            naming2,
            naming2RefersTo,
            naming2IsAppeOf
        } = await createInstancesForCityType();

        // add naming 1 to project1
        await addInfosToProject(project1.pk_entity, [
            cityType.pk_entity,
            naming1.pk_entity,
            naming1RefersTo.pk_entity,
            naming1IsAppeOf.pk_entity])

        // add naming 2 to project2
        await addInfosToProject(project2.pk_entity, [
            cityType.pk_entity,
            naming2.pk_entity,
            naming2RefersTo.pk_entity,
            naming2IsAppeOf.pk_entity])

        // add naming 2 to project3
        await addInfosToProject(project3.pk_entity, [
            cityType.pk_entity,
            naming2.pk_entity,
            naming2RefersTo.pk_entity,
            naming2IsAppeOf.pk_entity])

        await createModelMockForMadrid()
        const {madrid, madridHasType} = await createInstancesForMadrid()



        await addInfosToProject(project1.pk_entity, [
            madrid.pk_entity,
            madridHasType.pk_entity])

        // since naming 2 is more often used,
        // -> the repo label should be 'Stadt'
        await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === cityType.pk_entity
                && item.fk_project === null
                && item.entity_label === appeStadt.string
        })

        // cityType should be called 'City' in project 1 and 'Stadt' in repo
        await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === madrid.pk_entity
                && item.fk_project === project1.pk_entity
                && item.type_label === appeCity.string // <- !! here is the tested type label
        })


        // remove the cityType (peIt) from project1
        await removeEntityFromProject(project1.pk_entity, cityType.pk_entity)

        // madrid.entiy_type should be called 'City' in project 1 and 'Stadt' in repo
        const madridTypeLabel2 = await waitForEntityPreviewUntil(wh, (item) => {
            // console.log(item)
            return item.pk_entity === madrid.pk_entity
                && item.fk_project === project1.pk_entity
                && item.type_label === appeStadt.string // <- !! here is the tested type label
        })
        expect(madridTypeLabel2.type_label).to.equal(appeStadt.string);
    })

    it('should delete entity type from index when entity is removed from project', async () => {
        const {madrid, madridProjRel, project, cityTypeAppe} = await createMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: madrid.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {type_label: {eq: cityTypeAppe.string}},
        ])
        expect(result.type_label).to.equal(cityTypeAppe.string);
        // remove madrid from the project
        await updateProInfoProjRel(madridProjRel.pk_entity ?? -1, {is_in_project: false})
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdxWithTmsps({pkEntity: madrid.pk_entity ?? -1, fkProject: project.pk_entity ?? -1}),
            compare: (val) => !!val?.deleted

        })
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
    const madridProjRel = await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_MADRID);

    // - peIt (Geo Place Type X)
    await createInfPersistentItem(InfPersistentItemMock.GEO_PLACE_TYPE_CITY);
    const cityTypeProjRel = await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_CITY_TYPE);

    // - stmt (has geo. place type, (Madrid has type 'City'))
    await createInfStatement(InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_MADRID_HAS_GEO_PLACE_CITY_TYPE);

    // - appe ('City)
    const cityTypeAppe = await createInfAppellation(InfAppellationMock.CITY)

    // - teEn Y (Naming of peIt X = 'City')
    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_CITY);

    // - stmt (Y refers to Name appe 'City')
    await createInfStatement(InfStatementMock.NAMING_CITY_TO_APPE_CITY);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAMING_CITY_TO_APPE_CITY);

    // - stmt (Y is Naming of Geo Place Type X)
    await createInfStatement(InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAMING_CITY_TO_GEO_PLACE_TYPE);

    return {madrid, madridProjRel, cityTypeProjRel, project, cityTypeAppe};
}
