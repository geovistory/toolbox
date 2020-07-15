import { ByPk } from "app/core/store/model";
import { SysAnalysisType } from '../sdk';
import { SysSystemRelevantClass } from "../sdk/models/SysSystemRelevantClass";
import { SysConfig } from '../sdk-lb4';

export interface SysRelevantClassSlice {
  by_pk_entity?: ByPk<SysSystemRelevantClass>;
  loading?: boolean;
}

export interface SysAnalysisTypeSlice {
  by_pk_entity?: ByPk<SysAnalysisType>;
}
export interface SysConfigSlice {
  by_main?: SysConfig;
}

export interface Sys {
  system_relevant_class?: SysRelevantClassSlice
  analysis_type?: SysAnalysisTypeSlice
  config?: SysConfigSlice
}
