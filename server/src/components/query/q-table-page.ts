import { model, ModelDefinition, property } from '@loopback/repository';
import { without } from 'ramda';
import { Postgres1DataSource } from '../../datasources';
import { DatColumn, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, InfTimePrimitive, ProInfoProjRel } from '../../models';
import { GvPositiveSchemaObject } from '../../models/gv-positive-schema-object.model';
import { SysConfigValue } from '../../models/sys-config';
import { logSql } from '../../utils/helpers';
import { SqlBuilderLb4Models } from '../../utils/sql-builders/sql-builder-lb4-models';
import { registerType } from '../spec-enhancer/model.spec.enhancer';

// Table column filter interface
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}
export enum TColFilterOpNumeric {
  '=' = '=',
  '<' = '<',
  '>' = '>'
}
export enum TColFilterOpText {
  '%iLike%' = '%iLike%'
}


@model()
export class TColFilterNum {
  @property({
    type: String,
    required: true,
    jsonSchema: {
      enum: Object.values(TColFilterOpNumeric),
    }
  }) operator: TColFilterOpNumeric;
  @property({ required: true }) value: number;
}
@model()
export class TColFilterTxt {
  @property({
    type: String,
    required: true,
    jsonSchema: {
      enum: Object.values(TColFilterOpText),
    }
  }) operator: TColFilterOpText;
  @property({ required: true }) value: string;
}
@model()
export class TColFilter {
  @property() numeric?: TColFilterNum
  @property() text?: TColFilterTxt
}
@model({
  jsonSchema: {
    title: 'TColFilters',
    additionalProperties: {
      $ref: registerType(TColFilter)
    }
  },
})
export class TColFilters {
  // @property() colName1?: TColFilter // to comment out
  [colName: string]: TColFilter | undefined
}
@model()
export class GetTablePageOptions {
  @property({ required: true }) limit: number;
  @property({ required: true }) offset: number;
  @property.array(String) columns: string[];
  @property({ required: true }) sortBy: string;
  @property({
    type: String,
    required: true,
    jsonSchema: {
      enum: Object.values(SortDirection),
    }
  }) sortDirection: SortDirection;
  @property() filters: TColFilters;
}



@model()
export class TableCell {
  @property() 'string_value': string;
  @property() 'numeric_value': number | null
  @property() 'pk_cell': number
}


@model({
  jsonSchema: {
    additionalProperties: {
      $ref: registerType(TableCell)
    }
  },
})
export class TableRow {
  @property() pk_row?: number
  // @property() colName1?: TableCell
  [colName: string]: TableCell | number | undefined
}
@model()
export class TablePageResponse {
  @property.array(TableRow) rows: TableRow[];
  @property.array(String) columns: string[];
  @property() length: number;
  @property() schemaObject: GvPositiveSchemaObject
}

interface ColBatchWith { name: string, columns: string[] }
interface TwNameColName { twName: string, colName: string, pkColumn?: number, vot?: 'appellation' | 'place' | 'dimension' | 'lang_string' | 'time_primitive' | 'language' }
const PK_CELL_SUFFIX = '_pk_cell'
const TW_JOIN_STMT = 'tw_stmt_'
const TW_JOIN_VOT = 'tw_vot_'
/**
 * Class to create select queries on data tables
 */
export class QTableTablePage extends SqlBuilderLb4Models {

  // key is the column name / pkColumn, value is the alias of the table
  colTableAliasMap = new Map<string, string>()

  colBatchWiths: ColBatchWith[] = [];
  colBatchWithI = 0;
  colsWithMapping: string[];
  masterColumns: string[]

