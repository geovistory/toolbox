import { ProProjectSlice } from '../models/pro.models';
import { ProAnalysisSlice } from './analysis/pro-analysis.models';
import { ProClassFieldConfigSlice } from './class_field_config/pro-class-field-config.models';
import { ProDfhClassProjRelSlice } from './dfh_class_proj_rel/pro-dfh-class-proj-rel.models';
import { ProDfhProfileProjRelSlice } from './dfh_profile_proj_rel/pro-dfh-profile-proj-rel.models';



export interface ProState {
  project?: ProProjectSlice;
  // info_proj_rel?: ProInfoProjRelSlice;
  dfh_profile_proj_rel?: ProDfhProfileProjRelSlice;
  dfh_class_proj_rel?: ProDfhClassProjRelSlice;
  class_field_config?: ProClassFieldConfigSlice;
  // text_property?: ProTextPropertySlice;
  analysis?: ProAnalysisSlice;
  // table_config?: ProTableConfigSlice;
}

