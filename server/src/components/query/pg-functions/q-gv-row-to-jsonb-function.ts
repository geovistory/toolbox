import {ModelDefinition} from '@loopback/repository';
import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that can be used in SQL Query to build a JSON object for
 * a given Model.
 *
 * e.g. create the function for InfTimePrimitive:
 *
 * const x = new  SqlGvRowToJsonbFunction(ds)
 * x.generateFunctionSql(InfTimePrimitive.definition)
 * await x.execute()
 *
 * Then in postgres use this function:
 * SELECT gv_to_jsonb(t1)
 * FROM information.time_primitive t1
 * LIMIT 10
 *
 */
export class SqlGvRowToJsonbFunction extends SqlBuilderLb4Models {
  generateFunctionSql(model: ModelDefinition) {
    this.sql = `
    CREATE OR REPLACE FUNCTION gv_to_jsonb(_row ${this.getTableName(model)})
      RETURNS jsonb
      LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN  jsonb_build_object(
        ${this.getColumns(model).map(c => `'${c}', _row.${c}`).join(', ')}
      );
    END;$$;
  `
  }

  getTableName(model: ModelDefinition): string {
    const pg = model.settings.postgresql;
    return `${pg.schema}.${pg.table}`;
  }

}
