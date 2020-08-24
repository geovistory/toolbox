import assert from 'assert';
import {ClassLabelAggregator} from '../../../../../warehouse/aggregator-ds/class-label/ClassLabelAggregator';
import {ClassLabelProviders} from '../../../../../warehouse/aggregator-ds/class-label/ClassLabelProviders';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {ClassIdMock} from '../../../../helpers/data/whDb/ClassIdMock';
import {DfhClassLabelMock} from '../../../../helpers/data/whDb/DfhClassLabelMock';
import {ProClassLabelMock} from '../../../../helpers/data/whDb/ProClassLabelMock';
import {ProjectMock} from '../../../../helpers/data/whDb/ProjectMock';
import {setupWarehouseAndConnect} from '../../../../helpers/warehouse-helpers';


describe('ClassLabelAggregator', function () {
    let main: Warehouse;
    let result: ClassLabelAggregator;

    before(async () => {
        main = await setupWarehouseAndConnect()
    })

    beforeEach(async function () {
        await main.clearDB()
    })

    it('should create class label from: de-project', async () => {
        await main.prim.project.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_DE_ID, DfhClassLabelMock.NAMING_DE_LABEL)
        await main.prim.proClassLabel.put(ProClassLabelMock.PROJECT_DE_NAMING_DE_ID, ProClassLabelMock.PROJECT_DE_NAMING_DE_LABEL)
        const providers = new ClassLabelProviders(main.dep.classLabel, ClassIdMock.NAMING_ID)
        const aggregator = new ClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.PROJECT_DE_NAMING_DE_LABEL)
    })


    it('should create class label from: de-geovistory', async () => {
        await main.prim.project.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_DE_ID, DfhClassLabelMock.NAMING_DE_LABEL)
        await main.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_DE_ID, ProClassLabelMock.GV_NAMING_DE_LABEL)
        const providers = new ClassLabelProviders(main.dep.classLabel, ClassIdMock.NAMING_ID)
        const aggregator = new ClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.GV_NAMING_DE_LABEL)
    })

    it('should create class label from: de-ontome', async () => {
        await main.prim.project.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_DE_ID, DfhClassLabelMock.NAMING_DE_LABEL)
        const providers = new ClassLabelProviders(main.dep.classLabel, ClassIdMock.NAMING_ID)
        const aggregator = new ClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, DfhClassLabelMock.NAMING_DE_LABEL)
    })

    it('should create class label from: en-project', async () => {
        await main.prim.project.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await main.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_EN_ID, ProClassLabelMock.GV_NAMING_EN_LABEL)
        await main.prim.proClassLabel.put(ProClassLabelMock.PROJECT_DE_NAMING_EN_ID, ProClassLabelMock.PROJECT_DE_NAMING_EN_LABEL)
        const providers = new ClassLabelProviders(main.dep.classLabel, ClassIdMock.NAMING_ID)
        const aggregator = new ClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.PROJECT_DE_NAMING_EN_LABEL)
    })

    it('should create class label from: en-geovistory', async () => {
        await main.prim.project.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await main.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_EN_ID, ProClassLabelMock.GV_NAMING_EN_LABEL)
        const providers = new ClassLabelProviders(main.dep.classLabel, ClassIdMock.NAMING_ID)
        const aggregator = new ClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.GV_NAMING_EN_LABEL)
    })

    it('should create class label from: en-ontome', async () => {
        await main.prim.project.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await main.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        const providers = new ClassLabelProviders(main.dep.classLabel, ClassIdMock.NAMING_ID)
        const aggregator = new ClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, DfhClassLabelMock.NAMING_EN_LABEL)
    })


})
