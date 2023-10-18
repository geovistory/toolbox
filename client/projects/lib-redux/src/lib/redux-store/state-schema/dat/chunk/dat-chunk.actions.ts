import { DatChunk } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { datFeatureKey } from "../dat.feature.key";
import { datChunkFeature } from './dat-chunk.reducer';

export const datChunkActions = new CrudActionsFactory<DatChunk>(datFeatureKey, datChunkFeature)
