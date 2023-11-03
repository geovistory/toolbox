import { ReducerConfigCollection } from '../_lib/crud-reducer-factory';
import { tabCellReducerConfig } from './cell/tab-cell.reducer';

export const tabDefinitions: ReducerConfigCollection = {
  cell: tabCellReducerConfig
}
