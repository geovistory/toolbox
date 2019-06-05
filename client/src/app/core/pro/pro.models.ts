import { ByPk } from "app/core/store/model";
import { ProInfoProjRel } from "../sdk";


export class ProInfoProjRelSlice {
  by_pk_entity?: ByPk<ProInfoProjRel>;
  by_fk_entity?: ByPk<ByPk<ProInfoProjRel>>;
  loading?: boolean
}

export interface Pro {
  info_proj_rel?: ProInfoProjRelSlice;
}




