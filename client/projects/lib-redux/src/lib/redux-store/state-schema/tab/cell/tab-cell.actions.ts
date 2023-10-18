import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { tabFeatureKey } from "../tab.feature.key";
import { tabCellFeature } from './tab-cell.reducer';

export const tabCellActions = new CrudActionsFactory<TabCell>(tabFeatureKey, tabCellFeature)
