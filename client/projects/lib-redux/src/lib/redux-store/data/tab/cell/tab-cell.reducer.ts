import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { tabFeatureKey } from "../tab.feature.key";

export const tabCellFeature = 'cell'
export const tabCellReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_cell',
    indexByFn: (item: TabCell) => item.pk_cell.toString()
  },
  groupBy: [
    {
      keyInStore: 'fk_column_fk_row',
      groupByFn: (item: TabCell): string => item.fk_column + '_' + item.fk_row
    }
  ]
}
export const tabCellReducers = createModelReducers(tabFeatureKey, tabCellFeature, tabCellReducerConfig)

