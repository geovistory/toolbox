/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {RClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {RClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/r-class-label/RClassLabelService';
import {REntityFullTextService} from '../../../../../warehouse/aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {REntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {RClassService} from '../../../../../warehouse/primary-ds/class/RClassService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {DfhOutgoingPropertyService} from '../../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {DfhPropertyLabelService} from '../../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {REdgeService} from '../../../../../warehouse/primary-ds/edge/REdgeService';
import {REntityId, REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {ProClassFieldsConfigService} from '../../../../../warehouse/primary-ds/ProClassFieldsConfigService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';
import {ProEntityLabelConfigService} from '../../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {RPropertyService} from '../../../../../warehouse/primary-ds/property/RPropertyService';
import {ProPropertyLabelService} from '../../../../../warehouse/primary-ds/ProPropertyLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfResource} from '../../../../helpers/atomic/inf-resource.helper';
import {createInfTimePrimitive} from '../../../../helpers/atomic/inf-time-primitive.helper';
import {createProClassFieldConfig} from '../../../../helpers/atomic/pro-class-field-config.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {addInfoToProject} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/meta/model.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfResourceMock} from '../../../../helpers/data/gvDB/InfResourceMock';
import {InfTimePrimitiveMock} from '../../../../helpers/data/gvDB/InfTimePrimitiveMock';
import {ProClassFieldConfigMock} from '../../../../helpers/data/gvDB/ProClassFieldConfigMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {SysSystemTypeMock} from '../../../../helpers/data/gvDB/SysSystemTypeMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
const rEntityFullTextStub: WarehouseStubs = {
    primaryDataServices: [
        REntityService,
        REdgeService,
        ProClassFieldsConfigService,
        RPropertyService,
        DfhPropertyLabelService,
        ProPropertyLabelService,
        ProEntityLabelConfigService,
        DfhOutgoingPropertyService,
        RClassService,
        DfhClassLabelService,
        ProClassLabelService,
    ],
    aggDataServices: [
        // IdentifyingPropertyService,
        RClassFieldLabelService,
        REntityLabelService,
        RClassLabelService,
        REntityFullTextService,
        EntityPreviewService
    ],
}
/**
 * Testing whole stack from postgres to warehouse
 */
describe('REntityFullTextService', function () {
    let wh: Warehouse;
    let s: REntityFullTextService;

    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(rEntityFullTextStub)
        wh = injector.get(Warehouse)
        s = injector.get(REntityFullTextService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create full text of naming', async () => {
        const { naming } = await createNamingMock();


        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: null}},
            {full_text: {eq: `Appellation in a language (time-indexed) – refers to name: 'Jack the foo'`}},
        ])

        expect(result).not.to.be.undefined();
    })

    it('should create full text of naming with person', async () => {
        const { naming } = await createNamingAndPersonMock();

        const expected = `Appellation in a language (time-indexed) – refers to name: 'Jack the foo', is appellation for language of: 'Jack the foo'`

        await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: null}},
            {full_text: {eq: expected}},
        ])

    })



    it('should create full text of person', async () => {
        const { person } = await createNamingAndPersonMock();

        const expected = `Person – has appellations (default): 'Jack the foo'`
        const id: REntityId = {
            pkEntity: person.pk_entity ?? -1
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => {
                return val?.fullText === expected
            }
        })

    })
    it('should update full text of person', async () => {
        const { person } = await createNamingAndPersonMock();

        let expected = `Person – has appellations (default): 'Jack the foo'`
        const id: REntityId = {
            pkEntity: person.pk_entity ?? -1
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.fullText === expected
        })

        await createProTextProperty({
            fk_dfh_class: 21,
            fk_project: ProProjectMock.DEFAULT_PROJECT.pk_entity,
            fk_language: InfLanguageMock.ENGLISH.pk_entity,
            fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
            string: 'Human'
        })
        expected = `Human – has appellations (default): 'Jack the foo'`

        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => val?.fullText === expected
        })

    })


})



async function createNamingAndPersonMock() {
    // NAMING
    const { naming, project, appellation, propertyRefersToName } = await createNamingMock();
    // PERSON
    const { person, classPerson, hasAppePropLabel } = await createPersonMock();
    return { project, appellation, naming, person, classPerson, hasAppePropLabel, propertyRefersToName };
}

async function createPersonMock() {
    await createTypes()
    const classPerson = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    await createInfLanguage(InfLanguageMock.ENGLISH);
    const hasAppePropLabel = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_EN_PROPERTY_PERSON_HAS_APPELLATION)
    const person = await createInfResource(InfResourceMock.PERSON_1);
    await addInfoToProject(person.pk_entity, ProProjectMock.PROJECT_1.pk_entity);
    const stmt = await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
    await addInfoToProject(stmt.pk_entity, ProProjectMock.PROJECT_1.pk_entity);
    return { person, classPerson, hasAppePropLabel };
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

    const naming = await createInfResource(InfResourceMock.NAMING_1);
    const namingProjRel = await addInfoToProject(naming.pk_entity, ProProjectMock.PROJECT_1.pk_entity);

    const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
    const stmtToAppe = await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
    await addInfoToProject(stmtToAppe.pk_entity, ProProjectMock.PROJECT_1.pk_entity);

    await createInfTimePrimitive(InfTimePrimitiveMock.TP_1)

    const stmtToTp = await createInfStatement(InfStatementMock.NAMING_1_ONGOING_THROUGHOUT_TP_1)
    await addInfoToProject(stmtToTp.pk_entity, project.pk_entity)

    return { naming, namingProjRel, project, appellation, propertyRefersToName };
}

