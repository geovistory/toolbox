import {SqlGvRowToJsonbFunction} from '../components/query/pg-functions/q-gv-row-to-jsonb-function'
import {InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview} from '../models'
import {Postgres1DataSource} from './Postgres1DataSource'


async function main() {
  require('../../scripts/__dotenv.js')
  await require('../../scripts/__chooseGvDb.js')()

  const models = [
    ProInfoProjRel,
    InfStatement,
    InfAppellation,
    InfLangString,
    InfPlace,
    InfDimension,
    InfLanguage,
    InfTimePrimitive,
    InfResource,
    WarEntityPreview
  ]
  const ds = new Postgres1DataSource()
  for (const m of models) {
    try {

      const s = new SqlGvRowToJsonbFunction(ds)
      s.generateFunctionSql(m.definition)
      await s.execute()
    } catch (error) {
      throw new Error(`Creating geovistory row to jsonb function for model ${m.name}`)
    }
  }
}


main()
  .then(() => {process.exit(0)})
  .catch(e => {
    console.log(e)
    process.exit(1);
  })
