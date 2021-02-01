import { ByPk } from "app/core/redux-store/model";
import { SysConfigValue } from '../sdk-lb4';
import { SysSystemRelevantClass } from "../sdk/models/SysSystemRelevantClass";

export interface SysRelevantClassSlice {
  by_pk_entity?: ByPk<SysSystemRelevantClass>;
  by_fk_class?: ByPk<ByPk<SysSystemRelevantClass>>;
  by_required_by_sources?: ByPk<ByPk<SysSystemRelevantClass>>;
  by_required?: ByPk<ByPk<SysSystemRelevantClass>>;
  loading?: boolean;
}

// export interface SysAnalysisTypeSlice {
//   by_pk_entity?: ByPk<SysAnalysisType>;
// }
export interface SysConfigSlice {
  by_main?: ByPk<SysConfigValue>;
  loading?: boolean;
}

export interface Sys {
  system_relevant_class?: SysRelevantClassSlice
  config?: SysConfigSlice

  pkEntityModelMap: ByPk<{ modelName: string }>
}
