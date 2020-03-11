import { ErrorObj } from '../utils/interfaces';
import { GetTableOptions, GetTablePageSqlBuilder, TabRow } from './get-table-page-sql-builder';


/**
 * This class handles remote methods for loopback.
 */
export class TableRemotes {
  private resolver!: ((value?: any | PromiseLike<any>) => void);
  private rejector!: ((reason?: ErrorObj) => void);

  promise = new Promise((res, rej) => {
    this.resolver = res;
    this.rejector = rej;
  })

  constructor(private connector: any) { }

  /**
   * Queries a page of table
   * @param fkProject
   * @param pkEntity
   * @param options
   */
  getPage(fkProject: number, pkEntity: number, options: GetTableOptions): Promise<any> {
    // ensurepkEntity is number, to avoid SQL injection
    if (typeof pkEntity !== 'number') {
      return Promise.reject<ErrorObj>({
        name: `Error when querying table`,
        message: 'pkEntity is not a number'
      });
    }

    // ensure at least one column is given
    if (!(options.columns.length >= 1)) {
      return Promise.reject<ErrorObj>({
        name: `Error when querying table`,
        message: 'At least one column is needed'
      });
    }
    options.limit = options.limit <= 100 ? options.limit : 100;

    // options.columns = [24626664, 24626666]; // {24626628,24626630,24626632,24626634,24626636,24626638,24626640,24626642,24626644,24626646,24626648,24626650,24626652,24626654,24626656,24626658,24626660,24626662,24626664,24626666,24626668,24626670,24626672,24626674,24626676,24626678,24626680,24626682,24626684,24626686,24626688,24626690,24626692,24626694,24626696,24626698,24626700,24626702,24626704,24626706,24626708,24626710,24626712,24626714,24626716,24626718,24626720,24626722,24626724,24626726,24626728,24626730,24626732,24626734,24626736,24626738,24626740,24626742,24626744,24626746,24626748,24626750,24626752,24626754,24626756,24626758,24626760,24626762,24626764,24626766,24626768,24626770,24626772,24626774,24626776,24626778,24626780,24626788}
    const q = new GetTablePageSqlBuilder().buildQuery(fkProject, pkEntity, options)



    this.connector.execute(q.sql, q.params, (err: any, resultObjects: TabRow[]) => {
      if (err) {
        this.rejector({
          name: `Error when querying table`,
          message: err
        })
      }
      else {
        this.resolver(resultObjects)
      }
    });

    return this.promise;
  }

  /**
   * queries the columns of a table
   */
  getColumns() {

  }
}
