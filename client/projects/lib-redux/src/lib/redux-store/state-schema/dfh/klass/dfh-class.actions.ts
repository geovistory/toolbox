import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { dfhFeatureKey } from "../dfh.feature.key";
import { dfhClassFeature } from './dfh-class.reducer';

export const dfhClassActions = new CrudActionsFactory<DfhClass>(dfhFeatureKey, dfhClassFeature)
