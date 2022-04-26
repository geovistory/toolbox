import {fieldPageReqsToSqlArray} from '../components/query/fieldpage/fieldPageReqsToSqlArray'
import {GvFieldPageReq} from '../models'
import {logToFile} from '../utils/helpers'
import {adamo} from './field-page-requests/adamo'
import {maleIsGenderOf} from './field-page-requests/maleIsGenderOf'
import {zocoler} from './field-page-requests/zocoler'


async function main() {
  require('../../scripts/__dotenv.js')



  const reqs: {[key: string]: GvFieldPageReq[]} = {
    zocoler,
    adamo,
    maleIsGenderOf
  }

  for (const key in reqs) {
    console.log(`********* request: ${key} **********`)
    const r = reqs[key]
    const sqls = fieldPageReqsToSqlArray(r)
    const out = sqls.join(';\n/*******************************/\n')
    logToFile(out, `${key}-sql`)
    console.log('done')
  }
}

main()
  .then(() => {process.exit(0)})
  .catch(e => {
    console.log(e)
    process.exit(1);
  })
