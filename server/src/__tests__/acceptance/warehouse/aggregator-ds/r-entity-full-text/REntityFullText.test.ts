/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {REntityFullTextService} from '../../../../../warehouse/aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProClassFieldConfig} from '../../../../helpers/atomic/pro-class-field-config.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProInfoProjRel, addEntityToProject} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProClassFieldConfigMock} from '../../../../helpers/data/gvDB/ProClassFieldConfigMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {SysSystemTypeMock} from '../../../../helpers/data/gvDB/SysSystemTypeMock';
import {setupCleanAndStartWarehouse, waitForEntityPreviewUntil, waitUntilSatisfy} from '../../../../helpers/warehouse-helpers';
import {createInfTimePrimitive} from '../../../../helpers/atomic/inf-time-primitive.helper';
import {InfTimePrimitiveMock} from '../../../../helpers/data/gvDB/InfTimePrimitiveMock';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('REntityFullText', function () {
    let wh: Warehouse;
    let s: REntityFullTextService;

    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
        s = wh.agg.rEntityFullText
    })
    afterEach(async function () {await wh.stop()})

    it('should create full text of naming', async () => {
        const {naming} = await createNamingMock();

        const result = await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === naming.pk_entity
                && item.fk_project === null
                && item.full_text === `Appellation in a language (time-indexed) – refers to name: 'Jack the foo'`
        })

        expect(result).not.to.be.undefined();
    })

    it('should create full text of naming with person', async () => {
        const {naming} = await createNamingAndPersonMock();

        const expected = `Appellation in a language (time-indexed) – refers to name: 'Jack the foo', is appellation for language of: 'Jack the foo'`
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.pkEntity === naming.pk_entity
                && item.val === expected
        })

        expect(result).not.to.be.undefined();
    })

    it('should create incoming property label of person "has appellations"', async () => {
        const {hasAppePropLabel} = await createNamingAndPersonMock();
        const expected = hasAppePropLabel.string
        const result = await waitUntilSatisfy(wh.agg.rClassFieldLabel.afterPut$, (item) => {
            return item.key.fkClass === DfhApiClassMock.EN_21_PERSON.dfh_pk_class
                && item.key.fkProperty === 1111
                && item.key.isOutgoing === false
                && item.val === expected
        })
        expect(result.val).to.equal(expected)
    })
    it('should create full text of person', async () => {
        const {person} = await createNamingAndPersonMock();

        const expected = `Person – has appellations (default): 'Jack the foo'`
        const result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.pkEntity === person.pk_entity
                && item.val === expected
        })

        expect(result).not.to.be.undefined();
    })
    it('should update full text of person', async () => {
        const {person} = await createNamingAndPersonMock();

        let expected = `Person – has appellations (default): 'Jack the foo'`
        let result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.pkEntity === person.pk_entity
                && item.val === expected
        })
        await createProTextProperty({
            fk_dfh_class: 21,
            fk_project: ProProjectMock.DEFAULT_PROJECT.pk_entity,
            fk_language: InfLanguageMock.ENGLISH.pk_entity,
            fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
            string: 'Human'
        })
        expected = `Human – has appellations (default): 'Jack the foo'`
        result = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.pkEntity === person.pk_entity
                && item.val === expected
        })

        expect(result)
    })


})



async function createNamingAndPersonMock() {
    // NAMING
    const {naming, project, appellation, propertyRefersToName} = await createNamingMock();
    // PERSON
    const {person, classPerson, hasAppePropLabel} = await createPersonMock();
    return {project, appellation, naming, person, classPerson, hasAppePropLabel, propertyRefersToName};
}

async function createPersonMock() {
    await createTypes()
    const classPerson = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    await createInfLanguage(InfLanguageMock.ENGLISH);
    const hasAppePropLabel = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_EN_PROPERTY_PERSON_HAS_APPELLATION)
    const person = await createInfPersistentItem(InfPersistentItemMock.PERSON_1);
    await addEntityToProject(person.pk_entity, ProProjectMock.PROJECT_1.pk_entity);
    const stmt = await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
    await addEntityToProject(stmt.pk_entity, ProProjectMock.PROJECT_1.pk_entity);
    return {person, classPerson, hasAppePropLabel};
}

async function createNamingMock() {
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);
    await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    const propertyRefersToName = await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME);

    await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
    await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)

    const naming = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1);
    const namingProjRel = await addEntityToProject(naming.pk_entity, ProProjectMock.PROJECT_1.pk_entity);

    const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
    const stmtToAppe = await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
    await addEntityToProject(stmtToAppe.pk_entity, ProProjectMock.PROJECT_1.pk_entity);

    await createInfTimePrimitive(InfTimePrimitiveMock.TP_1)

    const stmtToTp = await createInfStatement(InfStatementMock.NAMING_1_ONGOING_THROUGHOUT_TP_1)
    await addEntityToProject(stmtToTp.pk_entity, project.pk_entity)

    return {naming, namingProjRel, project, appellation, propertyRefersToName};
}
