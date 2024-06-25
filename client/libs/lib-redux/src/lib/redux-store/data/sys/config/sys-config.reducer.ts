import { SysConfig } from '@kleiolab/lib-config';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { sysFeatureKey } from "../sys.feature.key";

export const sysConfigFeature = 'config'
export const sysConfigReducerConfig: ReducerConfig<SysConfig> = {
  indexBy: {
    keyInStore: 'main',
    indexByFn: () => 'main'
  }
}

export const sysConfigReducers = createModelReducers(sysFeatureKey, sysConfigFeature, sysConfigReducerConfig)

