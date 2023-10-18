import { DfhClassSlice } from './klass/dfh-class.models';
import { DfhLabelSlice } from './label/dfh-label.models';
import { DfhPropertySlice } from './property/dfh-property.models';

export interface DfhState {
  // profile?: DfhProfileSlice;
  klass?: DfhClassSlice;
  property?: DfhPropertySlice;
  label?: DfhLabelSlice;
}
