import { combineReducers } from 'redux';
import { datChunkReducers } from './chunk/dat-chunk.reducer';
import { datClassColumnMappingReducers } from './class_column_mapping/dat-class-column-mapping.reducer';
import { datColumnReducers } from './column/dat-column.reducer';
import { DatState } from './dat.models';
import { datDigitalReducers } from './digital/dat-digital.reducer';
import { datNamespaceReducers } from './namespace/dat-namespace.reducer';
import { datTextPropertyReducers } from './text_property/dat-text-property.reducer';

export const datReducers = combineReducers<DatState>({
  chunk: datChunkReducers,
  class_column_mapping: datClassColumnMappingReducers,
  column: datColumnReducers,
  digital: datDigitalReducers,
  namespace: datNamespaceReducers,
  text_property: datTextPropertyReducers
})
