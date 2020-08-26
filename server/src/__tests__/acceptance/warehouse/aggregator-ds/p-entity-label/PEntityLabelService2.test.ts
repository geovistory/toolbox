/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import assert from 'assert';
import {PEntityLabelService} from '../../../../../warehouse/aggregator-ds/p-entity-label/PEntityLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {getWarEntityPreview} from '../../../../helpers/atomic/war-entity_preview.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, wait, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityLabelService2', function () {
    let wh: Warehouse;
    let s: PEntityLabelService;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
        s = wh.agg.pEntityLabel;

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
    it('should create entity label of person with recursive function', async () => {
        await createInfLanguage(InfLanguageMock.GERMAN)
        await createProProject(ProProjectMock.PROJECT_1)
        await createProProject(ProProjectMock.DEFAULT_PROJECT)
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING)
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)

        // PERSON
        await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

        // APPELLATION
        await createInfAppellation(InfAppellationMock.JACK_THE_FOO)

        // NAMING
        await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
        await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
        await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)


        await wh.start()

        const id = {
            fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1,
            pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1
        }
        const result = await s.index.getFromIdx(id)

        assert.equal(result, InfAppellationMock.JACK_THE_FOO.string)

        const warPreviews = await getWarEntityPreview(id.pkEntity, id.fkProject)
        assert.equal(warPreviews[0].entity_label, InfAppellationMock.JACK_THE_FOO.string)


    })
    it('should update entity label of person after removing stmt 1111 from project', async () => {
        await createInfLanguage(InfLanguageMock.GERMAN)
        await createProProject(ProProjectMock.PROJECT_1)
        await createProProject(ProProjectMock.DEFAULT_PROJECT)
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING)
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)

        // PERSON
        await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

        // APPELLATION
        await createInfAppellation(InfAppellationMock.JACK_THE_FOO)

        // NAMING
        await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
        await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
        await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)


        await wh.start()

        const id = {
            fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1,
            pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1
        }
        let result = await s.index.getFromIdx(id)

        assert.equal(result, InfAppellationMock.JACK_THE_FOO.string)

        await updateProInfoProjRel(
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1
            , {
                ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
                is_in_project: false
            })

        await wait(500)
        result = await s.index.getFromIdx(id)
        assert.equal(result, '(no label)')
    })

    it('should create entity label of naming and add person', async () => {
        await createInfLanguage(InfLanguageMock.GERMAN)
        await createProProject(ProProjectMock.PROJECT_1)
        await createProProject(ProProjectMock.DEFAULT_PROJECT)
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING)
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)

        await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)

        await createInfAppellation(InfAppellationMock.JACK_THE_FOO)

        await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)

        await wh.start()

        let result = await s.index.getFromIdx({
            fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1,
            pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1
        })
        assert.equal(result, InfAppellationMock.JACK_THE_FOO.string)

        // PERSON
        await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
        await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)

        await wait(500)
        result = await s.index.getFromIdx({
            fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1,
            pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1
        })
        assert.equal(result, InfAppellationMock.JACK_THE_FOO.string)
    })
})
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

