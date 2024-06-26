import { combineReducers } from '@ngrx/store';

import { sysConfigReducers } from './config/sys-config.reducer';
import { SysState } from './sys.models';
import { sysSystemRelevantClassReducers } from './system_relevant_class/sys-system-relevant-class.reducer';

export const sysReducers = combineReducers<SysState>({
  config: sysConfigReducers,
  system_relevant_class: sysSystemRelevantClassReducers,
})
