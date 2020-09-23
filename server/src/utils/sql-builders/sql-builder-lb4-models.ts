import {ModelDefinition} from '@loopback/repository';
import {SqlBuilderBase} from './sql-builder-base';
import {Postgres1DataSource} from '../../datasources';

/**
 * Abstract Class providing basic logic for building SQL
 * with select statements according to looback model definitions
 */
export class SqlBuilderLb4Models extends SqlBuilderBase {


  constructor(private dataSource: Postgres1DataSource) {
    super()
  }

  /**
   * Extracts an array of column names from loopback 4 model
   * class. Useful to create select statements with the columns needed
   * from that model.
   *
   * @param model the ModelDefinition of the loopback 4 model
   */
  getColumns(model: ModelDefinition): string[] {


    const propDefs = model.properties;
    const hidden = model?.settings?.hiddenProperties ?? {};
    const columns = [];
    for (const propName in propDefs) {
      if (
        Object.prototype.hasOwnProperty.call(propDefs, propName)
        && !Object.prototype.hasOwnProperty.call(hidden, propName)
      ) {
        columns.push(propName)
      }
    }

    return columns;
  }


  /**
   * Creates select statements with the columns needed for given model
   * according to loopback 4 model definition.
   *
   * @param alias the table alias
   * @param model the ModelDefinition of the loopback 4 model
   */
  createSelect(alias: string, model: ModelDefinition) {
    const columns = this.getColumns(model);
    return columns.map(c => alias + '.' + c).join(`,
    `);
  }

  /**
   * Creates SQL for generating a json object where
   * keys are the column names. The column names are
   * the ones given by loopback 4 model definition.
   *
   * @param alias the table alias
   * @param model the ModelDefinition of the loopback 4 model
   */
  createBuildObject(alias: string, model: ModelDefinition) {
    const columns = this.getColumns(model);
    return ` jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    ) `;
  }

  protected async execute<M>(): Promise<M> {
    const res = await this.dataSource.execute(this.sql, this.params);
    return res?.body?.[0] ?? {};
  }
}
