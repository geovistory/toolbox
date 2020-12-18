/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {PClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {PClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/p-class-label/PClassLabelService';
import {PEntityFullTextService} from '../../../../../warehouse/aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {PEntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {PClassService} from '../../../../../warehouse/primary-ds/class/PClassService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {DfhOutgoingPropertyService} from '../../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {DfhPropertyLabelService} from '../../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {PEdgeService} from '../../../../../warehouse/primary-ds/edge/PEdgeService';
import {REdgeService} from '../../../../../warehouse/primary-ds/edge/REdgeService';
import {PEntityId, PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
import {REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {ProClassFieldsConfigService} from '../../../../../warehouse/primary-ds/ProClassFieldsConfigService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';
import {ProEntityLabelConfigService} from '../../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {PPropertyService} from '../../../../../warehouse/primary-ds/property/PPropertyService';
import {ProProjectService} from '../../../../../warehouse/primary-ds/ProProjectService';
import {ProPropertyLabelService} from '../../../../../warehouse/primary-ds/ProPropertyLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createInfTimePrimitive} from '../../../../helpers/atomic/inf-time-primitive.helper';
import {createProClassFieldConfig} from '../../../../helpers/atomic/pro-class-field-config.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {addInfoToProject, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {createProTextProperty} from '../../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../../helpers/meta/model.helper';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {InfTimePrimitiveMock} from '../../../../helpers/data/gvDB/InfTimePrimitiveMock';
import {ProClassFieldConfigMock} from '../../../../helpers/data/gvDB/ProClassFieldConfigMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../../helpers/data/gvDB/ProTextPropertyMock';
import {SysSystemTypeMock} from '../../../../helpers/data/gvDB/SysSystemTypeMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview, waitForEntityPreviewUntil} from '../../../../helpers/warehouse-helpers';
const pEntityFullTextStub: WarehouseStubs = {
    primaryDataServices: [
        PEntityService,
        PEdgeService,
        REdgeService,
        REntityService,
        ProClassFieldsConfigService,
        PPropertyService,
        ProProjectService,
        DfhPropertyLabelService,
        ProPropertyLabelService,
        ProEntityLabelConfigService,
        DfhOutgoingPropertyService,
        PClassService,
        DfhClassLabelService,
        ProClassLabelService
    ],
    aggDataServices: [
        // IdentifyingPropertyService,
        PClassFieldLabelService,
        PEntityLabelService,
        REntityLabelService,
        PClassLabelService,
        PEntityFullTextService,
        EntityPreviewService
    ],
}
/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityFullTextService', function () {
    let wh: Warehouse;
    let s: PEntityFullTextService;
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(15000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(pEntityFullTextStub)
        wh = injector.get(Warehouse)
        s = injector.get(PEntityFullTextService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create full text of naming', async () => {
        const {naming, project} = await PEntityFullText.createNamingMock();

        const result = await waitForEntityPreviewUntil(wh, (item) => {
            // console.log(item)
            return item.pk_entity === naming.pk_entity
                && item.fk_project === project.pk_entity
                && item.full_text === `Appellation in a language (time-indexed) – refers to name: 'Jack the foo'`
        })

        expect(result).not.to.be.undefined();
    })

    it('should create full text of naming with person', async () => {
        const {naming, project} = await PEntityFullText.createNamingAndPersonMock();

        const expected = `Appellation in a language (time-indexed) – refers to name: 'Jack the foo', is appellation for language of: 'Jack the foo'`

        await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {full_text: {eq: expected}},
        ])

    })

    // it('should create incoming property label of person "has appellations"', async () => {
    //     const {project, hasAppePropLabel} = await createNamingAndPersonMock();
    //     const expected = hasAppePropLabel.string

    //     const result = await waitUntilSatisfy(wh.agg.pClassFieldLabel.afterPut$, (item) => {
    //         return item.key.fkProject === project.pk_entity
    //             && item.key.fkClass === DfhApiClassMock.EN_21_PERSON.dfh_pk_class
    //             && item.key.fkProperty === 1111
    //             && item.key.isOutgoing === false
    //             && item.val === expected
    //     })
    //     expect(result.val).to.equal(expected)

    // })
    it('should create full text of person', async () => {
        const {person, project} = await PEntityFullText.createNamingAndPersonMock();

        const expected = `Person – has appellations: 'Jack the foo'`

        const id: PEntityId = {
            pkEntity: person.pk_entity ?? -1,
            fkProject: project.pk_entity ?? -1
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
        const {person, project} = await PEntityFullText.createNamingAndPersonMock();

        let expected = `Person – has appellations: 'Jack the foo'`
        const id: PEntityId = {
            pkEntity: person.pk_entity ?? -1,
            fkProject: project.pk_entity ?? -1
        }
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => {
                return val?.fullText === expected
            }
        })

        await createProTextProperty({
            fk_dfh_class: 21,
            fk_project: ProProjectMock.PROJECT_1.pk_entity,
            fk_language: ProProjectMock.PROJECT_1.fk_language,
            fk_system_type: SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL.pk_entity,
            string: 'Human'
        })
        expected = `Human – has appellations: 'Jack the foo'`
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx(id),
            compare: (val) => {
                return val?.fullText === expected
            }
        })

    })

    it('should delete entity full text from index when entity is removed from project', async () => {
        const {naming, namingProjRel, project} = await PEntityFullText.createNamingMock();
        const id: PEntityId = {
            pkEntity: naming.pk_entity ?? -1,
            fkProject: project.pk_entity ?? -1
        }
        const result = await waitForEntityPreviewUntil(wh, (item) => {
            return item.pk_entity === naming.pk_entity
                && item.fk_project === project.pk_entity
                && item.full_text === `Appellation in a language (time-indexed) – refers to name: 'Jack the foo'`
        })

        expect(result).not.to.be.undefined();
        // remove person from the project
        await updateProInfoProjRel(namingProjRel.pk_entity ?? -1, {is_in_project: false})
        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdxWithTmsps(id),
            compare: (item) => !!item?.deleted
        })

    })


})

