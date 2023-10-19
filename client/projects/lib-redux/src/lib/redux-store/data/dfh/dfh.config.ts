import { ReducerConfigCollection } from '../_lib/crud-reducer-factory';
import { dfhClassReducerConfig } from './klass/dfh-class.reducer';
import { dfhLabelReducerConfig } from './label/dfh-label.reducer';
import { dfhProfileReducerConfig } from './profile/dfh-profile.reducer';
import { dfhPropertyReducerConfig } from './property/dfh-property.reducer';

export const dfhDefinitions: ReducerConfigCollection = {
  klass: dfhClassReducerConfig,
  property: dfhPropertyReducerConfig,
  label: dfhLabelReducerConfig,
  profile: dfhProfileReducerConfig
}
