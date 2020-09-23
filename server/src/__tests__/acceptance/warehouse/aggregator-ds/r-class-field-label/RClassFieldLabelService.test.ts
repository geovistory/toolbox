/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {RClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty, deleteProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {setupCleanAndStartWarehouse, waitUntilSatisfy} from '../../../../helpers/warehouse-helpers';



describe('RClassFieldLabelService', function () {

    let wh: Warehouse;
    let s: RClassFieldLabelService;
    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
        s = wh.agg.rClassFieldLabel
    })
    afterEach(async function () {await wh.stop()})

    it('should create outgoing property label for en from ontome', async () => {
        const {dfhProp} = await createDfhLabelMock();

        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label
        })

        expect(result.val).to.equal(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label)
    })


    it('should create incoming property label for en from ontome', async () => {
        const {dfhProp} = await createDfhLabelMock();
        const expected = '[reverse of: ' + DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label + ']'
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkClass === dfhProp.dfh_property_range
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === false
                && item.val === expected
        })

        expect(result.val).to.equal(expected)
    })

    it('should create outgoing property label for en from geovistory', async () => {
        const {dfhProp, gvTxt} = await createGeovistoryLabelMock();
        const expected = gvTxt.string
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === expected
        })

        expect(result.val).to.equal(expected)
    })


    it('should create incoming property label for en from geovistory', async () => {
        const { dfhProp, gvTxt} = await createGeovistoryLabelIncomingMock();
        const expected = gvTxt.string
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.fkClass === dfhProp.dfh_property_range
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


    it('should switch outgoing property label en-geovistory to en-ontome', async () => {
        const {dfhProp, gvTxt} = await createGeovistoryLabelMock();
        let result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return  item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === gvTxt.string
        })
        expect(result.val).to.equal(gvTxt.string)

        await deleteProTextProperty(gvTxt.pk_entity ?? -1)
        result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return  item.key.fkClass === dfhProp.dfh_property_domain
                && item.key.fkProperty === dfhProp.dfh_pk_property
                && item.key.isOutgoing === true
                && item.val === dfhProp.dfh_property_label
        })
        expect(result.val).to.equal(dfhProp.dfh_property_label)

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
    const project = await createProProject(ProProjectMock.PROJECT_1);
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);

    const apiProp = await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    const hasAppePropLabel = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_PERSON_HAS_APPELLATION)
    return {project, apiProp, hasAppePropLabel};
}
