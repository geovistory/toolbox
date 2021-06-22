import { AnalysisTableCell, AnalysisTableRequest, AnalysisTableResponse } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class MockAnalysisService {
  analysisControllerTableRun(analysisTableRequest?: AnalysisTableRequest): Observable<AnalysisTableResponse> {
    const def = analysisTableRequest.analysisDefinition.queryDefinition

    const rows: { [key: string]: AnalysisTableCell; }[] = []

    const full_count = 1234
    const max = def.offset + def.limit > full_count ? full_count : def.limit + def.offset;

    for (let i = def.offset ?? 0; i < max; i++) {
      const row: { [key: string]: AnalysisTableCell; } = {}
      def.columns.forEach(col => {
        row[col.id] = { entityLabel: 'line ' + i }
      })
      rows.push(row)
    }

    const res: AnalysisTableResponse = {
      rows,
      full_count
    }
    console.log(this.constructor.name, {
      offset: def.offset, limit: def.limit,
      reslength: res.rows.length,
      result: res
    })
    return of(res).pipe(delay(1000))
  }

}
