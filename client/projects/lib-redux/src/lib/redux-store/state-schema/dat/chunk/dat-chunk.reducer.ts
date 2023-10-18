import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";

export const datChunkFeature = 'chunk'
export const datChunkReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => item.pk_entity.toString()
  },
  groupBy: [
    {
      keyInStore: 'fk_text',
      groupByFn: (item): string => item.fk_text.toString()
    }
  ]
}


export const datChunkReducers = new CrudReducerFactory(datFeatureKey, { [datChunkFeature]: datChunkReducerConfig }).createReducers();


