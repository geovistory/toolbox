import { DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { dfhFeatureKey } from "../dfh.feature.key";
import { dfhPropertyFeature } from './dfh-property.reducer';

export const dfhPropertyActions = new CrudActionsFactory<DfhProperty>(dfhFeatureKey, dfhPropertyFeature)
