/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {PPropertyLabelService} from '../../../../../warehouse/aggregator-ds/p-property-label/PPropertyLabelService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {AtmLanguages, createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextPropertyPropertyLabel, deleteProTextProperty, updateProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitUntilSatisfy} from '../../../../helpers/warehouse-helpers';



describe('PPropertyLabelService', function () {

    let wh: Warehouse;
    let s: PPropertyLabelService;
    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
        s = wh.agg.pPropertyLabel
    })

    it('should create property label of Brought into life: de-ontome', async () => {
        const {prel, cla} = await createBasicMock();

        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.pkProperty === cla.dfh_pk_property
                && item.val === 'Foo'
        })

        expect(result.val).to.equal('Foo')
    })
    it('should create property label of "Brought into life": de-geovistory', async () => {
        const {prel, cla, gvTxt} = await createGeovistoryLabelMock();
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.pkProperty === cla.dfh_pk_property
                && item.val === gvTxt.string
        })
        expect(result.val).to.equal('Geborenes Kind')
    })
    it('should create property label of "Brought into life": de-project', async () => {
        const {prel, cla, proTxt} = await createProjectLabelMock();
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.pkProperty === cla.dfh_pk_property
                && item.val === proTxt.string
        })
        expect(result.val).to.equal('Brachte zur Welt')
    })
    it('should update property label of "Brought into life": de-project', async () => {
        const {prel, cla, proTxt} = await createProjectLabelMock();
        await updateProTextProperty(
            proTxt.pk_entity ?? -1,
            {string: 'Brachte zur Welt 2'}
        )
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.pkProperty === cla.dfh_pk_property
                && item.val === 'Brachte zur Welt 2'
        })
        expect(result.val).to.equal('Brachte zur Welt 2')
    })

    it('should switch property label of "Brought into life": de-project to de-geovistory', async () => {
        const {prel, cla, proTxt} = await createProjectLabelMock();

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.pkProperty === cla.dfh_pk_property
                && item.val === 'Geborenes Kind'
        })
        expect(result.val).to.equal('Geborenes Kind')

    })

    it('should switch property label of "Brought into life": de-project to de-ontome', async () => {
        const {prel, cla, proTxt, gvTxt} = await createProjectLabelMock();

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        await deleteProTextProperty(gvTxt.pk_entity ?? -1)
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.pkProperty === cla.dfh_pk_property
                && item.val === 'Foo'
        })
        expect(result.val).to.equal('Foo')

    })


})
async function createBasicMock() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    await createProProject(ProProjectMock.PROJECT_1);
    const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    const cla = await createDfhApiProperty({
        dfh_pk_property: 1,
        dfh_property_label: 'Foo',
        dfh_property_label_language: 'de',
        dfh_fk_profile: ProDfhProfileProjRelMock.PROJ_1_PROFILE_4.fk_profile
    });
    return {prel, cla}
}

async function createGeovistoryLabelMock() {
    const {prel, cla} = await createBasicMock();
    await createTypes()
    const gvTxt = await createProTextPropertyPropertyLabel(
        PK_DEFAULT_CONFIG_PROJECT,
        1,
        'Geborenes Kind',
        AtmLanguages.GERMAN.id
    )
    return {prel, cla, gvTxt}
}


async function createProjectLabelMock() {
    const {prel, cla, gvTxt} = await createGeovistoryLabelMock();
    await createTypes()
    const proTxt = await createProTextPropertyPropertyLabel(
        prel.fk_project ?? -1,
        1,
        'Brachte zur Welt',
        AtmLanguages.GERMAN.id
    )
    return {prel, cla, gvTxt, proTxt}
}
