import { ErrorObj, Lb3App, Lb3Connector, SchemaQueryRes } from '../utils/interfaces';
import { GetColumnsSqlBuilder } from './sql-builders/get-columns-sql-builder';
import { GetTablePageSqlBuilder } from './sql-builders/get-table-page-sql-builder';
import { GetDatColumnsArray } from './sql-builders/get-dat-columns-array';
import { keys, uniq } from 'ramda';
import { GetTablePageOptions, DatColumn } from './interfaces';


/**
 * This class handles remote methods for loopback.
 */
export class TableRemotes {
  private resolver!: ((value?: any | PromiseLike<any>) => void);
  private rejector!: ((reason?: ErrorObj) => void);

  promise = new Promise<any>((res, rej) => {
    this.resolver = res;
    this.rejector = rej;
  })

  connector: Lb3Connector;

  constructor(private lb3App: Lb3App) {
    this.connector = lb3App.dataSources.postgres1.connector
  }

  /**
   * Queries a page of table
   * @param fkProject
   * @param pkEntity
   * @param options
   */
  async getPage(fkProject: number, pkEntity: number, options: GetTablePageOptions): Promise<any> {
    // this array contains DatColumns needed to build the query
    let datColumns: DatColumn[] = []

    // ensurepkEntity is number, to avoid SQL injection
    if (typeof pkEntity !== 'number') {
      return Promise.reject<ErrorObj>({
        name: `Error when querying table`,
        message: 'pkEntity is not a number'
      });
    }

    // ensure at least one column is given, if no col specified, query all cols.
    if (!(options ?.columns ?.length >= 1)) {
      await this.getColumns(fkProject, pkEntity).then(cols => {
        options.columns = cols.dat.column.map(col => col.pk_entity.toString())
      })
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
      await this.getDatColumnArray(fkProject, masterColumns.map(c => parseInt(c, 10))).then(res => {
        datColumns = res
      })
    }

    options.limit = options.limit <= 100 ? options.limit : 100;

    // options.columns = [24626664, 24626666]; // {24626628,24626630,24626632,24626634,24626636,24626638,24626640,24626642,24626644,24626646,24626648,24626650,24626652,24626654,24626656,24626658,24626660,24626662,24626664,24626666,24626668,24626670,24626672,24626674,24626676,24626678,24626680,24626682,24626684,24626686,24626688,24626690,24626692,24626694,24626696,24626698,24626700,24626702,24626704,24626706,24626708,24626710,24626712,24626714,24626716,24626718,24626720,24626722,24626724,24626726,24626728,24626730,24626732,24626734,24626736,24626738,24626740,24626742,24626744,24626746,24626748,24626750,24626752,24626754,24626756,24626758,24626760,24626762,24626764,24626766,24626768,24626770,24626772,24626774,24626776,24626778,24626780,24626788}
    const q = new GetTablePageSqlBuilder().buildQuery(fkProject, pkEntity, options, masterColumns, datColumns)

    this.connector.execute(q.sql, q.params, (err: any, res: any) => {
      if (err) {
        this.rejector({
          name: `Error when querying table`,
          message: err
        })
      }
      else {
        this.resolver({
          columns: options.columns,
          rows: res[0].data.rows,
          length: res[0].data.length,
        })
      }
    });

    return this.promise;
  }

  /**
   * queries the columns of a table returing a schema object
   */
  async  getColumns(fkProject: number, pkEntity: number) {
    const q = new GetColumnsSqlBuilder(this.lb3App.models).buildQuery(fkProject, pkEntity)

    return new Promise<SchemaQueryRes>((res, rej) => {

      this.connector.execute(q.sql, q.params, (err: any, resultObjects: { data: SchemaQueryRes }[]) => {
        if (err) {
          rej({
            name: `Error when querying columns`,
            message: err
          })
        }
        else {
          res(resultObjects[0].data)
        }
      });
    })
  }

  /**
   * queries array of datColumn for given array of columns
   */
  async  getDatColumnArray(fkProject: number, pkColumns: number[]) {
    const q = new GetDatColumnsArray(this.lb3App.models).buildQuery(fkProject, pkColumns)

    return new Promise<DatColumn[]>((res, rej) => {

      this.connector.execute(q.sql, q.params, (err: any, resultObjects: DatColumn[]) => {
        if (err) {
          rej({
            name: `Error when querying dat column array`,
            message: err
          })
        }
        else {
          res(resultObjects)
        }
      });
    })
  }

}
