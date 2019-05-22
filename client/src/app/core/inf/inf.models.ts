import { ByPk } from "app/core/store/model";
import { InfPersistentItem } from "../sdk";

export class PersistentItemSlice {
    by_pk_entity?: ByPk<InfPersistentItem>;
    loading?: boolean
}


export class InfSlices {
    persistent_item?: PersistentItemSlice;
}

export interface Inf {
    by_project?: ByPk<InfSlices>

}




