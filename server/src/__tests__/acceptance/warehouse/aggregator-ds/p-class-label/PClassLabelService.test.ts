/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {AtmLanguages, createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextPropertyClassLabel, deleteProTextProperty, updateProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitForClassPreview} from '../../../../helpers/warehouse-helpers';

describe('PClassLabelService', function () {

    let wh: Warehouse;
    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
    })

    afterEach(async function () {await wh.stop()})

    it('should create class label of Person: de-ontome', async () => {
        const {prel, cla} = await createBasicMock();
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: prel.fk_project}},
            {label: {eq: 'Foo'}},
        ])
        expect(result.label).to.equal('Foo')
    })
    it('should create class label of Person: de-geovistory', async () => {
        const {prel, cla, gvTxt} = await createGeovistoryLabelMock();
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: prel.fk_project}},
            {label: {eq: gvTxt.string}},
        ])
        expect(result.label).to.equal('Geburt (GV default)')
    })
    it('should create class label of Person: de-project', async () => {
        const {prel, cla, proTxt} = await createProjectLabelMock();
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: prel.fk_project}},
            {label: {eq: proTxt.string}},
        ])
        expect(result.label).to.equal('Geburt')
    })
    it('should update class label of Person: de-project', async () => {
        const {prel, cla, proTxt} = await createProjectLabelMock();
        await updateProTextProperty(
            proTxt.pk_entity ?? -1,
            {string: 'Niederkunft'}
        )
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: prel.fk_project}},
            {label: {eq: 'Niederkunft'}},
        ])
        expect(result.label).to.equal('Niederkunft')
    })

    it('should switch class label of Person: de-project to de-geovistory', async () => {
        const {prel, cla, proTxt} = await createProjectLabelMock();

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: prel.fk_project}},
            {label: {eq: 'Geburt (GV default)'}},
        ])
        expect(result.label).to.equal('Geburt (GV default)')

    })

    it('should switch class label of Person: de-project to de-ontome', async () => {
        const {prel, cla, proTxt, gvTxt} = await createProjectLabelMock();

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        await deleteProTextProperty(gvTxt.pk_entity ?? -1)
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: prel.fk_project}},
            {label: {eq: 'Foo'}},
        ])
        expect(result.label).to.equal('Foo')

    })


})
async function createBasicMock() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    await createProProject(ProProjectMock.PROJECT_1);
    const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    const cla = await createDfhApiClass({
        dfh_pk_class: 1,
        dfh_class_label: 'Foo',
        dfh_class_label_language: 'de',
        dfh_fk_profile: ProDfhProfileProjRelMock.PROJ_1_PROFILE_4.fk_profile
    });
    return {prel, cla}
}

async function createGeovistoryLabelMock() {
    const {prel, cla} = await createBasicMock();
    await createTypes()
    const gvTxt = await createProTextPropertyClassLabel(
        PK_DEFAULT_CONFIG_PROJECT,
        1,
        'Geburt (GV default)',
        AtmLanguages.GERMAN.id
    )
    return {prel, cla, gvTxt}
}


async function createProjectLabelMock() {
    const {prel, cla, gvTxt} = await createGeovistoryLabelMock();
    await createTypes()
    const proTxt = await createProTextPropertyClassLabel(
        prel.fk_project ?? -1,
        1,
        'Geburt',
        AtmLanguages.GERMAN.id
    )
    return {prel, cla, gvTxt, proTxt}
}
