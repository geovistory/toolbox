/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {DfhClassLabelService} from '../../../../warehouse/primary-ds/DfhClassLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass, deleteDfhApiClass, updateDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {setupCleanAndStartWarehouse, stopWarehouse, wait, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('DfhClassLabelService', () => {

  let wh: Warehouse;
  let s: DfhClassLabelService;

   before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse()
    wh = injector.get(Warehouse)
    s = injector.get(DfhClassLabelService)

  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have api class label in index after initIdx()', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})
    await wait(200);
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result?.label).to.equal('Foo')

  })

  it('should update class label', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})

    await wait(200);

    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result?.label).to.equal('Foo')

    const c2 = await updateDfhApiClass(c.pk_entity as any, {dfh_class_label: 'Bar'})
    expect(c2.dfh_class_label).to.equal('Bar')

    await wait(200);
    const resultUpdated = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(resultUpdated?.label).to.equal('Bar')
  })

  it('should NOT! delete class label', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})

    await wait(200);
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result?.label).to.equal('Foo')

    await deleteDfhApiClass(c.pk_entity as any)


    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(resultUpdated?.label).to.equal('Foo')
  })

});

