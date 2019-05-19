import { SysSystemRelevantClass } from "../sdk/models/SysSystemRelevantClass";
import { ByPk } from "app/core/store/model";

export interface SystemRelevantClassSlice {
    by_pk_entity?: ByPk<SysSystemRelevantClass>;
    loading?: boolean;
}

export interface System {
    systemRelevantClass?: SystemRelevantClassSlice
}