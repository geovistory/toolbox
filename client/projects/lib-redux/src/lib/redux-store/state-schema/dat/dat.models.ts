import { ChunkSlice } from './chunk/dat-chunk.models';
import { ClassColumnMappingSlice } from './class_column_mapping/dat-class-column-mapping.models';



export interface DatState {
  // digital?: DigitalSlice;
  chunk?: ChunkSlice;
  class_column_mapping?: ClassColumnMappingSlice
  // column?: ColumnSlice;
  // text_property?: TextPropertySlice;
}

