/* eslint-disable @typescript-eslint/camelcase */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {writeFileSync} from 'fs';
import path from 'path';
import {start} from '../../../../warehouse/startScripts';



describe('Warehouse Start Script', function () {


  it('should create schema war_cache_commit08', async () => {

    createCompatList(['commit10', 'commit09', 'commit08'])

    const warehouse = await start();
    const res = await warehouse.pgPool.query<{schema: string}>(`
      SELECT schema_name AS schema
      FROM information_schema.schemata
    `)
    expect(res.rows.some(x => x.schema === 'war_cache_commit08')).to.be.true()
    expect(res.rows.filter(x => x.schema.startsWith('war_cache_')).length).to.equal(1)
  })

  it('should create schema war_cache_commit08 then war_cache_commit09 and delete war_cache_commit08', async () => {

    createCompatList(['commit10', 'commit09', 'commit08'])

    let warehouse = await start();
    let res = await warehouse.pgPool.query<{schema: string}>(`
      SELECT schema_name AS schema
      FROM information_schema.schemata
    `)
    expect(res.rows.some(x => x.schema === 'war_cache_commit08')).to.be.true()
    expect(res.rows.filter(x => x.schema.startsWith('war_cache_')).length).to.equal(1)

    await warehouse.stop()

    createCompatList(['commit11', 'commit10', 'commit09'])

    warehouse = await start();
    res = await warehouse.pgPool.query<{schema: string}>(`
      SELECT schema_name AS schema
      FROM information_schema.schemata
    `)
    expect(res.rows.some(x => x.schema === 'war_cache_commit09')).to.be.true()
    expect(res.rows.filter(x => x.schema.startsWith('war_cache_')).length).to.equal(1)

  })


})


export function createCompatList(commits: string[]) {
  const directory = path.join(__dirname, '../../../../../../deployment/warehouse-compat-list.txt')
  writeFileSync(directory, commits.join('\n'))
}
