/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {DfhClassLabelService} from '../../../../warehouse/primary-ds/DfhClassLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass, updateDfhApiClass, deleteDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {setupWarehouseAndConnect} from '../../../helpers/warehouse-helpers';

describe('DfhClassLabelService', () => {

  let wh: Warehouse;
  let s: DfhClassLabelService;

  before(async () => {
    wh = await setupWarehouseAndConnect()
    // await wh.pgClient.connect()
  })
  beforeEach(async function () {
    await cleanDb();
    s = new DfhClassLabelService(wh);
    await s.clearAll()
  })

  it('should have api class label in index after initIdx()', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})
    await s.initIdx();
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result).to.equal('Foo')

  })

  it('should update class label', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})
    await s.initIdx();
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result).to.equal('Foo')

    const c2 = await updateDfhApiClass(c.pk_entity as any, {dfh_class_label: 'Bar'})
    expect(c2.dfh_class_label).to.equal('Bar')

    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(resultUpdated).to.equal('Bar')
  })

  it('should NOT! delete class label', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})
    await s.initIdx();
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result).to.equal('Foo')

    await deleteDfhApiClass(c.pk_entity as any)


    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(resultUpdated).to.equal('Foo')
  })

});

