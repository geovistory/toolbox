import {ModelDefinition, Options} from '@loopback/repository';
import {indexBy} from 'ramda';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldProperty} from '../../models/field/gv-field-property';
import {GvFieldSourceEntity} from '../../models/field/gv-field-source-entity';
import {GvPaginationStatementFilter} from '../../models/field/gv-pagination-statement-filter';
import {DatObject, DfhObject, InfObject, ProObject, SysObject, WarObject} from '../../models/gv-positive-schema-object.model';
import {SqlBuilderBase} from './sql-builder-base';

export type With = {
  colName: string; // colname of the object
  twName: string; // twName
};
type InfObjectKey = keyof InfObject;
type InfObjWiths = {[key in InfObjectKey]: With[]}
type ProObjectKey = keyof ProObject;
type ProObjWiths = {[key in ProObjectKey]: With[]}
type DatObjectKey = keyof DatObject;
type DatObjWiths = {[key in DatObjectKey]: With[]}
type WarObjectKey = keyof WarObject;
type WarObjWiths = {[key in WarObjectKey]: With[]}
type DfhObjectKey = keyof DfhObject;
type DfhObjWiths = {[key in DfhObjectKey]: With[]}
type SysObjectKey = keyof SysObject;
type SysObjWiths = {[key in SysObjectKey]: With[]}

interface ObjectWiths {
  inf: InfObjWiths,
  pro: ProObjWiths,
  dat: DatObjWiths,
  war: WarObjWiths,
  dfh: DfhObjWiths,
  sys: SysObjWiths,
};
/**
 * Abstract Class providing basic logic for building SQL
 * with select statements according to looback model definitions
 */
export class SqlBuilderLb4Models extends SqlBuilderBase {

  objectWiths: ObjectWiths = {

    inf: {
      statement: [],
      appellation: [],
      lang_string: [],
      language: [],
      time_primitive: [],
      place: [],
      dimension: [],

      resource: [],
    },
    dat: {
      namespace: [],
      class_column_mapping: [],
      text_property: [],
      chunk: [],
      column: [],
      digital: []
    },
    pro: {
      analysis: [],
      text_property: [],
      class_field_config: [],
      dfh_class_proj_rel: [],
      dfh_profile_proj_rel: [],
      project: [],
      info_proj_rel: [],
      table_config: [],
    },
    dfh: {
      profile: [],
      property: [],
      label: [],
      klass: []
    },
    sys: {
      config: [],
      klass: [],
      label: [],
      property: [],
      system_relevant_class: []
    },
    war: {
      entity_preview: [],
    },

  }
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
  async execute<M>(options?: Options): Promise<M> {
    const res = await this.dataSource.execute(this.sql, this.params, options);
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


  groupPartsByModel() {
    const sqls: string[] = []
    const addGroup = (model: string, withs: With[]) => {

      if (withs.length) {
        sqls.push(` "${model}" AS (
          SELECT json_agg(t1.objects) as json
          FROM (
            ${withs.map(tw => `
              SELECT ${tw.colName} objects FROM ${tw.twName}
            `).join(' UNION ALL ')}
          ) as t1
          GROUP BY 1=1
        )`)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recursive = (object: any, prefix = '') => {

      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          const tw = prefix + key
          if (Array.isArray(element)) {
            addGroup(tw, element)
          }
          else {
            recursive(element, tw + '_')
          }
        }
      }
    }
    recursive(this.objectWiths)

    return sqls.join(',\n')
  }

  buildFinalObject(): string {
    const leftJoins: string[] = []
    const addLefJoin = (tw: string) => {
      leftJoins.push(`LEFT JOIN "${tw}" ON true`)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recursive = (object: any, prefix = ''): string => {

      const keyVals: string[] = []
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          const tw = prefix + key
          if (Array.isArray(element)) {
            if (element.length) {
              addLefJoin(tw)
              keyVals.push(`'${key}', "${tw}".json`)
            }
          }
          else {
            keyVals.push(`'${key}', ${recursive(element, tw + '_')}`)
          }
        }
      }
      return `json_strip_nulls(json_build_object(
        ${keyVals.join(',\n')}
      ))`
    }

    const buildOject = recursive(this.objectWiths)

    return `select
    ${buildOject} as data
    FROM
    (select 0 ) as one_row
    ${leftJoins.join('\n')};`
  }

}

