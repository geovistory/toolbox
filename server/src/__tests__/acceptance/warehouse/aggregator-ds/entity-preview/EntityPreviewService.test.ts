/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {PClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/p-class-field-label/PClassFieldLabelService';
import {RClassFieldLabelService} from '../../../../../warehouse/aggregator-ds/class-field-label/r-class-field-label/RClassFieldLabelService';
import {PClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/p-class-label/PClassLabelService';
import {RClassLabelService} from '../../../../../warehouse/aggregator-ds/class-label/r-class-label/RClassLabelService';
import {PEntityClassLabelService} from '../../../../../warehouse/aggregator-ds/entity-class-label/p-entity-class-label/PEntityClassLabelService';
import {REntityClassLabelService} from '../../../../../warehouse/aggregator-ds/entity-class-label/r-entity-class-label/REntityClassLabelService';
import {PEntityFullTextService} from '../../../../../warehouse/aggregator-ds/entity-full-text/p-entity-full-text/PEntityFullTextService';
import {REntityFullTextService} from '../../../../../warehouse/aggregator-ds/entity-full-text/r-entity-full-text/REntityFullTextService';
import {PEntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {REntityLabelService} from '../../../../../warehouse/aggregator-ds/entity-label/r-entity-label/REntityLabelService';
import {EntityPreviewService} from '../../../../../warehouse/aggregator-ds/entity-preview/EntityPreviewService';
import {PEntityTimeSpanService} from '../../../../../warehouse/aggregator-ds/entity-time-span/p-entity-time-span/PEntityTimeSpanService';
import {REntityTimeSpanService} from '../../../../../warehouse/aggregator-ds/entity-time-span/r-entity-time-span/REntityTimeSpanService';
import {PEntityTypeService} from '../../../../../warehouse/aggregator-ds/entity-type/p-entity-type/PEntityTypeService';
import {REntityTypeService} from '../../../../../warehouse/aggregator-ds/entity-type/r-entity-type/REntityTypeService';
import {PClassService} from '../../../../../warehouse/primary-ds/class/PClassService';
import {RClassService} from '../../../../../warehouse/primary-ds/class/RClassService';
import {DfhClassHasTypePropertyService} from '../../../../../warehouse/primary-ds/DfhClassHasTypePropertyService';
import {DfhClassLabelService} from '../../../../../warehouse/primary-ds/DfhClassLabelService';
import {DfhOutgoingPropertyService} from '../../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {DfhPropertyLabelService} from '../../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {PEdgeService} from '../../../../../warehouse/primary-ds/edge/PEdgeService';
import {REdgeService} from '../../../../../warehouse/primary-ds/edge/REdgeService';
import {PEntityService} from '../../../../../warehouse/primary-ds/entity/PEntityService';
import {REntityService} from '../../../../../warehouse/primary-ds/entity/REntityService';
import {ProClassFieldsConfigService} from '../../../../../warehouse/primary-ds/ProClassFieldsConfigService';
import {ProClassLabelService} from '../../../../../warehouse/primary-ds/ProClassLabelService';
import {ProEntityLabelConfigService} from '../../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {PPropertyService} from '../../../../../warehouse/primary-ds/property/PPropertyService';
import {RPropertyService} from '../../../../../warehouse/primary-ds/property/RPropertyService';
import {ProProjectService} from '../../../../../warehouse/primary-ds/ProProjectService';
import {ProPropertyLabelService} from '../../../../../warehouse/primary-ds/ProPropertyLabelService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../../helpers/warehouse-helpers';
import {PEntityClassLabel} from '../p-entity-class-label/PEntityClassLabelService.test';
import {PEntityFullText} from '../p-entity-full-text/PEntityFullTextService.test';
import {PEntityLabel} from '../p-entity-label/PEntityLabelService.test';
import {PEntityTimeSpanMock} from '../p-entity-time-span/PEntityTimeSpanService.test';
import {PEntityTypeMock} from '../p-entity-type/PEntityTypeService.test';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';

/**
 * Testing whole stack from postgres to warehouse
 */
describe('EntityPreviewService', function () {
    let wh: Warehouse;
    let s: EntityPreviewService;
    describe('EntityLabel', function () {

        before(async function () {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.timeout(50000); // A very long environment setup.
            const injector = await setupCleanAndStartWarehouse({
                primaryDataServices: [
                    PEntityService,
                    REntityService,
                    REdgeService,
                    PEdgeService,
                    DfhOutgoingPropertyService,
                    ProEntityLabelConfigService,
                ],
                aggDataServices: [
                    // IdentifyingPropertyService,
                    PEntityLabelService,
                    REntityLabelService,
                    EntityPreviewService
                ]
            })
            wh = injector.get(Warehouse)
            s = injector.get(EntityPreviewService)
        })
        beforeEach(async () => {
            await cleanDb()
            await truncateWarehouseTables(wh)
        })
        after(async function () {
            await stopWarehouse(wh)
        })

        it('should create project entity label', async () => {
            const project = await PEntityLabel.createProject();
            const {naming, appellation} = await PEntityLabel.createNamingMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: naming.pk_entity ?? -1,
                    fkProject: project.pk_entity ?? -1
                }),
                compare: (val) => val?.entityLabel === appellation.string
            })
        })

        it('should create repo entity label', async () => {
            await PEntityLabel.createProject();
            const {naming, appellation} = await PEntityLabel.createNamingMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: naming.pk_entity ?? -1,
                    fkProject: 0
                }),
                compare: (val) => val?.entityLabel === appellation.string
            })
        })
    })

    describe('EntityClassLabel', function () {

        before(async function () {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.timeout(50000); // A very long environment setup.
            const injector = await setupCleanAndStartWarehouse({
                primaryDataServices: [
                    REntityService,
                    PEntityService,
                    PClassService,
                    RClassService,
                    ProProjectService,
                    DfhClassLabelService,
                    ProClassLabelService,
                ],
                aggDataServices: [
                    PClassLabelService,
                    RClassLabelService,
                    PEntityClassLabelService,
                    REntityClassLabelService,
                    EntityPreviewService
                ]
            })
            wh = injector.get(Warehouse)
            s = injector.get(EntityPreviewService)
        })
        beforeEach(async () => {
            await cleanDb()
            await truncateWarehouseTables(wh)
        })
        after(async function () {
            await stopWarehouse(wh)
        })

        it('should create project entity class label', async () => {
            const {prel, pers, cla} = await PEntityClassLabel.createBasicMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: pers.pk_entity ?? -1,
                    fkProject: prel.fk_project ?? -1
                }),
                compare: (val) => val?.classLabel === cla.dfh_class_label
            })
        })

        it('should create repo entity class label', async () => {
            const {pers, cla} = await PEntityClassLabel.createBasicMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: pers.pk_entity ?? -1,
                    fkProject: 0
                }),
                compare: (val) => val?.classLabel === cla.dfh_class_label
            })
        })
    })
    describe('EntityTypeLabel', function () {

        before(async function () {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.timeout(50000); // A very long environment setup.
            const injector = await setupCleanAndStartWarehouse({
                primaryDataServices: [
                    DfhOutgoingPropertyService,
                    ProEntityLabelConfigService,
                    PEntityService,
                    PEdgeService,
                    REntityService,
                    REdgeService,
                    DfhClassHasTypePropertyService
                ],
                aggDataServices: [
                    // IdentifyingPropertyService,
                    PEntityLabelService,
                    REntityLabelService,
                    REntityTypeService,
                    PEntityTypeService,
                    EntityPreviewService
                ]
            })
            wh = injector.get(Warehouse)
            s = injector.get(EntityPreviewService)
        })
        beforeEach(async () => {
            await cleanDb()
            await truncateWarehouseTables(wh)
        })
        after(async function () {
            await stopWarehouse(wh)
        })

        it('should create project entity type label', async () => {
            const {madrid, project, cityTypeProjRel, cityTypeAppe} = await PEntityTypeMock.createMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: madrid.pk_entity ?? -1,
                    fkProject: project.pk_entity ?? -1
                }),
                compare: (val) => {
                    return val?.fkType === cityTypeProjRel.fk_entity
                        && val?.typeLabel === cityTypeAppe.string
                }
            })
        })

        it('should create repo entity type label', async () => {
            const {madrid, cityTypeProjRel, cityTypeAppe} = await PEntityTypeMock.createMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: madrid.pk_entity ?? -1,
                    fkProject: 0
                }),
                compare: (val) => {
                    return val?.fkType === cityTypeProjRel.fk_entity
                        && val?.typeLabel === cityTypeAppe.string
                }
            })
        })
    })
    describe('EntityTimeSpan', function () {

        before(async function () {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.timeout(50000); // A very long environment setup.
            const injector = await setupCleanAndStartWarehouse({
                primaryDataServices: [
                    REntityService,
                    PEntityService,
                    PEdgeService,
                    REdgeService,
                ],
                aggDataServices: [
                    PEntityTimeSpanService,
                    REntityTimeSpanService,
                    EntityPreviewService
                ]
            })
            wh = injector.get(Warehouse)
            s = injector.get(EntityPreviewService)
        })
        beforeEach(async () => {
            await cleanDb()
            await truncateWarehouseTables(wh)
        })
        after(async function () {
            await stopWarehouse(wh)
        })

        it('should create project entity time span', async () => {
            const {shipVoyage, project} = await PEntityTimeSpanMock.createMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: shipVoyage.pk_entity ?? -1,
                    fkProject: project.pk_entity ?? -1,
                }),
                compare: (val) => !!val?.timeSpan?.p82
            })
        })

        it('should create repo entity time span', async () => {
            const {shipVoyage} = await PEntityTimeSpanMock.createMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: shipVoyage.pk_entity ?? -1,
                    fkProject: 0,
                }),
                compare: (val) => !!val?.timeSpan?.p82
            })
        })
    })
    describe('EntityFullText', function () {

        before(async function () {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.timeout(50000); // A very long environment setup.
            const injector = await setupCleanAndStartWarehouse({
                primaryDataServices: [
                    PEntityService,
                    PEdgeService,
                    REdgeService,
                    REntityService,
                    ProClassFieldsConfigService,
                    PPropertyService,
                    RPropertyService,
                    ProProjectService,
                    DfhPropertyLabelService,
                    ProPropertyLabelService,
                    ProEntityLabelConfigService,
                    DfhOutgoingPropertyService,
                    PClassService,
                    RClassService,
                    DfhClassLabelService,
                    ProClassLabelService
                ],
                aggDataServices: [
                    // IdentifyingPropertyService,
                    PClassFieldLabelService,
                    RClassFieldLabelService,
                    PEntityLabelService,
                    REntityLabelService,
                    PClassLabelService,
                    RClassLabelService,
                    PEntityFullTextService,
                    REntityFullTextService,
                    EntityPreviewService
                ],
            })
            wh = injector.get(Warehouse)
            s = injector.get(EntityPreviewService)
        })
        beforeEach(async () => {
            await cleanDb()
            await truncateWarehouseTables(wh)
        })
        after(async function () {
            await stopWarehouse(wh)
        })

        it('should create project entity full text', async () => {
            const {naming, project} = await PEntityFullText.createNamingMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: naming.pk_entity ?? -1,
                    fkProject: project.pk_entity ?? -1
                }),
                compare: (val) => {
                    return val?.fullText === `Appellation in a language (time-indexed) – refers to name: 'Jack the foo'`
                        && val?.entityLabel === 'Jack the foo'
                }
            })
        })

        it('should create repo entity full text', async () => {
            const {naming} = await PEntityFullText.createNamingMock();

            await searchUntilSatisfy({
                notifier$: s.afterChange$,
                getFn: () => s.index.getFromIdx({
                    pkEntity: naming.pk_entity ?? -1,
                    fkProject: 0
                }),
                compare: (val) => {
                    return val?.fullText === `Appellation in a language (time-indexed) – refers to name: 'Jack the foo'`
                        && val?.entityLabel === 'Jack the foo'
                }
            })
        })
    })
})
