import { SysConfigSlice } from './config/sys-config.models';
import { SysRelevantClassSlice } from './system_relevant_class/sys-system-relevant-class.models';

export interface SysState {
  config?: SysConfigSlice;
  system_relevant_class?: SysRelevantClassSlice
}


