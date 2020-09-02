/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitForEntityPreview, waitForEntityPreviewUntil} from '../../../../helpers/warehouse-helpers';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {createProEntityLabelConfig} from '../../../../helpers/atomic/pro-entity-label-config.helper';
import {ProEntityLabelConfigMock} from '../../../../helpers/data/gvDB/ProEntityLabelConfigMock';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityLabelService2', function () {
    let wh: Warehouse;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()

    })
    afterEach(async function () {await wh.stop()})

    it('should create entity label of naming', async () => {
        const project = await createProject();
        const {naming, appellation} = await createNamingMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should create entity label of person', async () => {
        const project = await createProject();
        const {person, appellation} = await createNamingAndPersonMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should update entity label of person after removing stmt 1111 from project', async () => {
        const project = await createProject();
        const {person, appellation} = await createNamingAndPersonMock();
        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
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
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: '(no label)'}},
        ])
        expect(result.entity_label).to.equal('(no label)')
    })

    it('should create entity label of naming and add person', async () => {
        const project = await createProject();
        const {naming, appellation} = await createNamingMock();
        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)

        const person = await createPersonMock();
        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })

    it('should create entity label of Presence – E93 (-- without )', async () => {

    })

    it('should create entity label of Birth – E67 (-- with identifying property)', async () => {
        const project = await createProject();
        const {appellation} = await createNamingMock();
        await createPersonMock();
        const birth = await createBirthMock()
        const result = await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === birth.pk_entity
                && item.fk_project === project.pk_entity
                && item.entity_label === appellation.string
        })
        expect(result)
    })

    it('should create entity label of Union – C9 (-- with identifying property)', async () => {

        const project = await createProject();
        const {appellation} = await createNamingMock();
        await createPersonMock();
        const union = await createUnionMock()
        const result = await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === union.pk_entity
                && item.fk_project === project.pk_entity
                && item.entity_label === appellation.string
        })
        expect(result)
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
    const person = await createInfPersistentItem(InfPersistentItemMock.PERSON_1);
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
    const naming = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1);

    const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE);

    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON);
    return {naming, appellation};
}


async function createBirthMock() {

    // MODEL + LABELS
    await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH);
    await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM);

    // TeEn
    const birth = await createInfTemporalEntity(InfTemporalEntityMock.BIRTH_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_BIRTH);

    // Stmts
    await createInfStatement(InfStatementMock.BIRTH_1_BROUGHT_INTO_LIFE_PERSON_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_BIRTH_1_BROUGHT_INTO_LIFE_PERON_1);
    return birth;
}


async function createUnionMock() {

    // MODEL + LABELS
    await createDfhApiClass(DfhApiClassMock.EN_633_UNION);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1436_HAS_PARTNER);

    // TeEn
    const birth = await createInfTemporalEntity(InfTemporalEntityMock.UNION_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_UNION_1);

    // Stmts
    await createInfStatement(InfStatementMock.UNOIN_1_HAS_PARTNER_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_UNOIN_1_HAS_PARTNER_1);

    await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT)
    return birth;
}

