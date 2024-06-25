import { GvFieldPage, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { createReducer, on } from '@ngrx/store';
import { InfStatementSlice } from '../inf-statement.models';
import { getFromTo } from './getFromTo';
import { getStart } from './getStart';
import { paginationActions } from './pagination.actions';
import { subfieldIdToString } from './subfieldIdToString';


export const paginationReducer = createReducer<InfStatementSlice>({},
  on(paginationActions.loadPageSucceeded, (state, action) => {
    const { page, statements, count } = action;
    const { limit, offset } = page;
    state = reduceOnePage(state, page, limit, offset, statements, count);
    return state;
  }),
  on(paginationActions.loadPagesSucceeded, (state, action) => {
    action.pages.forEach(p => {
      const { page, statements, count } = p;
      const { limit, offset } = page;
      state = {
        ...reduceOnePage(state, page, limit, offset, statements, count)
      }
    })
    return state;
  })
)
/**
 * Reduces one page in the state.
 * @param state
 * @param page
 * @param limit
 * @param offset
 * @param statements
 * @param count
 * @returns
 */
function reduceOnePage(state: InfStatementSlice, page: GvFieldPage, limit: number, offset: number, statements: StatementWithTarget[], count: number) {
  const key = subfieldIdToString(page);
  const fromTo = getFromTo(limit, offset);
  const start = getStart(limit, offset);

  const rows = {};
  if (statements) {
    statements.forEach((stmt, i) => {
      rows[start + i] = stmt;
    });
  }
  state = {
    ...state,
    by_subfield_page: {
      ...state.by_subfield_page,
      [key]: {
        ...(state.by_subfield_page || {})[key],
        count: count || 0,
        rows: {
          ...((state.by_subfield_page || {})[key] || {}).rows,
          ...rows
        },
        loading: {
          ...((state.by_subfield_page || {})[key] || {}).loading,
          [fromTo]: false
        }
      }
    }
  };
  return state;
}

