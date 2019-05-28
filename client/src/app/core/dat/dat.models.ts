import { ByPk } from "app/core/store/model";
import { DatDigital, DatNamespace } from "../sdk";

export class DigitalSlice {
  pk_entity__entity_version?: ByPk<DatDigital>;
  by_pk_entity?: ByPk<DatDigital>;
  loading?: boolean
}

export class NamespaceSlice {
  by_pk_entity?: ByPk<DatNamespace>;
  by_fk_project?: ByPk<ByPk<DatNamespace>>;
  loading?: boolean
}

export interface Dat {
  digital?: DigitalSlice;
}




