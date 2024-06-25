import { DfhLabel } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { dfhFeatureKey } from "../dfh.feature.key";
import { dfhLabelFeature } from './dfh-label.reducer';

export const dfhLabelActions = new CrudActionsFactory<DfhLabel>(dfhFeatureKey, dfhLabelFeature)