export namespace PEntityFullText {


    export async function createNamingAndPersonMock() {
        // NAMING
        const {naming, project, appellation, propertyRefersToName} = await createNamingMock();
        // PERSON
        const {person, classPerson, hasAppePropLabel} = await createPersonMock();
        return {project, appellation, naming, person, classPerson, hasAppePropLabel, propertyRefersToName};
    }

    export async function createPersonMock() {
        await createTypes()
        const classPerson = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
        await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
        const hasAppePropLabel = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_PERSON_HAS_APPELLATION)
        const person = await createInfPersistentItem(InfPersistentItemMock.PERSON_1);
        await addInfoToProject(person.pk_entity, ProProjectMock.PROJECT_1.pk_entity);
        const stmt = await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
        await addInfoToProject(stmt.pk_entity, ProProjectMock.PROJECT_1.pk_entity);
        return {person, classPerson, hasAppePropLabel};
    }

    export async function createNamingMock() {
        await createInfLanguage(InfLanguageMock.GERMAN);
        const project = await createProProject(ProProjectMock.PROJECT_1);
        await createProProject(ProProjectMock.DEFAULT_PROJECT);
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);
        await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
        const propertyRefersToName = await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME);

        await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
        await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)

        const naming = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1);
        const namingProjRel = await addInfoToProject(naming.pk_entity, ProProjectMock.PROJECT_1.pk_entity);

        const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
        const stmtToAppe = await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
        await addInfoToProject(stmtToAppe.pk_entity, ProProjectMock.PROJECT_1.pk_entity);

        await createInfTimePrimitive(InfTimePrimitiveMock.TP_1)

        const stmtToTp = await createInfStatement(InfStatementMock.NAMING_1_ONGOING_THROUGHOUT_TP_1)
        await addInfoToProject(stmtToTp.pk_entity, project.pk_entity)

        return {naming, namingProjRel, project, appellation, propertyRefersToName};
    }


}
