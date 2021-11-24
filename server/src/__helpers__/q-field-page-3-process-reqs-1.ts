import {keys, uniq, values} from 'ramda'
import {SubfieldPageController} from '../controllers/project-data/subfield-page.controller'
import {GvFieldPageReq} from '../models'
import {logToFile} from '../utils/helpers'
import {Postgres1DataSource} from './Postgres1DataSource'
import {adamo} from './res/adamo'
import {zocoler} from './res/zocoler'
// expected number of fields
// zocoler:
// 8          root
// + 4 * 9 = 36  appe
// + 2 * 17 = 34   occupation
// = 78
// or with time props
// 8          root
// + 4 * 14 = 56  appe
// + 2 * 22 = 44   occupation
// = 108

async function main() {
  require('../../scripts/__dotenv.js')
  await require('../../scripts/__chooseGvDb.js')()


  const reqs: {[key: string]: GvFieldPageReq[]} = {
    zocoler,
    adamo
  }

  for (const key in reqs) {
    console.log(`********* request: ${key} **********`)
    const r = reqs[key]

    const configs = [
      // {joinNestedInSql: false, mergeReqsBySourceInSql: false, mergeReqsByTargetInSql: false},
      // {joinNestedInSql: false, mergeReqsBySourceInSql: true, mergeReqsByTargetInSql: false},
      // {joinNestedInSql: false, mergeReqsBySourceInSql: true, mergeReqsByTargetInSql: true},
      {joinNestedInSql: true, mergeReqsBySourceInSql: false, mergeReqsByTargetInSql: false},
      // {joinNestedInSql: true, mergeReqsBySourceInSql: true, mergeReqsByTargetInSql: false},
      // {joinNestedInSql: true, mergeReqsBySourceInSql: true, mergeReqsByTargetInSql: true},
    ]
    for (const config of configs) {

      console.log(`***************** config: ${JSON.stringify(config)} *****************`)
      const res = await executeRequests(config, r)
      console.log('nr of subfields: ', res.subfieldPages.length)

      const uniqFields = uniq(res.subfieldPages.map(s => subfieldPageToString(s.req)))
      console.log('nr of uniq subfields: ', uniqFields.length)
      logToFile(`
        ${JSON.stringify(res, null, 2).replace('"true"', 'TrueEnum.true')}
      `, `${key}-j${config.joinNestedInSql ? 't' : 'f'}-m${config.mergeReqsBySourceInSql ? 't' : 'f'}-`)
    }
    console.log('done')
  }
}
async function executeRequests(config: {
  mergeReqsBySourceInSql: boolean,
  mergeReqsByTargetInSql: boolean,
  joinNestedInSql: boolean
}, reqs: GvFieldPageReq[]) {
  const ds = new Postgres1DataSource()

  const ctrl = new SubfieldPageController(ds)
  ctrl.mergeReqsByTargetInSql = config.mergeReqsByTargetInSql
  ctrl.mergeReqsBySourceInSql = config.mergeReqsBySourceInSql
  ctrl.joinNestedInSql = config.joinNestedInSql
  return ctrl.loadSubfieldPages(reqs)
}
function subfieldPageToString(p: GvFieldPageReq): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const x = p.page as unknown as any;
  const limit = p.page.limit
  const offset = p.page.offset
  const source = Object.keys(x.source).map((key) => `${key}-${x.source[key]}`).join('_')
  const property = Object.keys(x.property).map(key => `${key}-${x.property[key]}`).join('_')
  const subfieldIdString = `${source}_${property}_${x.isOutgoing ? 'out' : 'in'}_${String(keys(x.scope)[0])}_${values(x.scope)[0]}`
  const pageIdString = subfieldIdString + '_' + limit + '_' + offset;
  return pageIdString
}

main()
  .then(() => {process.exit(0)})
  .catch(e => {
    console.log(e)
    process.exit(1);
  })
