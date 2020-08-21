import assert from 'assert';
import {EntityLabelAggregator} from '../../../../../warehouse/aggregator-ds/entity-label/EntityLabelAggregator';
import {EntityLabelProviders} from '../../../../../warehouse/aggregator-ds/entity-label/EntityLabelPoviders';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {EdgeMock} from '../../../../helpers/data/whDb/EdgeMock';
import {EntityLabelConfigMock} from '../../../../helpers/data/whDb/EntityLabelConfigMock';
import {EntityMock} from '../../../../helpers/data/whDb/EntityMock';
import {setupWarehouse} from '../../../../helpers/warehouse-helpers';

describe('EntityLabelAggregator', function () {
    let main: Warehouse;
    let result: EntityLabelAggregator;

    before(async () => {
        main = await setupWarehouse()
    })

    beforeEach(async function () {
        await main.clearDB()

    })

    it('should create entity label of naming', async () => {
        await main.prim.createEntity(EntityMock.NAME_1_ID, EntityMock.NAME_1)
        await main.prim.indexateEdges([EdgeMock.EDGE_NAME_1_TO_APPE])
        await main.prim.createEntityLabelConfig(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)

        const providers = new EntityLabelProviders(main.dep.entityLabel, EntityMock.NAME_1_ID)
        const aggregator = new EntityLabelAggregator(providers, EntityMock.NAME_1_ID)
        result = await aggregator.create()
        assert.equal(result.entityLabel, 'Jack the Foo')
    })


})
