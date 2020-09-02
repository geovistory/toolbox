import assert from 'assert';
import {PEntityLabelService} from '../../../../warehouse/aggregator-ds/entity-label/p-entity-label/PEntityLabelService';
import {DependencyIndex} from '../../../../warehouse/base/classes/DependencyIndex';
import {pEntityIdToString, stringToPEntityId} from '../../../../warehouse/base/functions';
import {PEntityId} from '../../../../warehouse/primary-ds/entity/PEntityService';
import {Warehouse} from '../../../../warehouse/Warehouse';



describe('DependencyIndex', function () {
    let idx: DependencyIndex<PEntityId, string, PEntityId, string>
    let wh: Warehouse
    let stub1: PEntityLabelService
    let stub2: PEntityLabelService
    let receiver1: PEntityId
    let provider1: PEntityId
    let provider2: PEntityId
    let receiver2: PEntityId
    before(async () => {

        wh = new Warehouse()
        stub1 = new PEntityLabelService(wh)
        stub2 = new PEntityLabelService(wh)


        receiver1 = {fkProject: 1, pkEntity: 100}
        provider1 = {fkProject: 1, pkEntity: 500}
        provider2 = {fkProject: 1, pkEntity: 501}

        receiver2 = {fkProject: 1, pkEntity: 101}
        idx = new DependencyIndex(
            stub1,
            stub2,
            pEntityIdToString,
            stringToPEntityId,
            pEntityIdToString,
            stringToPEntityId,
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
            [pEntityIdToString(provider1)]: true,
            [pEntityIdToString(provider2)]: true,
        })
    })
    it('should getReceivers', async () => {
        let result = await idx.getReceivers(provider1)
        assert.deepStrictEqual(result, [receiver1])
        result = await idx.getReceivers(provider2)
        assert.deepStrictEqual(result, [receiver1, receiver2])
    })

    it('should removeProviderByString', async () => {
        await idx.removeProviderByString(pEntityIdToString(receiver1), pEntityIdToString(provider1))
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
