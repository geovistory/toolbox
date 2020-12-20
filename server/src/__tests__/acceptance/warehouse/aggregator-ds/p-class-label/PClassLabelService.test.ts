/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {PClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/p-class-label/PClassLabelService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {PClassService} from '../../../../../warehouse/primary-ds/class/PClassService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';
import {ProProjectService} from '../../../../../warehouse/primary-ds/ProProjectService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextPropertyClassLabel, deleteProTextProperty, updateProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/meta/model.helper';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForClassPreview} from '../../../../helpers/warehouse-helpers';
const pClassLabelService: WarehouseStubs = {
    primaryDataServices: [
        PClassService,
        ProProjectService,
        DfhClassLabelService,
        ProClassLabelService
    ],
    aggDataServices: [
        PClassLabelService
    ]
}
describe('PClassLabelService', function () {

    let wh: Warehouse;

    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(pClassLabelService)
        wh = injector.get(Warehouse)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create class label of Person: de-ontome', async () => {
        const { prel, cla } = await createBasicMock();
        const result = await waitForClassPreview(wh, [
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: prel.fk_project } },
            { label: { eq: 'Foo' } },
        ])
        expect(result.label).to.equal('Foo')
    })
    it('should create class label of Person: de-geovistory', async () => {
        const { prel, cla, gvTxt } = await createGeovistoryLabelMock();
        const result = await waitForClassPreview(wh, [
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: prel.fk_project } },
            { label: { eq: gvTxt.string } },
        ])
        expect(result.label).to.equal('Geburt (GV default)')
    })
    it('should create class label of Person: de-project', async () => {
        const { prel, cla, proTxt } = await createProjectLabelMock();
        const result = await waitForClassPreview(wh, [
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: prel.fk_project } },
            { label: { eq: proTxt.string } },
        ])
        expect(result.label).to.equal('Geburt')
    })
    it('should update class label of Person: de-project', async () => {
        const { prel, cla, proTxt } = await createProjectLabelMock();
        await updateProTextProperty(
            proTxt.pk_entity ?? -1,
            { string: 'Niederkunft' }
        )
        const result = await waitForClassPreview(wh, [
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: prel.fk_project } },
            { label: { eq: 'Niederkunft' } },
        ])
        expect(result.label).to.equal('Niederkunft')
    })

    it('should switch class label of Person: de-project to de-geovistory', async () => {
        const { prel, cla, proTxt } = await createProjectLabelMock();

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        const result = await waitForClassPreview(wh, [
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: prel.fk_project } },
            { label: { eq: 'Geburt (GV default)' } },
        ])
        expect(result.label).to.equal('Geburt (GV default)')

    })

    it('should switch class label of Person: de-project to de-ontome', async () => {
        const { prel, cla, proTxt, gvTxt } = await createProjectLabelMock();

        await Promise.all([
            deleteProTextProperty(proTxt.pk_entity ?? -1),
            deleteProTextProperty(gvTxt.pk_entity ?? -1),
            waitForClassPreview(wh, [
                {fk_class: {eq: cla.dfh_pk_class}},
                {fk_project: {eq: prel.fk_project}},
                {label: {eq: 'Foo'}},
            ])
        ])

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
    return { prel, cla }
}

async function createGeovistoryLabelMock() {
    const { prel, cla } = await createBasicMock();
    await createTypes()
    const gvTxt = await createProTextPropertyClassLabel(
        PK_DEFAULT_CONFIG_PROJECT,
        1,
        'Geburt (GV default)',
        18605 //german
    )
    return { prel, cla, gvTxt }
}


async function createProjectLabelMock() {
    const { prel, cla, gvTxt } = await createGeovistoryLabelMock();
    await createTypes()
    const proTxt = await createProTextPropertyClassLabel(
        prel.fk_project ?? -1,
        1,
        'Geburt',
        18605 //german
    )
    return { prel, cla, gvTxt, proTxt }
}
