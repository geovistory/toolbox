import {ModelDefinition} from '@loopback/repository';
import {indexBy} from 'ramda';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldProperty} from '../../models/field/gv-field-property';
import {GvFieldSourceEntity} from '../../models/field/gv-field-source-entity';
import {GvPaginationStatementFilter} from '../../models/field/gv-pagination-statement-filter';
import {SqlBuilderBase} from './sql-builder-base';

/**
 * Abstract Class providing basic logic for building SQL
 * with select statements according to looback model definitions
 */
export class SqlBuilderLb4Models extends SqlBuilderBase {


  constructor(protected dataSource: Postgres1DataSource) {
    super()
  }

  /**
   * Extracts an array of column names from loopback 4 model
   * class. Useful to create select statements with the columns needed
   * from that model.
   *
   * @param model the ModelDefinition of the loopback 4 model
   */
  getColumns(model: ModelDefinition, except?: string[]): string[] {


    const propDefs = model.properties;
    let excluded = model?.settings?.hiddenProperties ?? {};
    if (except) excluded = {...excluded, ...indexBy((y) => y, except)}
    const columns = [];
    for (const propName in propDefs) {
      if (
        Object.prototype.hasOwnProperty.call(propDefs, propName)
        && !Object.prototype.hasOwnProperty.call(excluded, propName)
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
  createSelect(alias: string, model: ModelDefinition, except?: string[]) {
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
  createBuildObject(alias: string, model: ModelDefinition, except?: string[]) {
    const columns = this.getColumns(model, except);
    return ` jsonb_strip_nulls(jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    )) `;
  }

  async executeAndReturnFirstData<M>(): Promise<M> {
    const res = await this.dataSource.execute(this.sql, this.params);
    return res?.[0]?.data ?? {};
  }
  async execute<M>(): Promise<M> {
    const res = await this.dataSource.execute(this.sql, this.params);
    return res;
  }

  getStatementWhereFilter(tableAlias: string, filterObject: GvPaginationStatementFilter): string[] {
    const filters: string[] = []
    let column: keyof GvPaginationStatementFilter;
    for (column in filterObject) {
      const value = filterObject[column];
      if (value) {
        filters.push(`${tableAlias}.${column}=${this.addParam(value)}`)
      }
    }
    return filters;
  }
  createStatementFilterObject(isOutgoing: boolean, source: GvFieldSourceEntity, property: GvFieldProperty) {
    const filterObject: GvPaginationStatementFilter = {
      fk_subject_info: isOutgoing ? source.fkInfo : undefined,
      fk_object_info: isOutgoing ? undefined : source.fkInfo,
      fk_subject_data: isOutgoing ? source.fkData : undefined,
      fk_object_data: isOutgoing ? undefined : source.fkData,
      fk_subject_tables_cell: isOutgoing ? source.fkTablesCell : undefined,
      fk_object_tables_cell: isOutgoing ? undefined : source.fkTablesCell,
      fk_subject_tables_row: isOutgoing ? source.fkTablesRow : undefined,
      fk_object_tables_row: isOutgoing ? undefined : source.fkTablesRow,
      fk_property: property.fkProperty,
      fk_property_of_property: property.fkPropertyOfProperty
    };
    return filterObject
  }
}

