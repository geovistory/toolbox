/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import 'reflect-metadata';
import {EntityLabel, ENTITY_LABEL_MAX_LENGTH} from '../../../../../warehouse/aggregator-ds/entity-label/entity-label.commons';
import {PEntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {DfhOutgoingPropertyService} from '../../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {PEdgeService} from '../../../../../warehouse/primary-ds/edge/PEdgeService';
import {PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
import {ProEntityLabelConfigService} from '../../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfAppellation} from '../../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {InfAppellationMock} from '../../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview, waitForEntityPreviewUntil} from '../../../../helpers/warehouse-helpers';
import {createUnion2Mock} from '../r-entity-label/REntityLabelService.test';
export const pEntityLabelStub: WarehouseStubs = {
    primaryDataServices: [
        DfhOutgoingPropertyService,
        ProEntityLabelConfigService,
        PEntityService,
        PEdgeService
    ],
    aggDataServices: [
        // IdentifyingPropertyService,
        PEntityLabelService,
        EntityPreviewService
    ]
}
/**
 * Testing whole stack from postgres to warehouse
 */
describe('PEntityLabelService', function () {
    let wh: Warehouse;
    let s: PEntityLabelService
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(pEntityLabelStub)
        wh = injector.get(Warehouse)
        s = injector.get(PEntityLabelService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create entity label of naming', async () => {
        const project = await PEntityLabel.createProject();
        const {naming, appellation} = await PEntityLabel.createNamingMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should create entity label of person', async () => {
        const project = await PEntityLabel.createProject();
        const {person, appellation} = await PEntityLabel.createNamingAndPersonMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })
    it('should update entity label of person after removing stmt 1111 from project', async () => {
        const project = await PEntityLabel.createProject();
        const {person, appellation} = await PEntityLabel.createNamingAndPersonMock();
        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)

        await updateProInfoProjRel(
            ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1
            , {
                ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
                is_in_project: false
            })

        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: '(no label)'}},
        ])
        expect(result.entity_label).to.equal('(no label)')
    })

    it('should create entity label of naming and add person', async () => {
        const project = await PEntityLabel.createProject();
        const {naming, appellation} = await PEntityLabel.createNamingMock();
        let result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)

        const person = await PEntityLabel.createPersonMock();
        result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: person.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result.entity_label).to.equal(appellation.string)
    })

    it('should create entity label of Union with 3 label parts', async () => {
        const project = await PEntityLabel.createProject();
        await PEntityLabel.createNamingMock();
        await PEntityLabel.createPersonMock();
        const {union} = await createUnion2Mock()
        const result = await waitForEntityPreviewUntil(wh, (item) => {
            // console.log(item.entity_label)
            return item.pk_entity === union.pk_entity
                && item.fk_project === project.pk_entity
                && item.entity_label === '(no label), Jack the foo, (no label)'
        })
        expect(result)
    })

    it('should create entity label of birth infinit label', async () => {
        const project = await PEntityLabel.createProject();
        await PEntityLabel.createNamingMock();
        await PEntityLabel.createPersonMock();
        const {birth} = await EntityLabel.createInfinitLabel()

        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdx({pkEntity: birth.pk_entity ?? -1, fkProject: project.pk_entity ?? -1}),
            compare: (item) => {
                console.log(item?.entityLabel)
                console.log(item?.entityLabel?.length)
                return item?.entityLabel?.length === ENTITY_LABEL_MAX_LENGTH
            }
        })

    })


    // it('should create entity label of Birth – E67 (-- with identifying property)', async () => {
    //     const project = await createProject();
    //     const {appellation} = await createNamingMock();
    //     await createPersonMock();
    //     const birth = await createBirthMock()
    //     const result = await waitForEntityPreviewUntil(wh, (item) => {
    //         return item.pk_entity === birth.pk_entity
    //             && item.fk_project === project.pk_entity
    //             && item.entity_label === appellation.string
    //     })
    //     expect(result)
    // })

    // it('should create entity label of Union – C9 (-- with identifying property)', async () => {

    //     const project = await createProject();
    //     const {appellation} = await createNamingMock();
    //     await createPersonMock();
    //     const union = await createUnionMock()
    //     const result = await waitForEntityPreviewUntil(wh, (item) => {
    //         return item.pk_entity === union.pk_entity
    //             && item.fk_project === project.pk_entity
    //             && item.entity_label === appellation.string
    //     })
    //     expect(result)
    // })

    it('should delete entity label from index when entity is removed from project', async () => {
        const project = await PEntityLabel.createProject();
        const {naming, namingProRel, appellation} = await PEntityLabel.createNamingMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: naming.pk_entity}},
            {fk_project: {eq: project.pk_entity}},
            {entity_label: {eq: appellation.string}},
        ])
        expect(result)

        await updateProInfoProjRel(namingProRel.pk_entity ?? -1, {is_in_project: false})

        const item = await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdxWithTmsps({pkEntity: naming.pk_entity ?? -1, fkProject: project.pk_entity ?? -1}),
            compare: (row) => {
                // console.log('test',JSON.stringify(row))
                return (!!row?.deleted)
            }
        })

        expect(item?.deleted).not.to.be.undefined()
    })
})



export namespace PEntityLabel {

    export async function createNamingAndPersonMock() {
        // NAMING
        const {naming, appellation} = await createNamingMock();
        // PERSON
        const person = await createPersonMock();
        return {naming, person, appellation};
    }

    export async function createPersonMock() {
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
        const person = await createInfPersistentItem(InfPersistentItemMock.PERSON_1);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1);
        return person;
    }

    export async function createProject() {
        await createInfLanguage(InfLanguageMock.GERMAN);
        const project = await createProProject(ProProjectMock.PROJECT_1);
        await createProProject(ProProjectMock.DEFAULT_PROJECT);
        return project
    }

    export async function createNamingMock() {
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);

        // TeEn
        const naming = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1);
        const namingProRel = await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1);

        const appellation = await createInfAppellation(InfAppellationMock.JACK_THE_FOO);
        await createInfStatement(InfStatementMock.NAME_1_TO_APPE);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE);

        await createInfStatement(InfStatementMock.NAME_1_TO_PERSON);
        await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON);
        return {naming, namingProRel, appellation};
    }



}

