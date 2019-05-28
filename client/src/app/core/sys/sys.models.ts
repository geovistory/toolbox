import { SysSystemRelevantClass } from "../sdk/models/SysSystemRelevantClass";
import { ByPk } from "app/core/store/model";
import { SysClassHasTypeProperty } from "app/core";

export interface SysRelevantClassSlice {
    by_pk_entity?: ByPk<SysSystemRelevantClass>;
    loading?: boolean;
}
export interface SysClassHasTypePropertySlice {
  by_pk_entity?: ByPk<SysClassHasTypeProperty>;
  by_pk_typed_class?: ByPk<ByPk<SysClassHasTypeProperty>>;
  by_dfh_pk_property?: ByPk<ByPk<SysClassHasTypeProperty>>;
  by_pk_type_class?: ByPk<ByPk<SysClassHasTypeProperty>>;
  loading?: boolean;
}

export interface Sys {
    system_relevant_class?: SysRelevantClassSlice
    class_has_type_property?: SysClassHasTypePropertySlice
}
