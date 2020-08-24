import assert from 'assert';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {EdgeMock} from '../../../../helpers/data/whDb/EdgeMock';
import {EntityLabelConfigMock} from '../../../../helpers/data/whDb/EntityLabelConfigMock';
import {EntityMock} from '../../../../helpers/data/whDb/EntityMock';
import {setupWarehouseAndConnect, wait} from '../../../../helpers/warehouse-helpers';

describe('EntityLabelService', function () {
    let main: Warehouse;

    before(async () => {
        main = await setupWarehouseAndConnect()
    })
    beforeEach(async function () {
        try {

            await main.clearDB()
            // add minimal data
            await main.prim.createEntity(EntityMock.NAME_1_ID, EntityMock.NAME_1)
            await main.prim.createEntity(EntityMock.PERS_1_ID, EntityMock.PERS_1)
            await main.prim.indexateEdges([EdgeMock.EDGE_NAME_1_TO_APPE, EdgeMock.EDGE_NAME_1_TO_PERSON])
            await main.prim.entityLabelConfig.put(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)
            await main.prim.entityLabelConfig.put(EntityLabelConfigMock.PERSON_ID, EntityLabelConfigMock.PERSON_1_STMT_VAL)
        } catch (error) {
            console.log(error)
        }
    })
    it('should create entity label of person', async () => {
        await main.agg.entityLabel.updater.addItemsToQueue([
            EntityMock.NAME_1_ID,
            EntityMock.PERS_1_ID,
        ])
        await main.agg.entityLabel.updater.runOneCycle()
        await wait(20);
        await main.agg.entityLabel.updater.runOneCycle()
        const result = await main.agg.entityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
        assert.equal(result, 'Jack the Foo')
    })
    it('should create entity label of person with recursive function', async () => {
        await main.agg.entityLabel.updater.addItemsToQueue([
            EntityMock.NAME_1_ID,
            EntityMock.PERS_1_ID,
        ])
        await main.agg.entityLabel.updater.startCylcling()
        const result = await main.agg.entityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
        assert.equal(result, 'Jack the Foo')
    })
    it('should create entity label of person with default start', async () => {
        await main.initUpdateRequests()
        await main.agg.start()
        const result = await main.agg.entityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
        assert.equal(result, 'Jack the Foo')
    })
})
