import { Observable, of, Subject } from 'rxjs';
import { MapAndTimeContInput, MapAndTimeContOutput, MapAndTimeContQueryRes } from '../../common/interfaces';
import { isValidMapAndTimeContInput } from '../../common/validators/map-and-time-cont-input.validator';
import { isValidMapAndTimeContOutput } from '../../common/validators/map-and-time-cont-output.validator';
import { isValidMapAndTimeContQueryRes } from '../../common/validators/map-and-time-cont-query-res.validator';
import { SqlBuilder } from './sql-builder';
import { Analysis } from './analysis';
import { SqlBuilderMapAndTime } from './sql-builder-map-and-time';
import { HookResult } from '../utils/interfaces';

type Result = MapAndTimeContOutput;

export class AnalysisMapAndTimeCont extends Analysis<Result>   {
  result: Result | undefined;

  fullCount: number | undefined;

  constructor(
    private connector: any,
    private pkProject: number,
    private analysisDef: MapAndTimeContInput,
  ) {
    super()
  }
  validateInputs(): Observable<HookResult<Result>> {
    const v = isValidMapAndTimeContInput(this.analysisDef);
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
        if (this.fullCount < 100) {
          s$.next()
        }
        else {
          s$.next({
            error: {
              name: `Too many results: ${this.fullCount} (max: 100)`,
              message: `Tipp: Restrict the filter to Geographical Places or Built Works that have the properties you are looking for in the 'Path' (you defined below the filter).`
            }
          })
        }
      }
    });
    return s$;
  }
  /**
   * Run the query and produce the result
   */
  produceResult(): Observable<HookResult<Result>> {

    const s$ = new Subject<HookResult<Result>>()
    const q = new SqlBuilderMapAndTime().buildQuery(this.analysisDef.queryDefinition, this.pkProject)

    this.connector.execute(q.sql, q.params, (err: any, resultObjects: MapAndTimeContQueryRes) => {
      if (err) {
        s$.next({
          error: {
            name: `Error on query`,
            message: err
          }
        })
      }
      else {
        const v = isValidMapAndTimeContQueryRes(resultObjects)
        if (typeof this.fullCount !== 'number') {
          s$.next({
            error: {
              name: 'Something went wrong with counting the results.'
            }
          })
        }
        else if (v.validObj) {
          this.result = v.validObj
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

    const v = isValidMapAndTimeContOutput(this.result)

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

