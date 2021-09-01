/* eslint-disable @typescript-eslint/no-invalid-this */
import 'reflect-metadata';
import {RClassFieldId, RClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {DfhPropertyLabelService} from '../../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {RPropertyService} from '../../../../../warehouse/primary-ds/property/RPropertyService';
import {ProPropertyLabelService} from '../../../../../warehouse/primary-ds/ProPropertyLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty, deleteProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {createTypes} from '../../../../helpers/meta/model.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../../helpers/warehouse-helpers';

const stubs: WarehouseStubs = {
    primaryDataServices: [
        RPropertyService,
        DfhPropertyLabelService,
        ProPropertyLabelService
    ],
    aggDataServices: [
        RClassFieldLabelService
    ]
}


describe('RClassFieldLabelService', function () {

    let wh: Warehouse;
    let s: RClassFieldLabelService;
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(stubs)
        wh = injector.get(Warehouse)
        s = injector.get(RClassFieldLabelService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create outgoing property label for en from ontome', async () => {
        const {dfhProp} = await createDfhLabelMock();
        const id: RClassFieldId = {
            fkClass: dfhProp.dfh_property_domain,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: true,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label
        })
    })


    it('should create incoming property label for en from ontome', async () => {
        const {dfhProp} = await createDfhLabelMock();
        const expected = DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_inverse_label
        const id: RClassFieldId = {
            fkClass: dfhProp.dfh_property_range,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: false,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === expected
        })

    })

    it('should create outgoing property label for en from geovistory', async () => {
        const {dfhProp, gvTxt} = await createGeovistoryLabelMock();
        const expected = gvTxt.string
        const id: RClassFieldId = {
            fkClass: dfhProp.dfh_property_domain,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: true,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === expected
        })

    })


    it('should create incoming property label for en from geovistory', async () => {
        const {dfhProp, gvTxt} = await createGeovistoryLabelIncomingMock();
        const expected = gvTxt.string
        const id: RClassFieldId = {
            fkClass: dfhProp.dfh_property_range,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: false,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === expected
        })

    })


    it('should create incoming property label has appellations (default) for en from geovistory', async () => {
        const {gvTxt} = await createPersonMock();
        const expected = gvTxt.string
        const id: RClassFieldId = {
            fkClass: 21,
            fkProperty: 1111,
            isOutgoing: false,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === expected
        })

    })



    it('should switch outgoing property label en-geovistory to en-ontome', async () => {
        const {dfhProp, gvTxt} = await createGeovistoryLabelMock();

        const id: RClassFieldId = {
            fkClass: dfhProp.dfh_property_domain,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: true,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === gvTxt.string
        })

        await deleteProTextProperty(gvTxt.pk_entity ?? -1)
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === dfhProp.dfh_property_label
        })

    })

})
async function createDfhLabelMock() {
    const dfhProp = await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE);
    return {dfhProp}
}

async function createGeovistoryLabelMock() {
    const {dfhProp} = await createDfhLabelMock();
    await createTypes()
    await createInfLanguage(InfLanguageMock.ENGLISH);
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_EN_PROPERTY_BROUGHT_INTO_LIFE)
    return {dfhProp, gvTxt}
}

async function createGeovistoryLabelIncomingMock() {
    const {dfhProp} = await createDfhLabelMock();
    await createTypes()
    await createInfLanguage(InfLanguageMock.ENGLISH);
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_EN_PROPERTY_BROUGHT_INTO_LIFE_REVERSE)
    return {dfhProp, gvTxt}
}




async function createPersonMock() {
    await createTypes()
    await createInfLanguage(InfLanguageMock.GERMAN);
    await createInfLanguage(InfLanguageMock.ENGLISH);
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    // const dfhProp = await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_EN_PROPERTY_PERSON_HAS_APPELLATION)

    return {gvTxt};
}
