import { ReducerConfigCollection } from '../_lib/crud-reducer-factory';
import { datChunkReducerConfig } from './chunk/dat-chunk.reducer';
import { datClassColumnMappingReducerConfig } from './class_column_mapping/dat-class-column-mapping.reducer';
import { datColumnReducerConfig } from './column/dat-column.reducer';
import { datDigitalReducerConfig } from './digital/dat-digital.reducer';
import { datNamespaceReducerConfig } from './namespace/dat-namespace.reducer';
import { datTextPropertyReducerConfig } from './text_property/dat-text-property.reducer';

export const datDefinitions: ReducerConfigCollection = {
  digital: datDigitalReducerConfig,
  chunk: datChunkReducerConfig,
  class_column_mapping: datClassColumnMappingReducerConfig,
  column: datColumnReducerConfig,
  namespace: datNamespaceReducerConfig,
  text_property: datTextPropertyReducerConfig,
}