  sysconfig: SysConfigValue;

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  async query(
    fkProject: number,
    pkEntity: number,
    options: GetTablePageOptions,
    masterColumns: string[],
    colMeta: DatColumn[]
  ): Promise<TablePageResponse> {

    options.columns.forEach((pkCol, i) => {
      this.colTableAliasMap.set(pkCol, `tr${i}`)
    })

    this.masterColumns = masterColumns;
    const colsForBatches = without(masterColumns, options.columns);

    await this.setColsWithMapping(pkEntity);
    this.sysconfig = (await this.dataSource.execute('SELECT config FROM system.config'))[0].config

    this.sql = `
    -- master columns
    WITH tw1 AS (
      Select
      t0.index,
      t1.pk_row${masterColumns.length ? ',' : ''}
      ${this.addColumnSelects(masterColumns)}
      From  (SELECT ROW_NUMBER() OVER(ORDER BY position) as index, pk_row FROM tables.row_` + pkEntity + `) t0
      JOIN tables.row_` + pkEntity + ` t1 ON t1.pk_row = t0.pk_row
      JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
      JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
      ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
      t1.fk_digital = ${this.addParam(pkEntity)}
      AND
      t3.fk_project = ${this.addParam(fkProject)}

      ${this.addFilters(options.filters)}

      ${this.addOrderBy(options, colMeta)}

      LIMIT ${this.addParam(options.limit || 20)}
      OFFSET ${this.addParam(options.offset || 0)}
    )

    -- col withs (baches of 10 columns for performance)
    ${colsForBatches.length ? ',' : ''}
    ${this.addColBatchWiths(colsForBatches, pkEntity)},

    -- rows
    tw2 AS (
      ${this.joinColBatchWiths(masterColumns, options.sortBy, options.sortDirection)}

    ),

    -- length (total count)
    tw3 AS (
      Select
        count(t1.pk_row) as length
        From  tables.row_` + pkEntity + ` t1
        JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
        JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
        ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
        t1.fk_digital = ${this.addParam(pkEntity)}
      AND
        t3.fk_project = ${this.addParam(fkProject)}
        ${this.addFilters(options.filters)}
    ),
    tw4 AS (
      SELECT json_agg(t1) as rows FROM tw2 t1
    )
    ------------------------------------
    --- join elements for schema object
    ------------------------------------
    -- information.statement
    ${this.leftJoinStatements(await this.getRefersToColumns(), fkProject)}

    -- information.VOT
    ${this.leftJoinValueObjectTables(await this.getRefersToColumns())}
    ------------------------------------
    --- group parts by model
    ------------------------------------
    -- group information.statement
    ${this.groupStatements(await this.getRefersToColumns())}

    -- group information.VOT TEST
    ${this.groupVOTs(await this.getRefersToColumns())}

    SELECT
    json_build_object (
        'rows', COALESCE(tw4.rows, '[]'::json),
        'length', tw3.length,
         'schemaObject', json_build_object (
          'inf', json_strip_nulls(json_build_object(
            'statement', statement.json,
            'appellation', appellation.json,
            'place', place.json,
            'dimension', dimension.json,
            'lang_string', lang_string.json,
            'time_primitive', time_primitive.json,
            'language', language.json
          )),
          'pro', json_strip_nulls(json_build_object(
            'info_proj_rel', info_proj_rel.json
          ))
        )
    ) as data
    FROM tw4
    LEFT JOIN tw3 ON true
    LEFT JOIN statement ON true
    LEFT JOIN appellation ON true
    LEFT JOIN place ON true
    LEFT JOIN dimension ON true
    LEFT JOIN lang_string ON true
    LEFT JOIN time_primitive ON true
    LEFT JOIN language ON true
    LEFT JOIN info_proj_rel ON true;
    `

    logSql(this.sql, this.params)
    console.log('===========================')
    console.log('===========================')
    console.log('===========================')
    console.log('===========================')
    console.log('===========================')
    console.log(this.sql);
    console.log(this.params);

    const res = await this.executeAndReturnFirstData<{
      rows: TableRow[],
      length: number,
      schemaObject: GvPositiveSchemaObject
    }>()

    return {
      columns: options.columns,
      rows: res?.rows,
      length: res?.length,
      schemaObject: res?.schemaObject
    }

  }

  private async setColsWithMapping(pkEntity: number) {
    const x = await this.dataSource.execute(
      `SELECT json_agg(fk_column::text) arr
      FROM data.class_column_mapping t1,
      data.column t2
      WHERE t1.fk_column = t2.pk_entity
      AND t2.fk_digital = $1
      `,
      [pkEntity]);
    this.colsWithMapping = x?.[0]?.arr ?? [];
  }

  refersToColumns: TwNameColName[];

