/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {REntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {DfhOutgoingPropertyService} from '../../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {REdgeService} from '../../../../../warehouse/primary-ds/edge/REdgeService';
import {REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {ProEntityLabelConfigService} from '../../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfResource} from '../../../../helpers/atomic/inf-resource.helper';
import {createProEntityLabelConfig} from '../../../../helpers/atomic/pro-entity-label-config.helper';
import {addInfosToProject, createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfResourceMock} from '../../../../helpers/data/gvDB/InfResourceMock';
import {ProEntityLabelConfigMock} from '../../../../helpers/data/gvDB/ProEntityLabelConfigMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {createInstancesForCityType} from '../../../../helpers/graphs/cityType.helper';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {createModelForCityType, createLanguages} from '../../../../helpers/meta/model.helper';
import {setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview, waitForEntityPreviewUntil, searchUntilSatisfy} from '../../../../helpers/warehouse-helpers';
import {createProject1, createProject2, createProject3} from '../../../../helpers/graphs/project.helper';
import {EntityLabel, ENTITY_LABEL_MAX_LENGTH} from '../../../../../warehouse/aggregator-ds/entity-label/entity-label.commons';

export const rEntityLabelStub: WarehouseStubs = {
    primaryDataServices: [
        DfhOutgoingPropertyService,
        ProEntityLabelConfigService,
        REntityService,
        REdgeService
    ],
    aggDataServices: [
        // IdentifyingPropertyService,
        REntityLabelService,
        EntityPreviewService
    ]
}

/**
 * Testing whole stack from postgres to warehouse
 */
describe('REntityLabelService', function () {
    let wh: Warehouse;
    let s: REntityLabelService

    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(rEntityLabelStub)
        wh = injector.get(Warehouse)
        s = injector.get(REntityLabelService)

    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create entity label of naming.', async () => {
        await createProject();
        await Promise.all([
            createNamingMock(),
            waitForEntityPreview(wh, [
                {pk_entity: {eq: InfResourceMock.NAMING_1.pk_entity}},
                {fk_project: {eq: null}},
                {entity_label: {eq: InfAppellationMock.JACK_THE_FOO.string}},
            ])
        ])
        // expect(result.entity_label).to.equal(appellation.string)
    })
    it('should create entity label of person', async () => {
        await createProject();
        const {person, appellation} = await createNamingAndPersonMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: null}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should update entity label of person after removing stmt 1111 from project', async () => {
        await createProject();
        const {person, appellation} = await createNamingAndPersonMock();
        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: null}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)

        await updateProInfoProjRel(
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1
            , {
                ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
                is_in_project: false
            })

        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: null}},
            {entity_label: {eq: '(no label)'}},
        ])
        expect(result.entity_label).to.equal('(no label)')
    })

    it('should create entity label of naming and add person.', async () => {
        await createProject();
        const {naming, appellation} = await createNamingMock();
        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: null}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)

        const person = await createPersonMock();
        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: null}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })


    // it('should create entity label of Birth – E67 (-- with identifying property)', async () => {
    //     await createProject();
    //     const {appellation} = await createNamingMock();
    //     await createPersonMock();
    //     const birth = await createBirthMock()
    //     const result = await waitForEntityPreviewUntil(wh, (item) => {
    //         return item.pk_entity === birth.pk_entity
    //             && item.fk_project === null
    //             && item.entity_label === appellation.string
    //     })
    //     expect(result)
    // })

    // it('should create entity label of Union – C9 (-- with identifying property)', async () => {
    //     await createProject();
    //     const {appellation} = await createNamingMock();
    //     await createPersonMock();
    //     const union = await createUnionMock()
    //     const result = await waitForEntityPreviewUntil(wh, (item) => {
    //         return item.pk_entity === union.pk_entity
    //             && item.fk_project === null
    //             && item.entity_label === appellation.string
    //     })
    //     expect(result)
    // })

    it('should create entity label of Union with 3 label parts', async () => {
        await createProject();
        await createNamingMock();
        await createPersonMock();
        const {union} = await createUnion2Mock()
        const result = await waitForEntityPreviewUntil(wh, (item) => {
            // console.log(item.entity_label)
            return item.pk_entity === union.pk_entity
                && item.fk_project === null
                && item.entity_label === '(no label), Jack the foo, (no label)'
        })
        expect(result)
    })

    it('should create entity label of birth infinit label', async () => {
        await createProject();
        await createNamingMock();
        await createPersonMock();
        const {birth} = await EntityLabel.createInfinitLabel()

        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx({pkEntity: birth.pk_entity ?? -1}),
            compare: (item) => {
                console.log(item?.entityLabel)
                console.log(item?.entityLabel?.length)
                return item?.entityLabel?.length === ENTITY_LABEL_MAX_LENGTH
            }
        })
    })

    /**
     * tests if the entity label of the repo variant is the label that has the highest
     * rank amongst the project variants
     */
    it('should create entity label of Geov.Place Type – according to most used is appe. of stmt', async () => {
        await createLanguages()
        await createModelForCityType();

        const {project1} = await createProject1();

        const {project2} = await createProject2();

        const {project3} = await createProject3();

        // create instances
        const {
            cityType,
            appeCity,
            appeStadt,
            namingCity1: naming1,
            namingCity1RefersTo: naming1RefersTo,
            namingCity1IsAppeOf: naming1IsAppeOf,
            namingStadt2: naming2,
            namingStadt2RefersTo: naming2RefersTo,
            namingStadt2IsAppeOf: naming2IsAppeOf
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



        // since naming 2 is more often used,
        // -> the repo label should be 'Stadt'
        await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === cityType.pk_entity
                && item.fk_project === null
                && item.entity_label === appeStadt.string
        })

        // add naming 1 to project 2
        await addInfosToProject(project2.pk_entity, [
            naming1.pk_entity,
            naming1RefersTo.pk_entity,
            naming1IsAppeOf.pk_entity])
        // add naming 1 to project 3
        await addInfosToProject(project3.pk_entity, [
            naming1.pk_entity,
            naming1RefersTo.pk_entity,
            naming1IsAppeOf.pk_entity])

        // now naming1IsAppeOf is in 3 projects, naming2IsAppeOf in 2 projects
        // -> the repo label should be 'City'
        const repoVUpdated = await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === cityType.pk_entity
                && item.fk_project === null
                && item.entity_label === appeCity.string
        })
        expect(repoVUpdated)

    })
})


