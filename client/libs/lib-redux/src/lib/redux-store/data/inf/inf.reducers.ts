import { combineReducers } from '@ngrx/store';

import { infAppellationReducers } from './appellation/inf-appellation.reducer';
import { infDimensionReducers } from './dimension/inf-dimension.reducer';
import { InfState } from './inf.models';
import { infLanguageReducers } from './language/inf-language.reducer';
import { infLangStringReducers } from './lang_string/inf-lang-string.reducer';
import { infPlaceReducers } from './place/inf-place.reducer';
import { infResourceReducers } from './resource/inf-resource.reducer';
import { infStatementReducers } from './statement/inf-statement.reducer';
import { infTimePrimitiveReducers } from './time_primitive/inf-time-primitive.reducer';

export const infReducers = combineReducers<InfState>({
  resource: infResourceReducers,
  statement: infStatementReducers,
  place: infPlaceReducers,
  time_primitive: infTimePrimitiveReducers,
  language: infLanguageReducers,
  appellation: infAppellationReducers,
  lang_string: infLangStringReducers,
  dimension: infDimensionReducers,
})
