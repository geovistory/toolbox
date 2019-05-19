import { DfhClass, DfhLabel } from "../sdk";
import { ByPk } from "app/core/store/model";

export class ClassSlice {
    by_dfh_pk_class?: ByPk<DfhClass>;
    loading?: boolean;
}

export class LabelSlice {
    by_dfh_pk_label?: ByPk<DfhLabel>;
    loading?: boolean;
}



export interface Dfh {
    cla?: ClassSlice;
    label?: LabelSlice;
}