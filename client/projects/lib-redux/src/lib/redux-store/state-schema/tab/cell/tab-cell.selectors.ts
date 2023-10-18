import { createSelector } from '@ngrx/store';
import { getTabState } from '../tab.selectors';

const getFeatureState = createSelector(getTabState, s => s?.cell);

export const indexState = createSelector(getFeatureState, state => state?.by_pk_cell);
const byColumnRowState = createSelector(getFeatureState, state => state?.by_fk_column_fk_row);

export const getCell = {
  byPk: (pkCell: number) => createSelector(indexState, s => s?.[pkCell]),
  byColumnRow: (col: number, row: number) => createSelector(byColumnRowState, s => s?.[col + '_' + row]),
}

