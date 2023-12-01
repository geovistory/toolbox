import { GvFieldPage, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { createActionGroup, props } from '@ngrx/store';


export const paginationActions = createActionGroup({
  source: 'INF STATEMENT PAGINATION',
  events: {
    'Load Page Succeeded': props<{ statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number }>(),
    'Load Pages Succeeded': props<{ pages: { statements: StatementWithTarget[], count: number, page: GvFieldPage, pk?: number }[] }>(),
  }
})