  private async getRefersToColumns() {
    if (this.refersToColumns) return this.refersToColumns;
    const refersToColumns: TwNameColName[] = [];
    for (const colBatch of this.colBatchWiths) {
      const twName = colBatch.name;
      for (const colName of colBatch.columns) {
        if (this.colsWithMapping.includes(colName)) {
          refersToColumns.push({ twName, colName: colName + PK_CELL_SUFFIX, pkColumn: parseInt(colName) });
        }
      }
    }
    for (const colName of this.masterColumns) {
      if (this.colsWithMapping.includes(colName)) {
        refersToColumns.push({ twName: 'tw1', colName: colName + PK_CELL_SUFFIX, pkColumn: parseInt(colName) });
      }
    }

    for (const item of refersToColumns) {
      const fkClass = (await this.dataSource.execute(
        `SELECT fk_class
         FROM data.class_column_mapping
         WHERE fk_column = $1
        `,
        [item.pkColumn]))?.[0]?.fk_class ?? [];

      item.vot = this.getTableFromClassVOT(fkClass);
    }

    this.refersToColumns = refersToColumns;
    return refersToColumns
  }

  private groupStatements(refersToColumns: TwNameColName[]) {
    if (!refersToColumns.length) return `,
    info_proj_rel AS (
      SELECT '[]'::json as json
    ),
    statement AS (
      SELECT '[]'::json as json
    )
    `;
    return `,
    info_proj_rel AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.proj_rel ->> 'pk_entity') t1.proj_rel as objects
        FROM
        (
          ${refersToColumns
        .map(item => `SELECT proj_rel FROM ${TW_JOIN_STMT}${item.colName}`)
        .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    statement AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', InfStatement.definition)} as objects
        FROM
        (
          ${refersToColumns
        .map(item => `SELECT * FROM ${TW_JOIN_STMT}${item.colName}`)
        .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    )`

  }


  private leftJoinStatements(refersToColumns: TwNameColName[], fkProject: number) {
    if (!refersToColumns.length) return '';
    const sqlPerCol: string[] = []
    for (const item of refersToColumns) {
      sqlPerCol.push(this.leftJoinStatement(item.twName, item.colName, fkProject))
    }
    const sql = ',\n' + sqlPerCol.join(',\n')
    return sql
  }


  private leftJoinStatement(twName: string, pkCellColName: string, fkProject: number) {
    return `
      -- statements where cell in column ${pkCellColName} 'refers to' entity
        ${TW_JOIN_STMT}${pkCellColName} AS (
        SELECT
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          ${twName}
          CROSS JOIN information.v_statement t1,
          projects.info_proj_rel t2
        WHERE
          ${twName}."${pkCellColName}" = t1.fk_subject_tables_cell
          AND t1.pk_entity = t2.fk_entity
          AND t1.fk_property = 1334
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      )
    `
  }


  private groupVOTs(refersToColumns: TwNameColName[]) {
    let sql = ',';

    if (refersToColumns.some(item => item.vot === 'appellation'))
      sql += `appellation AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfAppellation.definition)} as objects
          FROM
          (
            ${refersToColumns
          .filter(item => item.vot === 'appellation')
          .map(item => `SELECT * FROM ${TW_JOIN_VOT}${item.colName}`)
          .join('\nUNION ALL\n')}
          ) AS t1
        ) as t1
        GROUP BY true
      ),`
    else sql += `appellation AS (SELECT '[]'::json as json),`

    if (refersToColumns.some(item => item.vot === 'place'))
      sql += `place AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', InfPlace.definition)} as objects
        FROM
        (
          ${refersToColumns
          .filter(item => item.vot === 'place')
          .map(item => `SELECT * FROM ${TW_JOIN_VOT}${item.colName}`)
          .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    ),`
    else sql += `place AS (SELECT '[]'::json as json),`

    if (refersToColumns.some(item => item.vot === 'dimension'))
      sql += `dimension AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', InfDimension.definition)} as objects
        FROM
        (
          ${refersToColumns
          .filter(item => item.vot === 'dimension')
          .map(item => `SELECT * FROM ${TW_JOIN_VOT}${item.colName}`)
          .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    ),`
    else sql += `dimension AS (SELECT '[]'::json as json),`

    if (refersToColumns.some(item => item.vot === 'lang_string'))
      sql += `lang_string AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', InfLangString.definition)} as objects
        FROM
        (
          ${refersToColumns
          .filter(item => item.vot === 'lang_string')
          .map(item => `SELECT * FROM ${TW_JOIN_VOT}${item.colName}`)
          .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    ),`
    else sql += `lang_string AS (SELECT '[]'::json as json),`

    if (refersToColumns.some(item => item.vot === 'time_primitive'))
      sql += `time_primitive AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', InfTimePrimitive.definition)} as objects
        FROM
        (
          ${refersToColumns
          .filter(item => item.vot === 'time_primitive')
          .map(item => `SELECT * FROM ${TW_JOIN_VOT}${item.colName}`)
          .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    ),`
    else sql += `time_primitive AS (SELECT '[]'::json as json),`

    if (refersToColumns.some(item => item.vot === 'language'))
      sql += `language AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', InfLanguage.definition)} as objects
        FROM
        (
          ${refersToColumns
          .filter(item => item.vot === 'language')
          .map(item => `SELECT * FROM ${TW_JOIN_VOT}${item.colName}`)
          .join('\nUNION ALL\n')}
        ) AS t1
      ) as t1
      GROUP BY true
    ),`
    else sql += `language AS (SELECT '[]'::json as json),`

    return sql.slice(0, sql.length - 1);//remove last comma
  }

