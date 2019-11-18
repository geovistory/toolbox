import { ByPk } from "app/core/store/model";
import { ProInfoProjRel, ProDfhClassProjRel, ProPropertyLabel, ProAnalysis } from "../sdk";


export interface ProInfoProjRelSlice {
  by_fk_project__fk_entity?: ByPk<ProInfoProjRel>;
  loading?: boolean
}

export interface ProDfhClassProjRelSlice {
  by_fk_project__fk_entity?: ByPk<ProDfhClassProjRel>;
  by_fk_project__enabled_in_entities?: ByPk<ByPk<ProDfhClassProjRel>>;
  loading?: boolean
}


export interface ProClassFieldConfigSlice {
  by_pk_entity?: ByPk<ProInfoProjRel>;
  by_fk_entity?: ByPk<ByPk<ProInfoProjRel>>;
  loading?: boolean
}

export interface ProPropertyLabelSlice {
  by_pk_entity?: ProPropertyLabel;
  by_fk_project__fk_property__fk_domain_class__fk_range_class?: ByPk<ProPropertyLabel>;
  loading?: boolean
}
export interface ProAnalysisSlice {
  by_pk_entity?: ProAnalysis;
}

export interface Pro {
  info_proj_rel?: ProInfoProjRelSlice;
  dfh_class_proj_rel?: ProDfhClassProjRelSlice;
  class_field_config?: ProClassFieldConfigSlice;
  property_label?: ProPropertyLabelSlice;
  analysis?: ProAnalysisSlice;
}




