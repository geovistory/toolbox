import { ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { tabCellReducerConfig } from './cell/tab-cell.reducer';

export const tabDefinitions: ReducerConfigCollection = {
  cell: tabCellReducerConfig
}
