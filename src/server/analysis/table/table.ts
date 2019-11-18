import { Observable, of, Subject } from 'rxjs';
import { SqlBuilder } from '../../query/sql-builder';
import { Analysis, HookResult } from '../analysis';
import { TableInput, TableOutput, TableQueryRes } from '../../../common/interfaces'
import { isValidTableInput, isValidTableQueryRes, isValidTableOutput } from '../../../common/validators'

type Result = TableOutput;

export class AnalysisTable extends Analysis<Result>   {
  result: Result | undefined;

  fullCount: number | undefined;

  constructor(
    private connector: any,
    private pkProject: number,
    private analysisDef: TableInput,
  ) {
    super()
  }
  validateInputs(): Observable<HookResult<Result>> {
    const v = isValidTableInput(this.analysisDef);
    if (v.validObj) {
      return of({})
    }
    else {
      return of({
        error: {
          name: 'Invalid analysis definition',
          message: v.error
        }
      })
    }
  }
  checkFeasibility(): Observable<HookResult<Result>> {

    const s$ = new Subject<HookResult<Result>>()
    const q = new SqlBuilder().buildCountQuery(this.analysisDef.queryDefinition, this.pkProject)
    this.connector.execute(q.sql, q.params, (err: any, resultObjects: any) => {
      if (err) {
        s$.next({
          error: {
            name: `Error when counting the number of resulting rows`
          }
        })
      }
      else {
        this.fullCount = parseInt(resultObjects[0].count, 10);
        s$.next()
      }
    });
    return s$;
  }
  /**
   * Run the query and produce the result
   */
  produceResult(): Observable<HookResult<Result>> {

    const s$ = new Subject<HookResult<Result>>()
    const q = new SqlBuilder().buildQuery(this.analysisDef.queryDefinition, this.pkProject)

    this.connector.execute(q.sql, q.params, (err: any, resultObjects: TableQueryRes) => {
      if (err) {
        s$.next({
          error: {
            name: `Error on query`,
            message: err
          }
        })
      }
      else {
        const v = isValidTableQueryRes(resultObjects)
        if (typeof this.fullCount !== 'number') {
          s$.next({
            error: {
              name: 'Something went wrong with counting the results.'
            }
          })
        }
        else if (v.validObj) {
          this.result = {
            full_count: this.fullCount,
            rows: v.validObj
          }
          s$.next()
        } else {
          s$.next({
            error: {
              name: 'Invalid query results.',
              message: v.error
            }
          })
        }
      }
    })

    return s$;


  }
  validateOutput(): Observable<HookResult<Result>> {

    const v = isValidTableOutput(this.result)

    if (v.validObj) {
      return of({ res: v.validObj })
    } else {
      return of({
        error: {
          name: 'Invalid output.',
          message: v.error
        }
      })
    }
  }

}
