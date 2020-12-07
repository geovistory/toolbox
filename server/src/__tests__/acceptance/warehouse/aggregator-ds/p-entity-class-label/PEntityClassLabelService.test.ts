/* eslint-disable @typescript-eslint/camelcase */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {PEntityClassLabelService} from '../../../../../warehouse/aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
import {PClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/p-class-label/PClassLabelService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {PClassService} from '../../../../../warehouse/primary-ds/class/PClassService';
import {ProProjectService} from '../../../../../warehouse/primary-ds/ProProjectService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';

const rEntityClassLabelStub: WarehouseStubs = {
    primaryDataServices: [
        PEntityService,
        PClassService,
        ProProjectService,
        DfhClassLabelService,
        ProClassLabelService,
    ],
    aggDataServices: [
        PClassLabelService,
        PEntityClassLabelService
    ]
}
describe('PEntityClassLabelService', function () {

    let wh: Warehouse;
    let s: PEntityClassLabelService
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(rEntityClassLabelStub)
        wh = injector.get(Warehouse)
        s = injector.get(PEntityClassLabelService)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })

    it('should create entity class label of Person', async () => {
        const {prel, pers, cla} = await createBasicMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: pers.pk_entity}},
            {fk_project: {eq: prel.fk_project}},
            {class_label: {eq: cla.dfh_class_label}},
        ])
        expect(result.class_label).to.equal('Person')
    })


    it('should delete entity class label from index when entity is removed from project', async () => {
        const {prel, pers, cla} = await createBasicMock();

        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: pers.pk_entity}},
            {fk_project: {eq: prel.fk_project}},
            {class_label: {eq: cla.dfh_class_label}},
        ])
        expect(result.class_label).to.equal('Person')
        // remove person from the project
        await updateProInfoProjRel(prel.pk_entity ?? -1, {is_in_project: false})

        await searchUntilSatisfy({
            notifier$: s.afterChange$,
            getFn: () => s.index.getFromIdxWithTmsps({pkEntity: pers.pk_entity ?? -1, fkProject: prel.fk_project ?? -1}),
            compare: (val) => !!val?.deleted

        })
    })


})
async function createBasicMock() {
    // CLASS + LABEL
    await createInfLanguage(InfLanguageMock.GERMAN);
    await createProProject(ProProjectMock.PROJECT_1);
    await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    const cla = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    // PERSON
    const pers = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    const prel = await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
    return {prel, pers, cla}
}
