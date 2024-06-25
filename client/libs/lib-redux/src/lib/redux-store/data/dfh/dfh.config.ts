import { dfhClassReducerConfig } from './klass/dfh-class.reducer';
import { dfhLabelReducerConfig } from './label/dfh-label.reducer';
import { dfhProfileReducerConfig } from './profile/dfh-profile.reducer';
import { dfhPropertyReducerConfig } from './property/dfh-property.reducer';

export class dfhDefinitions {
  klass = dfhClassReducerConfig
  property = dfhPropertyReducerConfig
  label = dfhLabelReducerConfig
  profile = dfhProfileReducerConfig
}