  private leftJoinValueObjectTables(refersToColumns: TwNameColName[]) {
    if (!refersToColumns.length) return '';
    const sqlPerCol: string[] = []
    for (const item of refersToColumns) {
      if (item.vot) sqlPerCol.push(this.leftJoinValueObjectTable(item))
    }
    if (sqlPerCol.length !== 0) return ',\n' + sqlPerCol.join(',\n')
    else return ''
  }


  private leftJoinValueObjectTable(item: TwNameColName): string {
    let modelDef: ModelDefinition;
    if (item.vot === 'appellation') modelDef = InfAppellation.definition;
    else if (item.vot === 'place') modelDef = InfPlace.definition;
    else if (item.vot === 'dimension') modelDef = InfDimension.definition;
    else if (item.vot === 'lang_string') modelDef = InfLangString.definition;
    else if (item.vot === 'time_primitive') modelDef = InfTimePrimitive.definition;
    else if (item.vot === 'language') modelDef = InfLanguage.definition;
    else throw new Error('Impossible error');

    return `
    ${TW_JOIN_VOT}${item.colName} AS (
        -- fetch the values object type for the statements
        SELECT
          ${this.createSelect('t1', modelDef)}
        FROM information.${item.vot === 'place' ? 'v_place' : item.vot} t1
        INNER JOIN ${TW_JOIN_STMT}${item.colName} ON t1.pk_entity = ${TW_JOIN_STMT}${item.colName}.fk_object_info
      )
    `
  }

  private addColumnSelects(columns: string[]) {
    return columns.map(pk => {
      const tableAlias = this.colTableAliasMap.get(pk);
      if (tableAlias) return this.addColumnSelect(pk, tableAlias)

      else {
        console.error('col table alias not found:', pk)
        return ''
      }
    }).join(',\n')
  }


  private addColumnSelect(colName: string, tableAlias: string) {
    return `json_build_object(
              'string_value', ${tableAlias}.string_value,
              'numeric_value', ${tableAlias}.numeric_value,
              'pk_cell', ${tableAlias}.pk_cell
            ) As "${colName}",
            ${tableAlias}.pk_cell AS "${colName}${PK_CELL_SUFFIX}"
            `
  }


  private addColumnFroms(columns: string[], pkEntity: number) {
    return columns.map(pk => {
      const tableAlias = this.colTableAliasMap.get(pk);
      if (tableAlias) return this.addColumnFrom(pk, tableAlias, pkEntity)
      else return ''
    }).join('\n')
  }


  private addColumnFrom(pkCol: string, tableAlias: string, pkEntity: number) {
    return `
          Left Join tables.cell_${pkEntity}  ${tableAlias}
          On t1.pk_row =  ${tableAlias}.fk_row
          And  ${tableAlias}.fk_column = ${this.addParam(parseInt(pkCol, 10))}`
  }

