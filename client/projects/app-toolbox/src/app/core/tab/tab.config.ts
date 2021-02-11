import { ReducerConfigCollection } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { TabCell } from "@kleiolab/lib-sdk-lb4";

export const tabRoot = 'tab';

export const tabDefinitions: ReducerConfigCollection = {
  cell: {
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
}
