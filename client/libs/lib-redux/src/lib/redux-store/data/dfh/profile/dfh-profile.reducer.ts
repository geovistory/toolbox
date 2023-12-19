import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { dfhFeatureKey } from "../dfh.feature.key";

export const dfhProfileFeature = 'profile'
export const dfhProfileReducerConfig: ReducerConfig<DfhProfile> = {
  indexBy: {
    keyInStore: 'pk_profile',
    indexByFn: (item: DfhProfile) => item.pk_profile.toString()
  }
}

export const dfhProfileReducers = createModelReducers(dfhFeatureKey, dfhProfileFeature, dfhProfileReducerConfig)

