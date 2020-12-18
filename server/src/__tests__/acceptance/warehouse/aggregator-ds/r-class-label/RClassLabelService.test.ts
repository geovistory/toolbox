/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {RClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/r-class-label/RClassLabelService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {RClassService} from '../../../../../warehouse/primary-ds/class/RClassService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';
import {PK_DEFAULT_CONFIG_PROJECT, Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProTextPropertyClassLabel, deleteProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/meta/model.helper';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForClassPreview} from '../../../../helpers/warehouse-helpers';
const rClassLabelService: WarehouseStubs = {
    primaryDataServices: [
        RClassService,
        DfhClassLabelService,
        ProClassLabelService
    ],
    aggDataServices: [
        RClassLabelService
    ]
}
describe('RClassLabelService', function () {

    let wh: Warehouse;
    let s: RClassLabelService
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(15000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(rClassLabelService)
        wh = injector.get(Warehouse)
        s = injector.get(RClassLabelService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })
    it('should propagate rClass to rClassLabel', async () => {
        const cla = await createDfhApiClass({
            dfh_pk_class: 1,
            dfh_class_label: 'BIRTH ONTOME',
            dfh_class_label_language: 'en',
            dfh_fk_profile: 5
        });
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx({
                pkClass: cla.dfh_pk_class
            }),
            compare: (item) => !!item
        })
    })

    it('should create class label of Person: en-geovistory', async () => {
        const { cla, gvTxt } = await createGeovistoryLabelMock();
        const result = await waitForClassPreview(wh, [
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: 0 } },
            { label: { eq: gvTxt.string } },
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
            { fk_class: { eq: cla.dfh_pk_class } },
            { fk_project: { eq: 0 } },
            { label: { eq: 'BIRTH ONTOME' } },
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
    return { cla }
}

async function createGeovistoryLabelMock() {
    const { cla } = await createOntomeLabelMock();
    await createTypes()
    await createInfLanguage(InfLanguageMock.ENGLISH);

    const gvTxt = await createProTextPropertyClassLabel(
        PK_DEFAULT_CONFIG_PROJECT,
        1,
        'BIRTH GV DEFAULT',
        18889 //english
    )
    return { cla, gvTxt }
}

