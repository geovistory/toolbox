import assert from 'assert';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {EdgeMock} from '../../../../helpers/data/whDb/EdgeMock';
import {EntityLabelConfigMock} from '../../../../helpers/data/whDb/EntityLabelConfigMock';
import {EntityMock} from '../../../../helpers/data/whDb/EntityMock';
import {setupWarehouseWithoutStarting, wait} from '../../../../helpers/warehouse-helpers';

describe('PEntityLabelService', function () {
    let wh: Warehouse;

    before(async () => {
        wh = await setupWarehouseWithoutStarting()
    })
    beforeEach(async function () {
        try {

            await wh.clearDB()
            // add minimal data
            await wh.prim.createEntity(EntityMock.NAME_1_ID, EntityMock.NAME_1)
            await wh.prim.createEntity(EntityMock.PERS_1_ID, EntityMock.PERS_1)
            await wh.prim.indexateEdges([EdgeMock.EDGE_NAME_1_TO_APPE, EdgeMock.EDGE_NAME_1_TO_PERSON])
            await wh.prim.entityLabelConfig.put(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)
            await wh.prim.entityLabelConfig.put(EntityLabelConfigMock.PERSON_ID, EntityLabelConfigMock.PERSON_1_STMT_VAL)
        } catch (error) {
            console.log(error)
        }
    })
    it('should create entity label of person', async () => {
        await wh.agg.pEntityLabel.updater.addItemsToQueue([
            EntityMock.NAME_1_ID,
            EntityMock.PERS_1_ID,
        ])
        await wh.agg.pEntityLabel.updater.runOneCycle()
        await wait(20);
        await wh.agg.pEntityLabel.updater.runOneCycle()
        const result = await wh.agg.pEntityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
        assert.equal(result, 'Jack the Foo')
    })
    it('should create entity label of person with recursive function', async () => {
        await wh.agg.pEntityLabel.updater.addItemsToQueue([
            EntityMock.NAME_1_ID,
            EntityMock.PERS_1_ID,
        ])
        await wh.agg.pEntityLabel.updater.startCylcling()
        const result = await wh.agg.pEntityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
        assert.equal(result, 'Jack the Foo')
    })
    it('should create entity label of person with default start', async () => {
        await wh.agg.pEntityLabel.updater.addItemsToQueue([
            EntityMock.NAME_1_ID,
            EntityMock.PERS_1_ID,
        ])
        await wh.agg.start()
        const result = await wh.agg.pEntityLabel.index.getFromIdx(EntityMock.PERS_1_ID)
        assert.equal(result, 'Jack the Foo')
    })
})
