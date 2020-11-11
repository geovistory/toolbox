/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {AtmLanguages, createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProTextPropertyClassLabel, deleteProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {setupCleanAndStartWarehouse, waitForClassPreview} from '../../../../helpers/warehouse-helpers';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';

describe('RClassLabelService', function () {

    let wh: Warehouse;
    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
    })

    afterEach(async function () {
        await wh.stop()
    })


    it('should create class label of Person: en-geovistory', async () => {
        const {cla, gvTxt} = await createGeovistoryLabelMock();
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: 0}},
            {label: {eq: gvTxt.string}},
        ])
        expect(result.label).to.equal('BIRTH GV DEFAULT')
    })


    it('should switch class label of Person: en-geovistory to en-ontome', async () => {
        const {cla, gvTxt} = await createGeovistoryLabelMock();
        await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: 0}},
            {label: {eq: gvTxt.string}},
        ])
        await deleteProTextProperty(gvTxt.pk_entity ?? -1)
        const result = await waitForClassPreview(wh, [
            {fk_class: {eq: cla.dfh_pk_class}},
            {fk_project: {eq: 0}},
            {label: {eq: 'BIRTH ONTOME'}},
        ])
        expect(result.label).to.equal('BIRTH ONTOME')

    })


})
async function createOntomeLabelMock() {

    const cla = await createDfhApiClass({
        dfh_pk_class: 1,
        dfh_class_label: 'BIRTH ONTOME',
        dfh_class_label_language: 'en',
        dfh_fk_profile: 5
    });
    return {cla}
}

async function createGeovistoryLabelMock() {
    const {cla} = await createOntomeLabelMock();
    await createTypes()
    await createInfLanguage(InfLanguageMock.ENGLISH);

    const gvTxt = await createProTextPropertyClassLabel(
        PK_DEFAULT_CONFIG_PROJECT,
        1,
        'BIRTH GV DEFAULT',
        AtmLanguages.ENGLISH.id
    )
    return {cla, gvTxt}
}

