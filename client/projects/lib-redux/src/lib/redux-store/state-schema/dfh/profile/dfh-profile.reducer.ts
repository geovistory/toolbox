import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { dfhFeatureKey } from "../dfh.feature.key";

export const dfhProfileFeature = 'profile'
export const dfhProfileReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_profile',
    indexByFn: (item: DfhProfile) => item.pk_profile.toString()
  }
}

export const dfhProfileReducers = new CrudReducerFactory(dfhFeatureKey, { [dfhProfileFeature]: dfhProfileReducerConfig }).createReducers();

