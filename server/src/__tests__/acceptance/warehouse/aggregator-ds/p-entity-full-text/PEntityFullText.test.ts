/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
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
describe('PEntityFullText', function () {
    let wh: Warehouse;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
    })

    it('should full text of naming', async () => {
        const {naming, project} = await createNamingMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {full_text: {eq: `Naming – has spelling: 'Jack the foo', is appellation of: 'Person – [e33]'`}},
        ])
        expect(result).not.to.be.undefined();
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
