
import { Observable, of, Subject } from 'rxjs';
import { SqlBuilder } from '../query/sql-builder';
import { Analysis, HookResult } from './analysis';
import { TableInput, TableOutput, TableQueryRes, TableExportFileType } from '../../common/interfaces'
import { isValidTableInput, isValidTableQueryRes, isValidTableOutput } from '../../common/validators'
import { takeUntil } from 'rxjs/operators';
import * as json2csv from 'json2csv';

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

  /**
 * execute the request, apply all hooks, convert to exportable object,
 * @return a promise useful for loopback
 */
  runAndExport(fileType: TableExportFileType): Promise<Result> {
    this.validateInputs()
      .pipe(
        this.applyHook(() => this.checkFeasibility()),
        this.applyHook(() => this.produceResult()),
        this.applyHook(() => this.convertForExport(fileType)),
        takeUntil(this.destroy$)
      ).subscribe(hookRes => {
        if (hookRes && hookRes.error) {
          this.reject(hookRes.error)
        } else if (hookRes.res !== undefined) {
          this.resolve(hookRes.res)
        } else {
          this.reject({
            name: 'Oops, something went wrong'
          })
        }
      })

    return this.promise;
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

  /**
  * Converts QueryRes to downloadable format;
  */
  convertForExport(filetype: TableExportFileType): Observable<HookResult<any>> {
    const allowedFileTypes = ['json', 'csv', 'xls'];

    if (allowedFileTypes.indexOf(filetype) === -1) {
      return of({
        error: {
          name: `Filetype "${filetype}" is not supported.`
        }
      })
    }
    if (this.result) {
      if (filetype === 'json') {

        return of({
          res: JSON.stringify({
            columns: this.getColumnLabelMap(),
            rows: this.result.rows
          }, null, 2)
        });

      } else if (filetype === 'csv') {

        const { fields, data } = this.flattenResults(this.result.rows);
        try {
          const parser = new json2csv.Parser({ fields });
          const csv = parser.parse(data);
          return of({ res: csv });
        } catch (err) {
          return of({
            error: {
              name: 'Error when creating csv.',
              message: err
            }
          })
        }

      } else if (filetype === 'xls') {
        const { fields, data } = this.flattenResults(this.result.rows);
        try {
          const parser = new json2csv.Parser({ fields, excelStrings: true });
          const xls = parser.parse(data);
          return of({ res: xls });
        } catch (err) {
          return of({
            error: {
              name: 'Error when creating csv.',
              message: err
            }
          })
        }
      }
    }
    return of({
      error: {
        name: `Something went wrong when exporting data.`
      }
    })
  }

  private getColumnLabelMap() {
    const columnLabelMap: { [colId: string]: string } = {}

    // map col.id to colLabel
    this.analysisDef.queryDefinition.columns.forEach(col => {
      columnLabelMap[col.id] = col && col.label ? col.label : col.id
    })
    return columnLabelMap
  }

  private flattenResults(resultObjects: any[]) {
    const fieldObj: { [key: string]: any } = {};
    const columnLabelMap = this.getColumnLabelMap()

    const flatResults = resultObjects.map(obj => {
      const flat: { [key: string]: any } = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          const colLabel = columnLabelMap[key]

          if (typeof element === 'object') {
            if (Array.isArray(element)) {
              flat[colLabel] = element.length;
              fieldObj[colLabel] = true;
            }
            else if (
              element.hasOwnProperty('entity_label')
            ) {
              flat[colLabel] = [element.class_label, element.entity_label].filter(x => !!x).join(' ');
              fieldObj[colLabel] = true;
              // ignore {} objects
            }
          } else {
            flat[colLabel] = element;
            fieldObj[colLabel] = true;
          }
        }
      }
      return flat;
    });


    return {
      fields: Object.keys(fieldObj),
      data: flatResults,
    };
  };

}
