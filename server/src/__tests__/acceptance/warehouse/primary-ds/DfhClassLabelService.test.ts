/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {DfhClassLabelService} from '../../../../warehouse/primary-ds/DfhClassLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass, deleteDfhApiClass, updateDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {setupCleanAndStartWarehouse, wait} from '../../../helpers/warehouse-helpers';

describe('DfhClassLabelService', () => {

  let wh: Warehouse;
  let s: DfhClassLabelService;

  before(async () => {
    // await wh.pgClient.connect()
  })
  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.dfhClassLabel;
  })
  afterEach(async () => {
    await wh.stop()
  })

  it('should have api class label in index after initIdx()', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})
    await wait(200);
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result).to.equal('Foo')

  })

  it('should update class label', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})

    await wait(200);

    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result).to.equal('Foo')

    const c2 = await updateDfhApiClass(c.pk_entity as any, {dfh_class_label: 'Bar'})
    expect(c2.dfh_class_label).to.equal('Bar')

    await wait(200);
    const resultUpdated = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(resultUpdated).to.equal('Bar')
  })

  it('should NOT! delete class label', async () => {
    const c = await createDfhApiClass({dfh_class_label: 'Foo'})

    await wait(200);
    const result = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(result).to.equal('Foo')

    await deleteDfhApiClass(c.pk_entity as any)


    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkClass: c.dfh_pk_class, language: c.dfh_class_label_language})
    expect(resultUpdated).to.equal('Foo')
  })

});

