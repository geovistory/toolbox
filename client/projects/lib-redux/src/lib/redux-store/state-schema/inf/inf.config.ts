import { ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { infAppellationReducerConfig } from './appellation/inf-appellation.reducer';
import { infDimensionReducerConfig } from './dimension/inf-dimension.reducer';
import { infLanguageReducerConfig } from './language/inf-language.reducer';
import { infLangStringReducerConfig } from './lang_string/inf-lang-string.reducer';
import { infPlaceReducerConfig } from './place/inf-place.reducer';
import { infResourceReducerConfig } from './resource/inf-resource.reducer';
import { infStatementReducerConfig } from './statement/inf-statement.reducer';
import { infTimePrimitiveReducerConfig } from './time_primitive/inf-time-primitive.reducer';

export const infDefinitions: ReducerConfigCollection = {
  appellation: infAppellationReducerConfig,
  dimension: infDimensionReducerConfig,
  langString: infLangStringReducerConfig,
  language: infLanguageReducerConfig,
  place: infPlaceReducerConfig,
  resource: infResourceReducerConfig,
  statement: infStatementReducerConfig,
  timePrimitive: infTimePrimitiveReducerConfig,
}
