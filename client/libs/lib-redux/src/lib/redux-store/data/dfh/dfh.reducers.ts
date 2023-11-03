import { combineReducers } from '@ngrx/store';

import { DfhState } from './dfh.models';
import { dfhClassReducers } from './klass/dfh-class.reducer';
import { dfhLabelReducers } from './label/dfh-label.reducer';
import { dfhProfileReducers } from './profile/dfh-profile.reducer';
import { dfhPropertyReducers } from './property/dfh-property.reducer';

export const dfhReducers = combineReducers<DfhState>({
  profile: dfhProfileReducers,
  klass: dfhClassReducers,
  property: dfhPropertyReducers,
  label: dfhLabelReducers,
})
