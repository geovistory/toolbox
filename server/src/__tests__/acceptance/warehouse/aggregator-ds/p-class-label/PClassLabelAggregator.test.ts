import assert from 'assert';
import {PClassLabelAggregator} from '../../../../../warehouse/aggregator-ds/class-label/p-class-label/PClassLabelAggregator';
import {PClassLabelProviders} from '../../../../../warehouse/aggregator-ds/class-label/p-class-label/PClassLabelProviders';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {ClassIdMock} from '../../../../helpers/data/whDb/ClassIdMock';
import {DfhClassLabelMock} from '../../../../helpers/data/whDb/DfhClassLabelMock';
import {ProClassLabelMock} from '../../../../helpers/data/whDb/ProClassLabelMock';
import {ProjectMock} from '../../../../helpers/data/whDb/ProjectMock';
import {setupWarehouseWithoutStarting} from '../../../../helpers/warehouse-helpers';


describe('PClassLabelAggregator', function () {
    let wh: Warehouse;
    let result: PClassLabelAggregator;

    before(async () => {
        wh = await setupWarehouseWithoutStarting()
    })

    beforeEach(async function () {
        await wh.clearWhDB()
    })
    after(async () => {
        await wh.stop()
    })

    it('should create class label from: de-project', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_DE_ID, DfhClassLabelMock.NAMING_DE_LABEL)
        await wh.prim.proClassLabel.put(ProClassLabelMock.PROJECT_DE_NAMING_DE_ID, ProClassLabelMock.PROJECT_DE_NAMING_DE_LABEL)
        const providers = new PClassLabelProviders(wh.dep.pClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new PClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.PROJECT_DE_NAMING_DE_LABEL)
    })


    it('should create class label from: de-geovistory', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_DE_ID, DfhClassLabelMock.NAMING_DE_LABEL)
        await wh.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_DE_ID, ProClassLabelMock.GV_NAMING_DE_LABEL)
        const providers = new PClassLabelProviders(wh.dep.pClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new PClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.GV_NAMING_DE_LABEL)
    })

    it('should create class label from: de-ontome', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_DE_ID, DfhClassLabelMock.NAMING_DE_LABEL)
        const providers = new PClassLabelProviders(wh.dep.pClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new PClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, DfhClassLabelMock.NAMING_DE_LABEL)
    })

    it('should create class label from: en-project', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await wh.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_EN_ID, ProClassLabelMock.GV_NAMING_EN_LABEL)
        await wh.prim.proClassLabel.put(ProClassLabelMock.PROJECT_DE_NAMING_EN_ID, ProClassLabelMock.PROJECT_DE_NAMING_EN_LABEL)
        const providers = new PClassLabelProviders(wh.dep.pClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new PClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.PROJECT_DE_NAMING_EN_LABEL)
    })

    it('should create class label from: en-geovistory', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await wh.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_EN_ID, ProClassLabelMock.GV_NAMING_EN_LABEL)
        const providers = new PClassLabelProviders(wh.dep.pClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new PClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.GV_NAMING_EN_LABEL)
    })

    it('should create class label from: en-ontome', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        const providers = new PClassLabelProviders(wh.dep.pClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new PClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, DfhClassLabelMock.NAMING_EN_LABEL)
    })


})
