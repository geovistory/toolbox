import { SysSystemRelevantClass } from "../sdk/models/SysSystemRelevantClass";
import { ByPk } from "app/core/store/model";

export interface SysRelevantClassSlice {
    by_pk_entity?: ByPk<SysSystemRelevantClass>;
    loading?: boolean;
}

export interface Sys {
    system_relevant_class?: SysRelevantClassSlice
}