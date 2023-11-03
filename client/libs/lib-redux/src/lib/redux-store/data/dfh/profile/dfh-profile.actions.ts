import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { dfhFeatureKey } from "../dfh.feature.key";
import { dfhProfileFeature } from './dfh-profile.reducer';

export const dfhProfileActions = new CrudActionsFactory<DfhProfile>(dfhFeatureKey, dfhProfileFeature)