  private addColBatchWiths(columns: string[], pkEntity: number): string {
    return this.recurseColBatchWiths(columns, pkEntity).join(',\n')
  }

  private recurseColBatchWiths(columns: string[], pkEntity: number): string[] {

    let sqls: string[] = []

    const colBatch = columns.splice(0, 10);

    if (colBatch.length > 0) {
      sqls.push(this.addColBatchWith(`col_tw_${this.colBatchWithI}`, colBatch, pkEntity))

      this.colBatchWithI++;
      sqls = [...sqls, ... this.recurseColBatchWiths(columns, pkEntity) || []]
    }

    return sqls
  }

  private addColBatchWith(colBatchWith: string, columns: string[], pkEntity: number): string {
    this.colBatchWiths.push({ name: colBatchWith, columns })
    const sql = `
    ${colBatchWith} As (
        Select
           t1.pk_row ${columns.length ? ',' : ''}
           ${this.addColumnSelects(columns)}
        From
            tw1 t1
        ${this.addColumnFroms(columns, pkEntity)}
    )
    `
    return sql
  }

  private joinColBatchWiths(masterColumns: string[], sortBy: string, sortDirection: string) {
    let direction = 'ASC';
    if (sortBy === 'index') direction = sortDirection;

    return `
        Select
      ${[
        ...['pk_row', 'index', ...masterColumns].map(colName => `tw1."${colName}"`),
        ...this.colBatchWiths.map(w => w.columns.map(c => `${w.name}."${c}"`).join(',\n'))
      ].join(',\n')
      }
        From
          ${['tw1', ...this.colBatchWiths.map(w => w.name)].join(',\n')}
          ${this.colBatchWiths.length < 1 ? '' :
        `Where
            ${this.colBatchWiths
          .map((w) => `tw1.pk_row = ${w.name}.pk_row`)
          .join(' AND \n')}
        `
      }
    `
  }

  addFilters(filters: TColFilters) {
    let sql = ''
    for (const key in filters) {
      if (filters[key]) {
        const filter = filters[key];
        const tableAlias = key === 'pk_row' ? 't1' : this.colTableAliasMap.get(key);

        if (filter?.numeric) {
          const column = key === 'pk_row' ? 'pk_row' : 'numeric_value';

          sql = `${sql} AND ${tableAlias}."${column}" ${filter.numeric.operator} ${filter.numeric.value}`

        }
        else if (filter?.text) {
          const o = filter.text.operator
          sql = `${sql} AND ${tableAlias}.string_value::text ${o === '%iLike%' ?
            `iLike '%${filter.text.value}%'` :
            `iLike '%${filter.text.value}%'` // Default
            }`

        }
        else {
          console.error('filter data type is not clear')
        }
      }
    }

    return sql
  }

  private addOrderBy(options: GetTablePageOptions, colMeta: DatColumn[]): string {
    if (options.sortBy) {
      if (options.sortBy === 'index') {
        return `ORDER BY index ${options.sortDirection}`
      }
      else {
        const pkCol = options.sortBy
        const datCol = colMeta.find((col) => col.pk_entity === parseInt(pkCol, 10))
        const cellCol = datCol?.fk_data_type === 3292 ? 'string_value' : 'numeric_value';
        return `ORDER BY ${this.colTableAliasMap.get(pkCol)}.${cellCol} ${options.sortDirection}`
      }
    }
    return ''
  }

  private getTableFromClassVOT(fkClass: number): 'appellation' | 'place' | 'dimension' | 'lang_string' | 'time_primitive' | 'language' | undefined {
    const theClass = this.sysconfig.classes[fkClass];
    if (!theClass || !theClass.valueObjectType) return;
    if (theClass.valueObjectType.appellation) return 'appellation';
    if (theClass.valueObjectType.place) return 'place';
    if (theClass.valueObjectType.dimension) return 'dimension';
    if (theClass.valueObjectType.langString) return 'lang_string';
    if (theClass.valueObjectType.timePrimitive) return 'time_primitive';
    if (theClass.valueObjectType.language) return 'language';

    // const vots = Object.keys(theClass.valueObjectType).filter((vot: keyof ListType) => theClass.valueObjectType[vot]) //==> typescript does like it
  }

}
