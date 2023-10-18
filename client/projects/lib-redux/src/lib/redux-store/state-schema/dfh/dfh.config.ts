import { ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { dfhSystemRelevantClassReducerConfig } from './dfhtem_relevant_class/dfh-dfhtem-relevant-class.reducer';
import { dfhClassReducerConfig } from './klass/dfh-class.reducer';

export const dfhDefinitions: ReducerConfigCollection = {
  config: dfhClassReducerConfig,
  dfhtem_relevant_class: dfhSystemRelevantClassReducerConfig
}