async function createNamingAndPersonMock() {
    // NAMING
    const {naming, appellation} = await createNamingMock();
    // PERSON
    const person = await createPersonMock();
    return {naming, person, appellation};
}

async function createPersonMock() {
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    const person = await createInfResource(InfResourceMock.PERSON_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1);
    return person;
}

async function createProject() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    return project
}

async function createNamingMock() {
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);

    // TeEn
    const naming = await createInfResource(InfResourceMock.NAMING_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1);

    const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE);

    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON);
    return {naming, appellation};
}


// async function createBirthMock() {

//     // MODEL + LABELS
//     await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH);
//     await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE);
//     await createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM);

//     // TeEn
//     const birth = await createInfTemporalEntity(InfTemporalEntityMock.BIRTH_1);
//     await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_BIRTH);

//     // Stmts
//     await createInfStatement(InfStatementMock.BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1);
//     await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_BIRTH_1_BROUGHT_INTO_LIFE_PERON_1);
//     return birth;
// }


// async function createUnionMock() {

//     // MODEL + LABELS
//     await createDfhApiClass(DfhApiClassMock.EN_633_UNION);
//     await createDfhApiProperty(DfhApiPropertyMock.EN_1436_HAS_PARTNER);

//     // TeEn
//     const union = await createInfTemporalEntity(InfTemporalEntityMock.UNION_1);
//     await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_UNION_1);

//     // Stmts
//     await createInfStatement(InfStatementMock.UNOIN_1_HAS_PARTNER_1);
//     await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1);

//     await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT)
//     return union;
// }

export async function createUnion2Mock() {

    // MODEL + LABELS
    await createDfhApiClass(DfhApiClassMock.EN_633_UNION);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1436_HAS_PARTNER);

    // TeEn
    const union = await createInfResource(InfResourceMock.UNION_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_UNION_1);

    const birth = await createInfResource(InfResourceMock.BIRTH_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_BIRTH);

    // peIt
    await createInfResource(InfResourceMock.ALBERT_IV);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_ALBERT_IV);

    // Stmts
    await createInfStatement(InfStatementMock.UNOIN_1_HAS_PARTNER_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1);

    await createInfStatement(InfStatementMock.UNOIN_1_HAS_PARTNER_2);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_UNOIN_1_HAS_PARTNER_2);

    await createInfStatement(InfStatementMock.BIRTH_1_STEMS_FROM_UNION_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_BIRTH_1_STEMS_FROM_UNION_1);

    await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT_2)
    return {union, birth};
}

