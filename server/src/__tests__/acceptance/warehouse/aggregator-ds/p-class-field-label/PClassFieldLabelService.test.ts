/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {PClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/p-class-field-label/PClassFieldLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty, deleteProTextProperty, updateProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {setupCleanAndStartWarehouse, waitUntilSatisfy} from '../../../../helpers/warehouse-helpers';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';



describe('PPropertyLabelService', function () {

    let wh: Warehouse;
    let s: PClassFieldLabelService;
    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
        s = wh.agg.pClassFieldLabel
    })
    afterEach(async function () {await wh.stop()})

    it('should create outgoing property label for en from ontome', async () => {
        const {prel, dfhProp} = await createDfhLabelMock();

        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label
        })

        expect(result.val).to.equal(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label)
    })


    it('should create incoming property label for en from ontome', async () => {
        const {prel, dfhProp} = await createDfhLabelMock();
        const expected = '[reverse of: ' + DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label + ']'
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_range
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === false
                && item.val === expected
        })

        expect(result.val).to.equal(expected)
    })

    it('should create outgoing property label for de from geovistory', async () => {
        const {prel, dfhProp, gvTxt} = await createGeovistoryLabelMock();
        const expected = gvTxt.string
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === expected
        })

        expect(result.val).to.equal(expected)
    })


    it('should create incoming property label for de from geovistory', async () => {
        const {prel, dfhProp, gvTxt} = await createGeovistoryLabelIncomingMock();
        const expected = gvTxt.string
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_range
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === false
                && item.val === expected
        })

        expect(result.val).to.equal(expected)
    })

    it('should create outgoing property label de from project', async () => {
        const {prel, dfhProp, proTxt} = await createProjectLabelMock();
        const expected = proTxt.string
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === expected
        })
        expect(result.val).to.equal(expected)
    })


    it('should create incoming property label de from project', async () => {
        const {prel, dfhProp, proTxt} = await createProjectLabelIncomingMock();
        const expected = proTxt.string
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_range
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === false
                && item.val === expected
        })
        expect(result.val).to.equal(expected)
    })

    it('should create incoming property label of person "has appellations"', async () => {
        const {project, apiProp, hasAppePropLabel} = await createPersonMock();
        const expected = hasAppePropLabel.string
        const result = await waitUntilSatisfy(wh.agg.pClassFieldLabel.afterPut$, (item) => {
            return item.key.fkProject === project.pk_entity
                && item.key.fkClass === DfhApiClassMock.EN_21_PERSON.dfh_pk_class
                && item.key.fkProperty === apiProp.dfh_pk_property
                && item.key.isOutgoing === false
                && item.val === expected
        })
        expect(result.val).to.equal(expected)
    })

    it('should update outgoing property label de from project', async () => {
        const {prel, dfhProp, proTxt} = await createProjectLabelMock();
        await updateProTextProperty(
            proTxt.pk_entity ?? -1,
            {string: 'Brachte zur Welt 2'}
        )
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === 'Brachte zur Welt 2'
        })
        expect(result.val).to.equal('Brachte zur Welt 2')
    })

    it('should switch outgoing property label de-project to de-geovistory', async () => {
        const {prel, dfhProp, gvTxt, proTxt} = await createProjectLabelMock();
        let result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === proTxt.string
        })
        expect(result.val).to.equal(proTxt.string)

        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === gvTxt.string
        })
        expect(result.val).to.equal(gvTxt.string)

    })

    it('should switch outgoing property label from de-project to de-ontome', async () => {
        const {prel, dfhProp, proTxt, gvTxt} = await createProjectLabelMock();
        let result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === proTxt.string
        })
        expect(result.val).to.equal(proTxt.string)
        await deleteProTextProperty(proTxt.pk_entity ?? -1)
        await deleteProTextProperty(gvTxt.pk_entity ?? -1)
        result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkProject === prel.fk_project
                && item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === dfhProp.dfh_property_label
        })
        expect(result.val).to.equal(dfhProp.dfh_property_label)

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
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_PROPERTY_BROUGHT_INTO_LIFE)
    return {prel, dfhProp, gvTxt}
}

async function createGeovistoryLabelIncomingMock() {
    const {prel, dfhProp} = await createDfhLabelMock();
    await createTypes()
    const gvTxt = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_PROPERTY_BROUGHT_INTO_LIFE_REVERSE)
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
