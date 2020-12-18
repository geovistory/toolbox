/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../../helpers/atomic/inf-persistent-item.helper';
import {createProDfhProfileProjRel} from '../../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProInfoProjRel} from '../../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {DfhApiClassMock} from '../../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../../helpers/data/gvDB/InfPersistentItemMock';
import {ProDfhProfileProjRelMock} from '../../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProInfoProjRelMock} from '../../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview} from '../../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../../warehouse/createWarehouse';
import {REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {RClassService} from '../../../../../warehouse/primary-ds/class/RClassService';
import {ProProjectService} from '../../../../../warehouse/primary-ds/ProProjectService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';
import {RClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/r-class-label/RClassLabelService';
import {REntityClassLabelService} from '../../../../../warehouse/aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';

const rEntityClassLabelStub: WarehouseStubs = {
    primaryDataServices: [
        REntityService,
        RClassService,
        ProProjectService,
        DfhClassLabelService,
        ProClassLabelService,
    ],
    aggDataServices: [
        RClassLabelService,
        REntityClassLabelService,
        EntityPreviewService
    ]
}
describe('REntityClassLabelService', function () {

    let wh: Warehouse;
    before(async function () {
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        this.timeout(5000); // A very long environment setup.
        const injector = await setupCleanAndStartWarehouse(rEntityClassLabelStub)
        wh = injector.get(Warehouse)
    })
    beforeEach(async () => {
        await cleanDb()
        await truncateWarehouseTables(wh)
    })
    after(async function () {
        await stopWarehouse(wh)
    })
    it('should create entity class label of Person', async () => {
        const {pers, cla} = await createBasicMock();
        const result = await waitForEntityPreview(wh, [
            {pk_entity: {eq: pers.pk_entity}},
            {fk_project: {eq: null}},
            {class_label: {eq: cla.dfh_class_label}},
        ])
        expect(result.class_label).to.equal('Person')
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
