import assert from 'assert';
import {omit} from 'ramda';
import {IndexDB} from '../../../../warehouse/base/classes/IndexDB';
import {Warehouse, WarehouseConfig} from '../../../../warehouse/Warehouse';
import {waitUntilNext} from '../../../helpers/warehouse-helpers';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TestIdx extends IndexDB<string, any> {
  keyToString(key: string) {return key;}
  stringToKey(key: string) {return key;}
}

const config: WarehouseConfig = {
  backups: undefined
}

describe('IndexDB', function () {
  let idx: TestIdx
  let wh: Warehouse

  before(async () => {

    wh = new Warehouse(config)
    idx = new TestIdx('test_idx', wh)
    // await wh.connectPgClient();
    wh.createSchema$.next();
    await waitUntilNext(idx.ready$)

  })
  beforeEach(async function () {
    await idx.clearIdx()
  })
  it('should add and get key-boolean pair', async () => {
    await idx.addToIdx('aaa', true)
    const result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, true)
  })
  it('should add and get key-string pair', async () => {
    const val = 'Hello World'
    await idx.addToIdx('aaa', val)
    const result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, val)
  })
  it('should add and get key-number pair', async () => {
    const val = 123123123
    await idx.addToIdx('aaa', val)
    const result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, val)
  })
  it('should add and get key-undefined pair', async () => {
    const val = undefined
    await idx.addToIdx('aaa', val)
    const result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, null)
  })
  it('should add and get key-object pair', async () => {
    const val = {foo: 123, bar: true, baz: undefined, x: null, y: `Hanse's ="" \n asdb <!?-320 daskj Apple`}
    await idx.addToIdx('aaa', val)
    const result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, omit(['baz'], val))
  })

  it('should add and get key-array pair', async () => {
    const val = ['foo', 'foo2', 'foo3', "asdä!'a>dasdasd"]
    await idx.addToIdx('aaa', val)
    const result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, val)
  })

  it('should add and remove key', async () => {
    const val = 'Hello World'
    await idx.addToIdx('aaa', val)
    let result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, val)
    await idx.removeFromIdx('aaa')
    result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, undefined)
  })


  it('should add and overwrite key-val pair', async () => {
    let val = 'Hello World'
    await idx.addToIdx('aaa', val)
    let result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, val)
    val = 'Hallo Welt'
    await idx.addToIdx('aaa', val)
    result = await idx.getFromIdx('aaa')
    assert.deepStrictEqual(result, val)
  })

  it('should iterate over keys', async () => {

    await idx.addToIdx('aaa', true)
    await idx.addToIdx('aav', true)
    const keys: string[] = []
    await idx.forEachKey<string>(async (k) => {
      keys.push(k)
      return ''
    })
    assert.deepStrictEqual(keys, ['aaa', 'aav'])
  })


  it('should iterate over keys starting with', async () => {

    await idx.addToIdx('aaa', true)
    await idx.addToIdx('xyz', true)
    await idx.addToIdx('aav', true)
    const keys: string[] = []
    await idx.forEachKeyStartingWith('aa', async (k) => {
      keys.push(k)
      return ''
    })
    assert.deepStrictEqual(keys, ['aaa', 'aav'])
  })


  it('should iterate over items starting with', async () => {

    await idx.addToIdx('aaa', 'Apple')
    await idx.addToIdx('xyz', 'Pomme')
    await idx.addToIdx('aav', 'Apfel')
    const items: {
      key: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any;
    }[] = []
    await idx.forEachItemStartingWith('aa', async (k) => {
      items.push(k)
      return ''
    })
    assert.deepStrictEqual(items, [{key: 'aaa', value: 'Apple'}, {key: 'aav', value: 'Apfel'}])
  })

  it('should say key does not exist', async () => {

    const result = await idx.keyExists('a')
    assert.deepStrictEqual(result, false)
  })

  it('should say key does exist', async () => {
    await idx.addToIdx('a', 'Apfel')
    const result = await idx.keyExists('a')
    assert.deepStrictEqual(result, true)
  })


  it('should get length of keys', async () => {
    await idx.addToIdx('a', 'Apfel')
    await idx.addToIdx('ab', 'Pomme')
    const result = await idx.getLength()
    assert.deepStrictEqual(result, 2)
  })


})
