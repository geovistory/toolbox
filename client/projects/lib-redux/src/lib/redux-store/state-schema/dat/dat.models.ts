import { ChunkSlice } from './chunk/dat-chunk.models';
import { ClassColumnMappingSlice } from './class_column_mapping/dat-class-column-mapping.models';
import { ColumnSlice } from './column/dat-column.models';
import { DigitalSlice } from './digital/dat-digital.models';
import { NamespaceSlice } from './namespace/dat-namespace.models';



export interface DatState {
  digital?: DigitalSlice;
  chunk?: ChunkSlice;
  class_column_mapping?: ClassColumnMappingSlice
  column?: ColumnSlice;
  namespace?: NamespaceSlice;
  // text_property?: TextPropertySlice;
}

