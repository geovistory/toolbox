import assert from 'assert';
import { EntityLabelService } from '../../../../warehouse/aggregator-ds/entity-label/EntityLabelService';
import { DependencyIndex } from '../../../../warehouse/base/classes/DependencyIndex';
import { entityIdToString, stringToEntityId } from '../../../../warehouse/base/functions';
import { EntityId } from '../../../../warehouse/primary-ds/EntityService';
import { Warehouse } from '../../../../warehouse/Warehouse';



const main = new Warehouse()
const stub1 = new EntityLabelService(main)
const stub2 = new EntityLabelService(main)


const receiver1 = { fkProject: 1, pkEntity: 100 }
const provider1 = { fkProject: 1, pkEntity: 500 }
const provider2 = { fkProject: 1, pkEntity: 501 }

const receiver2 = { fkProject: 1, pkEntity: 101 }

describe('DependencyIndex', function () {
    let idx: DependencyIndex<EntityId, string, EntityId, string>
    before(async () => {
        idx = new DependencyIndex(
            stub1,
            stub2,
            entityIdToString,
            stringToEntityId,
            entityIdToString,
            stringToEntityId,
        )

    })
    beforeEach(async function () {
        await idx.clearIdx()
        await idx.addProvider(receiver1, provider1)
        await idx.addProvider(receiver1, provider2)
        await idx.addProvider(receiver2, provider2)
    })
    it('should getProviders', async () => {
        const result = await idx.getProviders(receiver1)
        assert.deepStrictEqual(result, [provider1, provider2])
    })

    it('should getProviderMap', async () => {
        const result = await idx.getProviderMap(receiver1)
        assert.deepStrictEqual(result, {
            [entityIdToString(provider1)]: true,
            [entityIdToString(provider2)]: true,
        })
    })
    it('should getReceivers', async () => {
        let result = await idx.getReceivers(provider1)
        assert.deepStrictEqual(result, [receiver1])
        result = await idx.getReceivers(provider2)
        assert.deepStrictEqual(result, [receiver1, receiver2])
    })

    it('should removeProviderByString', async () => {
        await idx.removeProviderByString(entityIdToString(receiver1), entityIdToString(provider1))
        const result = await idx.getProviders(receiver1)
        assert.deepStrictEqual(result, [provider2])
    })

    it('should removeProvider', async () => {
        await idx.removeProvider(receiver1, provider1)
        const result = await idx.getProviders(receiver1)
        assert.deepStrictEqual(result, [provider2])
    })

    it('should removeAllProviders', async () => {
        await idx.removeAllProviders(receiver1)
        const result = await idx.getProviders(receiver1)
        assert.deepStrictEqual(result, [])
    })

})
