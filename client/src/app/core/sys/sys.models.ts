import { ByPk } from "app/core/redux-store/model";
import { SysConfig } from '../sdk-lb4';
import { SysSystemRelevantClass } from "../sdk/models/SysSystemRelevantClass";

export interface SysRelevantClassSlice {
  by_pk_entity?: ByPk<SysSystemRelevantClass>;
  loading?: boolean;
}

// export interface SysAnalysisTypeSlice {
//   by_pk_entity?: ByPk<SysAnalysisType>;
// }
export interface SysConfigSlice {
  by_main?: SysConfig;
}

export interface Sys {
  system_relevant_class?: SysRelevantClassSlice
  // analysis_type?: SysAnalysisTypeSlice
  config?: SysConfigSlice
}
