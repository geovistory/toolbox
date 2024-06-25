import { combineReducers } from '@ngrx/store';

import { tabCellReducers } from './cell/tab-cell.reducer';
import { TabState } from './tab.models';

export const tabReducers = combineReducers<TabState>({
  cell: tabCellReducers
})
