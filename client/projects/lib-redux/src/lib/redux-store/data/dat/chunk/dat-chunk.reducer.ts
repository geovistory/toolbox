import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";
import { ChunkSlice } from './dat-chunk.models';

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


export const datChunkReducers = createModelReducers<ChunkSlice>(datFeatureKey, datChunkFeature, datChunkReducerConfig);

