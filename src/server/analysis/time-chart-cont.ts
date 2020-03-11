import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ChartLine, TimeChartContInput, TimeChartContOutput } from '../../common/interfaces';
import { isValidTimeChartContInput, isValidTimeChartContOutput, isValidTimeChartContQueryRes } from '../../common/validators';
import { SqlBuilder } from './sql-builder';
import { Analysis } from './analysis';
import { HookResult } from '../utils/interfaces';



type Result = TimeChartContOutput;

export class AnalysisTimeChartCont extends Analysis<Result>   {
  result: Result | undefined;


  constructor(
    private connector: any,
    private pkProject: number,
    private analysisDef: TimeChartContInput,
  ) {
    super()
  }
  validateInputs(): Observable<HookResult<Result>> {
    const v = isValidTimeChartContInput(this.analysisDef);
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
    combineLatest(this.analysisDef.lines.map((timeChartContLine, i) => {
      const q = new SqlBuilder().buildCountQuery(timeChartContLine.queryDefinition, this.pkProject)
      const q$ = new Subject();
      this.connector.execute(q.sql, q.params, (err: any, resultObjects: any) => {
        if (err) {
          s$.next({
            error: {
              name: `Error when counting the number of resulting rows for line nr. ${i + 1}`
            }
          })
        }
        else {
          if (resultObjects[0].count < 100000) {
            q$.next()
          }
          else {
            s$.next({
              error: {
                name: `Your query gives too large result. Please narrow down the filter for line nr. ${i + 1}`
              }
            })
          }
        }
      });

      return q$;
    })).pipe(first(), takeUntil(s$)).subscribe(() => s$.next())

    return s$;
  }
  /**
   * Run the query and produce the result
   */
  produceResult(): Observable<HookResult<Result>> {

    const s$ = new Subject<HookResult<Result>>()
    combineLatest(this.analysisDef.lines.map((timeChartContLine, i) => {
      const q = new SqlBuilder().buildQuery(timeChartContLine.queryDefinition, this.pkProject)
      const q$ = new Subject<ChartLine>();
      this.connector.execute(q.sql, q.params, (err: any, resultObjects: any) => {
        if (err) {
          s$.next({
            error: {
              name: `Error on query for line nr. ${i + 1}`,
              message: err
            }
          })
        }
        else {
          const v = isValidTimeChartContQueryRes(resultObjects)
          if (v.validObj) {
            const chartLine: ChartLine = {
              label: timeChartContLine.visualizationDefinition.label,
              linePoints: v.validObj[0].temporal_distribution
            }
            q$.next(chartLine)
          } else {
            s$.next({
              error: {
                name: 'Invalid query results.',
                message: v.error
              }
            })
          }
        }
      });

      return q$;
    })).pipe(first(), takeUntil(s$)).subscribe((chartLines) => {
      this.result = {
        activeLine: 0,
        chartLines
      }
      s$.next()
    })

    return s$;


  }
  validateOutput(): Observable<HookResult<Result>> {

    const v = isValidTimeChartContOutput(this.result)

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
