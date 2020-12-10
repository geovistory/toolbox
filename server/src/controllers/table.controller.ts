import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { inject } from '@loopback/context';
import { tags } from '@loopback/openapi-v3/dist/decorators/tags.decorator';
import { get, param, post, requestBody } from '@loopback/rest';
import { Roles } from '../components/authorization/keys';
import { QTableColumns } from '../components/query/q-table-columns';
import { GetTablePageOptions, QTableTablePage, TablePageResponse } from '../components/query/q-table-page';
import { Postgres1DataSource } from '../datasources';
import { DatColumn } from '../models/dat-column.model';
import { GvSchemaObject } from '../models/gv-schema-object.model';
import { keys, uniq } from 'ramda';
import { QTableDatColumns } from '../components/query/q-table-dat-columns';

/**
 * A controller to get data from and about tables (digitals)
 */
@tags('table')
export class TableController {
  constructor(
    @inject('datasources.postgres1') private dataSource: Postgres1DataSource,
  ) { }


  @get('/get-columns-of-table', {
    description: 'Get the columns of a table (digital) with column names and column mappings.',
    responses: {
      '200': {
        description: 'Ok',
        content: { 'application/json': { schema: { 'x-ts-type': GvSchemaObject } } },
      },
    },
  })
  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  getTableColumns(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkDigital', { required: true }) pkDigital: number,
  ): Promise<GvSchemaObject> {
    return new QTableColumns(this.dataSource).query(pkProject, pkDigital)
  }

  @post('/get-table-page', {
    description: 'Get rows (with cells) of a table according to the specified columns, limit, offset and sorting.',
    responses: {
      '200': {
        description: 'Ok',
        content: { 'application/json': { schema: { 'x-ts-type': TablePageResponse } } },
      },
    },
  })
  @authenticate('basic')
  @authorize({ allowedRoles: [Roles.PROJECT_MEMBER] })
  async getTablePage(
    @param.query.number('pkProject', { required: true }) pkProject: number,
    @param.query.number('pkEntity', { required: true }) pkEntity: number,
    @requestBody() options: GetTablePageOptions
  ): Promise<TablePageResponse> {

    // this array contains DatColumns needed to build the query
    let datColumns: DatColumn[] = []

    // ensure at least one column is given, if no col specified, query all cols.
    options.columns = options.columns ?? [];
    if (!(options?.columns?.length >= 1)) {
      const schemaObj = await this.getTableColumns(pkProject, pkEntity)
      if (schemaObj?.dat?.column) {
        for (const col of schemaObj.dat.column) {
          if (col.pk_entity) options.columns.push(col.pk_entity.toString())
        }
      }

    }
    // ensure columns are strings
    options.columns = options.columns.map(col => col.toString())
    options.sortBy = options.sortBy.toString()

    // filter and orderby columns
    let masterColumns: string[] = [];

    // add sort-by column
    if (options.sortBy && options.sortBy !== 'pk_row') {
      masterColumns = [options.sortBy]
    }

    // add filter columns
    const filterCols = keys(options.filters);

    // console.log('filterCols', JSON.stringify(filterCols))
    // console.log('options', JSON.stringify(options))

    if (options.filters && filterCols.length > 0) {
      masterColumns = [
        ...masterColumns,
        ...filterCols.filter(col => col !== 'pk_row').map(col => col.toString())
      ]
    }

    // ensure masterColums are unique
    masterColumns = uniq(masterColumns);

    // get meta info about master columns
    if (masterColumns.length > 0) {
      datColumns = await this.getDatColumnArray(pkProject, masterColumns.map(c => parseInt(c, 10)))
    }

    options.limit = options.limit <= 100 ? options.limit : 100;

    return new QTableTablePage(this.dataSource).query(pkProject, pkEntity, options, masterColumns, datColumns)
  }



  /**
   * query array of datColumn for given array of columns
   */
  async getDatColumnArray(fkProject: number, pkColumns: number[]): Promise<DatColumn[]> {
    return new QTableDatColumns(this.dataSource).query(fkProject, pkColumns)
  }


}
