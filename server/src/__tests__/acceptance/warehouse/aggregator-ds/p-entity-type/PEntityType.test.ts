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
import {setupCleanAndStartWarehouse, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityLabelService2', function () {
    let wh: Warehouse;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()

    })

    it('should create entity label of naming', async () => {
        const {naming, project, appellation} = await createNamingMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should create entity label of person', async () => {
        const {person, project, appellation} = await createNamingAndPersonMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should update entity label of person after removing stmt 1111 from project', async () => {
        const {person, project, appellation} = await createNamingAndPersonMock();
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
        const {naming, project, appellation} = await createNamingMock();
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
})
async function createNamingAndPersonMock() {
    // NAMING
    const {naming, project, appellation} = await createNamingMock();
    // PERSON
    const person = await createPersonMock();
    return {naming, person, project, appellation};
}

async function createPersonMock() {
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    const person = await createInfPersistentItem(InfPersistentItemMock.PERSON_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1);
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON);
    return person;
}

async function createNamingMock() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);

    const naming = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1);

    const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE);
    return {naming, project, appellation};
}

