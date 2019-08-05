import { ByPk } from "app/core/store/model";
import { ProInfoProjRel, ProDfhClassProjRel } from "../sdk";


export class ProInfoProjRelSlice {
  by_fk_project__fk_entity?: ByPk<ProInfoProjRel>;
  loading?: boolean
}

export class ProDfhClassProjRelSlice {
  by_fk_project__fk_entity?: ByPk<ProDfhClassProjRel>;
  by_fk_project__enabled_in_entities?: ByPk<ByPk<ProDfhClassProjRel>>;
  loading?: boolean
}


export class ProClassFieldConfigSlice {
  by_pk_entity?: ByPk<ProInfoProjRel>;
  by_fk_entity?: ByPk<ByPk<ProInfoProjRel>>;
  loading?: boolean
}

export interface Pro {
  info_proj_rel?: ProInfoProjRelSlice;
  dfh_class_proj_rel?: ProDfhClassProjRelSlice;
  class_field_config?: ProClassFieldConfigSlice;
}




