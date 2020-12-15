/* eslint-disable @typescript-eslint/camelcase */
import '@abraham/reflection';
import {PClassFieldLabelId, PClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty, deleteProTextProperty, updateProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {PPropertyService} from '../../../../../warehouse/primary-ds/property/PPropertyService';
import {ProProjectService} from '../../../../../warehouse/primary-ds/ProProjectService';
import {DfhPropertyLabelService} from '../../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {ProPropertyLabelService} from '../../../../../warehouse/primary-ds/ProPropertyLabelService';

const stubs: WarehouseStubs = {
    primaryDataServices: [
        PPropertyService,
        ProProjectService,
        DfhPropertyLabelService,
        ProPropertyLabelService
    ],
    aggDataServices: [PClassFieldLabelService]
}

describe('PClassFieldLabelService', function () {

    let wh: Warehouse;
    let s: PClassFieldLabelService;
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(35000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(stubs)
        wh = injector.get(Warehouse)
        s = injector.get(PClassFieldLabelService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })


    it('should create outgoing property label for en from ontome', async () => {
        const {prel, dfhProp} = await createDfhLabelMock();
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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
        const {prel, dfhProp} = await createDfhLabelMock();
        const expected = '[reverse of: ' + DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label + ']'
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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

    it('should create outgoing property label for de from geovistory', async () => {
        const {prel, dfhProp, gvTxt} = await createGeovistoryLabelMock();
        const expected = gvTxt.string
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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


    it('should create incoming property label for de from geovistory', async () => {
        const {prel, dfhProp, gvTxt} = await createGeovistoryLabelIncomingMock();
        const expected = gvTxt.string
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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

    it('should create outgoing property label de from project', async () => {
        const {prel, dfhProp, proTxt} = await createProjectLabelMock();
        const expected = proTxt.string
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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


    it('should create incoming property label de from project', async () => {
        const {prel, dfhProp, proTxt} = await createProjectLabelIncomingMock();
        const expected = proTxt.string
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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

    it('should create incoming property label of person "has appellations"', async () => {
        const {project, apiProp: dfhProp, hasAppePropLabel} = await createPersonMock();
        const expected = hasAppePropLabel.string
        const id: PClassFieldLabelId = {
            fkProject: project.pk_entity ?? -1,
            fkClass: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: false,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === expected
        })
    })

    it('should update outgoing property label de from project', async () => {
        const {prel, dfhProp, proTxt} = await createProjectLabelMock();
        const expected = 'Brachte zur Welt 2'
        await updateProTextProperty(
            proTxt.pk_entity ?? -1,
            {string: expected}
        )
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
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

    it('should switch outgoing property label de-project to de-geovistory', async () => {
        const {prel, dfhProp, gvTxt, proTxt} = await createProjectLabelMock();
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
            fkClass: dfhProp.dfh_property_domain,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: true,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === proTxt.string
        })


        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === gvTxt.string
        })


    })

    it('should switch outgoing property label from de-project to de-ontome', async () => {
        const {prel, dfhProp, proTxt, gvTxt} = await createProjectLabelMock();
        const id: PClassFieldLabelId = {
            fkProject: prel.fk_project,
            fkClass: dfhProp.dfh_property_domain,
            fkProperty: dfhProp.dfh_pk_property,
            isOutgoing: true,
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === proTxt.string
        })

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        await deleteProTextProperty(gvTxt.pk_entity ?? -1)

        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.label === dfhProp.dfh_property_label
        })

    })


})
async function createDfhLabelMock() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    await createProProject(ProProjectMock.PROJECT_1);
    const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    const dfhProp = await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE);
    return {prel, dfhProp}
}

async function createGeovistoryLabelMock() {
    const {prel, dfhProp} = await createDfhLabelMock();
    await createTypes()
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_DE_PROPERTY_BROUGHT_INTO_LIFE)
    return {prel, dfhProp, gvTxt}
}

async function createGeovistoryLabelIncomingMock() {
    const {prel, dfhProp} = await createDfhLabelMock();
    await createTypes()
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_DE_PROPERTY_BROUGHT_INTO_LIFE_REVERSE)
    return {prel, dfhProp, gvTxt}
}

async function createProjectLabelMock() {
    const {prel, dfhProp, gvTxt} = await createGeovistoryLabelMock();
    const proTxt = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_BROUGHT_INTO_LIFE)
    return {prel, dfhProp, gvTxt, proTxt}
}


async function createProjectLabelIncomingMock() {
    const {prel, dfhProp, gvTxt} = await createGeovistoryLabelMock();
    const proTxt = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_BROUGHT_INTO_LIFE_REVERSE)
    return {prel, dfhProp, gvTxt, proTxt}
}


async function createPersonMock() {
    await createTypes()
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);

    const apiProp = await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    const hasAppePropLabel = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_PERSON_HAS_APPELLATION)
    return {project, apiProp, hasAppePropLabel};
}
