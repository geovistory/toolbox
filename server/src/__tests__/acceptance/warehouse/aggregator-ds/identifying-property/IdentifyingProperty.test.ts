/* eslint-disable @typescript-eslint/camelcase */
import {expect} from '@loopback/testlab';
import {IdentifyingPropertyService} from '../../../../../warehouse/aggregator-ds/identifying-property/IdentifyingPropertyService';
import {Warehouse} from '../../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../../helpers/meta/clean-db.helper';
import {DfhApiPropertyMock} from '../../../../helpers/data/gvDB/DfhApiPropertyMock';
import {setupCleanAndStartWarehouse, waitUntilSatisfy} from '../../../../helpers/warehouse-helpers';



describe('IdentifyingProperty', function () {

    let wh: Warehouse;
    let s: IdentifyingPropertyService;
    beforeEach(async function () {
        await cleanDb()
        wh = await setupCleanAndStartWarehouse()
        s = wh.agg.identifyingProperty
    })
    afterEach(async function () {await wh.stop()})

    it('should have one identifying property for birth', async () => {
        await Promise.all([
            createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
            createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM)
        ])

        const a = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.pkClass === 61
                && item.val.length === 1
        })

        expect(a)
    })


    it('should have two identifying properties for appellation in a language (time-indexed)', async () => {
        await Promise.all([
            createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
            createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
            createDfhApiProperty(DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE),
            createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
            createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM)
        ])

        const a = await waitUntilSatisfy(s.afterPut$, (item) => {
            return item.key.pkClass === 365
                && item.val.length === 3
        })

        expect(a)
    })

})
