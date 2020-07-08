import { Lb3Models } from './interfaces';
import { SqlBuilderBase } from './sql-builder-base';

/**
 * Abstract Class providing basic logic for building SQL
 * with select statements according to looback model definitions
 */
export class SqlBuilderLbModels extends SqlBuilderBase {

  /**
   * @param lb3models The loopback 3 models object providing info about columns to select per model
   */
  constructor(private lb3models: Lb3Models) {
    super()
  }

  /**
   * Extracts an array of column names from loopback 3 model
   * object. Useful to create select statements with the columns needed
   * from that model.
   *
   * @param modelName
   */
  getColumns(modelName: string): string[] {

    if (!this.lb3models) console.error('this.models has to be defined');

    const propDefs = this.lb3models[modelName].definition.properties;
    const columns = [];
    for (const colName in propDefs) {
      if (propDefs.hasOwnProperty(colName)) {
        if (!propDefs[colName].hidden) columns.push(colName);
      }
    }
    return columns;
  }


  /**
   * Creates select statements with the columns needed for given model
   * according to loopback 3 model definition.
   *
   * @param alias the table alias
   * @param model the name of the loopback model
   */
  createSelect(alias: string, model: string) {
    const columns = this.getColumns(model);
    return columns.map(c => alias + '.' + c).join(`,
    `);
  }

  /**
   * Creates SQL for generating a json object where
   * keys are the column names. The column names are
   * the ones given by loopback 3 model definition.
   *
   * @param alias the table alias
   * @param model the name of the loopback model
   */
  createBuildObject(alias: string, model: string) {
    const columns = this.getColumns(model);
    return ` jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    ) `;
  }
}
