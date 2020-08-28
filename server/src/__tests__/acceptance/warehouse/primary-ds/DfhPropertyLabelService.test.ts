/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {DfhPropertyLabelService} from '../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty, deleteDfhApiProperty, updateDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {setupCleanAndStartWarehouse, wait, waitUntilNext} from '../../../helpers/warehouse-helpers';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';

describe('DfhPropertyLabelService', () => {

  let wh: Warehouse;
  let s: DfhPropertyLabelService;

  before(async () => {
    // await wh.pgClient.connect()
  })
  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.dfhPropertyLabel;
  })

  it('should have api property label in index after initIdx()', async () => {
    const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE);
    await waitUntilNext(s.afterPut$);
    const result = await s.index.getFromIdx({pkProperty: prop.dfh_pk_property, language: prop.dfh_property_label_language})
    expect(result).to.equal(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label)

  })

  it('should update property label', async () => {
    const c = await createDfhApiProperty({dfh_property_label: 'Foo'})

    await wait(200);

    const result = await s.index.getFromIdx({pkProperty: c.dfh_pk_property, language: c.dfh_property_label_language})
    expect(result).to.equal('Foo')

    const c2 = await updateDfhApiProperty(c.pk_entity as any, {dfh_property_label: 'Bar'})
    expect(c2.dfh_property_label).to.equal('Bar')

    await wait(200);
    const resultUpdated = await s.index.getFromIdx({pkProperty: c.dfh_pk_property, language: c.dfh_property_label_language})
    expect(resultUpdated).to.equal('Bar')
  })

  it('should NOT! delete property label', async () => {
    const c = await createDfhApiProperty({dfh_property_label: 'Foo'})

    await wait(200);
    const result = await s.index.getFromIdx({pkProperty: c.dfh_pk_property, language: c.dfh_property_label_language})
    expect(result).to.equal('Foo')

    await deleteDfhApiProperty(c.pk_entity as any)


    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkProperty: c.dfh_pk_property, language: c.dfh_property_label_language})
    expect(resultUpdated).to.equal('Foo')
  })

});

