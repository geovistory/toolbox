import { ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { dfhClassReducerConfig } from './klass/dfh-class.reducer';
import { dfhPropertyReducerConfig } from './property/dfh-property.reducer';

export const dfhDefinitions: ReducerConfigCollection = {
  klass: dfhClassReducerConfig,
  property: dfhPropertyReducerConfig
}
