import assert from 'assert';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {ClassIdMock} from '../../../../helpers/data/whDb/ClassIdMock';
import {DfhClassLabelMock} from '../../../../helpers/data/whDb/DfhClassLabelMock';
import {ProClassLabelMock} from '../../../../helpers/data/whDb/ProClassLabelMock';
import {ProjectMock} from '../../../../helpers/data/whDb/ProjectMock';
import {setupWarehouseWithoutStarting} from '../../../../helpers/warehouse-helpers';
import {RClassLabelAggregator} from '../../../../../warehouse/aggregator-ds/class-label/r-class-label/RClassLabelAggregator';
import {RClassLabelProviders} from '../../../../../warehouse/aggregator-ds/class-label/r-class-label/RClassLabelProviders';


describe('RClassLabelAggregator', function () {
    let wh: Warehouse;
    let result: RClassLabelAggregator;

    before(async () => {
        wh = await setupWarehouseWithoutStarting()
    })

    beforeEach(async function () {
        await wh.clearWhDB()
    })






    it('should create class label from: en-geovistory', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        await wh.prim.proClassLabel.put(ProClassLabelMock.GV_NAMING_EN_ID, ProClassLabelMock.GV_NAMING_EN_LABEL)
        const providers = new RClassLabelProviders(wh.dep.rClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new RClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, ProClassLabelMock.GV_NAMING_EN_LABEL)
    })

    it('should create class label from: en-ontome', async () => {
        await wh.prim.proProject.put(ProjectMock.PROJECT_DE_ID, ProjectMock.PROJECT_DE_VAL)
        await wh.prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
        const providers = new RClassLabelProviders(wh.dep.rClassLabel, ClassIdMock.NAMING_ID)
        const aggregator = new RClassLabelAggregator(providers, ClassIdMock.NAMING_ID)
        result = await aggregator.create()
        assert.equal(result.classLabel, DfhClassLabelMock.NAMING_EN_LABEL)
    })


})
