import { ReducerConfigCollection } from '../_lib/crud-reducer-factory';
import { sysConfigReducerConfig } from './config/sys-config.reducer';
import { sysSystemRelevantClassReducerConfig } from './system_relevant_class/sys-system-relevant-class.reducer';

export const sysDefinitions: ReducerConfigCollection = {
  config: sysConfigReducerConfig,
  system_relevant_class: sysSystemRelevantClassReducerConfig
}
