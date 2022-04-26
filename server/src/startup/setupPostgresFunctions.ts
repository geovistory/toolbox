import {SqlGvFieldPageIncomingInProject} from '../components/query/pg-functions/gv-field-page-incoming-in-project-fn';
import {SqlGvFieldPageIncomingInRepo} from '../components/query/pg-functions/gv-field-page-incoming-in-repo';
import {SqlGvFieldPageIncomingNoConstraint} from '../components/query/pg-functions/gv-field-page-incoming-no-constaint';
import {SqlGvFieldPageIncomingNotInProject} from '../components/query/pg-functions/gv-field-page-incoming-not-in-project-fn';
import {SqlGvFieldPageOutgoingInProject} from '../components/query/pg-functions/gv-field-page-outgoing-in-project-fn';
import {SqlGvFieldPageOutgoingInRepo} from '../components/query/pg-functions/gv-field-page-outgoing-in-repo';
import {SqlGvFieldPageOutgoingNoConstraint} from '../components/query/pg-functions/gv-field-page-outgoing-no-constraint';
import {SqlGvFieldPageOutgoingNotInProject} from '../components/query/pg-functions/gv-field-page-outgoing-not-in-project-fn';
import {SqlGvGetStatementTarget} from '../components/query/pg-functions/gv-get-statement-target';
import {SqlGvRowToJsonbFunction} from '../components/query/pg-functions/q-gv-row-to-jsonb-function';
import {Postgres1DataSource} from '../datasources/postgres1.datasource';
import {DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, TabCell, TabRow, WarEntityPreview} from '../models';

export async function setupPostgresFunctions(c: Postgres1DataSource) {
  await createModelToJsonbFunctions(c);
  await createGetStatementTargetFunction(c);


  await createFieldPageFunctions(c);


}

async function createGetStatementTargetFunction(c: Postgres1DataSource) {
  const s = new SqlGvGetStatementTarget(c);
  s.generateFunctionSql();
  await s.execute();
}

async function createFieldPageFunctions(c: Postgres1DataSource) {
  await new SqlGvFieldPageIncomingInProject(c).generateFunctionSql().execute()
  await new SqlGvFieldPageIncomingInRepo(c).generateFunctionSql().execute()
  await new SqlGvFieldPageIncomingNoConstraint(c).generateFunctionSql().execute()
  await new SqlGvFieldPageIncomingNotInProject(c).generateFunctionSql().execute()
  await new SqlGvFieldPageOutgoingInProject(c).generateFunctionSql().execute()
  await new SqlGvFieldPageOutgoingInRepo(c).generateFunctionSql().execute()
  await new SqlGvFieldPageOutgoingNoConstraint(c).generateFunctionSql().execute()
  await new SqlGvFieldPageOutgoingNotInProject(c).generateFunctionSql().execute()
}



/**
 * Creates the pg-functions to convert rows to json objects
 * @param c
 */
async function createModelToJsonbFunctions(c: Postgres1DataSource) {

  // create a pg-function for these models:
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
    WarEntityPreview,
    TabCell,
    TabRow,
    DatDigital
  ];
  for (const m of models) {
    try {
      const s = new SqlGvRowToJsonbFunction(c);
      s.generateFunctionSql(m.definition);
      await s.execute();
    } catch (error) {
      throw new Error(`Creating geovistory row to jsonb function for model ${m.name}`);
    }
  }
}

