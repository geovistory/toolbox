import { ByPk } from "@kleiolab/lib-redux";
import { ProInfoProjRel, ProDfhClassProjRel, ProTextProperty, ProProject, ProDfhProfileProjRel, ProClassFieldConfig } from '@kleiolab/lib-sdk-lb3';
import { ProAnalysis } from "@kleiolab/lib-sdk-lb4";

export interface ProProjectSlice {
  by_pk_entity?: ByPk<ProProject>;
}

export interface ProInfoProjRelSlice {
  by_fk_project__fk_entity?: ByPk<ProInfoProjRel>;
  loading?: boolean
}

export interface ProDfhClassProjRelSlice {
  by_fk_project__fk_class?: ByPk<ProDfhClassProjRel>;
  by_fk_project__enabled_in_entities?: ByPk<ByPk<ProDfhClassProjRel>>;
  loading?: boolean
}
export interface ProDfhProfileProjRelSlice {
  by_fk_project__fk_profile?: ByPk<ProDfhProfileProjRel>;
  by_fk_project__enabled?: ByPk<ByPk<ProDfhProfileProjRel>>;
  loading?: boolean
}

export interface ProClassFieldConfigSlice {
  by_fk_project__fk_class?: ByPk<ProClassFieldConfig>;
  loading?: boolean
}

export interface ProTextPropertySlice {
  by_pk_entity?: ProTextProperty;
  by_fk_project__fk_property__fk_domain_class__fk_range_class?: ByPk<ProTextProperty>;
  loading?: boolean
}
export interface ProAnalysisSlice {
  by_pk_entity?: ProAnalysis;
}

export interface Pro {
  info_proj_rel?: ProInfoProjRelSlice;
  dfh_profile_proj_rel?: ProDfhProfileProjRelSlice;
  dfh_class_proj_rel?: ProDfhClassProjRelSlice;
  class_field_config?: ProClassFieldConfigSlice;
  text_property?: ProTextPropertySlice;
  analysis?: ProAnalysisSlice;
}




