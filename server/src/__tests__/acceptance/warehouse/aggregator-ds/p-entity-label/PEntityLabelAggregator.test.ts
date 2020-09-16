import assert from 'assert';
import {PEntityLabelAggregator} from '../../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelAggregator';
import {PEntityLabelProviders} from '../../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelPoviders';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {EdgeMock} from '../../../../helpers/data/whDb/EdgeMock';
import {EntityLabelConfigMock} from '../../../../helpers/data/whDb/EntityLabelConfigMock';
import {EntityMock} from '../../../../helpers/data/whDb/EntityMock';
import {setupWarehouseWithoutStarting} from '../../../../helpers/warehouse-helpers';

describe('PEntityLabelAggregator', function () {
    let wh: Warehouse;
    let result: PEntityLabelAggregator;

    before(async () => {
        wh = await setupWarehouseWithoutStarting()
    })

    beforeEach(async function () {
        await wh.clearWhDB()

    })
    after(async () => {
        await wh.stop()
    })


    it('should create entity label of naming', async () => {
        await wh.prim.createEntity(EntityMock.NAME_1_ID, EntityMock.NAME_1)
        await wh.prim.indexateEdges([EdgeMock.EDGE_NAME_1_TO_APPE])
        await wh.prim.createEntityLabelConfig(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)

        const providers = new PEntityLabelProviders(wh.dep.pEntityLabel, EntityMock.NAME_1_ID)
        const aggregator = new PEntityLabelAggregator(providers, EntityMock.NAME_1_ID)
        result = await aggregator.create()
        assert.equal(result.entityLabel, 'Jack the Foo')
    })


})
