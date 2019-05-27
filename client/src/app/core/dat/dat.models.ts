import { ByPk } from "app/core/store/model";
import { DatDigital } from "../sdk";

export class DigitalSlice {
    by_pk_entity?: ByPk<DatDigital>;
    loading?: boolean
}

export interface Dat {
  digital?: DigitalSlice;
}




