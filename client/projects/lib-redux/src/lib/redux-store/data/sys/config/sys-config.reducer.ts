import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { sysFeatureKey } from "../sys.feature.key";

export const sysConfigFeature = 'config'
export const sysConfigReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'main',
    indexByFn: () => 'main'
  }
}

export const sysConfigReducers = new CrudReducerFactory(sysFeatureKey, { [sysConfigFeature]: sysConfigReducerConfig }).createReducers();

