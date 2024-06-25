import { combineReducers } from '@ngrx/store';

import { proAnalysisReducers } from './analysis/pro-analysis.reducer';
import { proClassFieldConfigReducers } from './class_field_config/pro-class-field-config.reducer';
import { proDfhClassProjRelReducers } from './dfh_class_proj_rel/pro-dfh-class-proj-rel.reducer';
import { proDfhProfileProjRelReducers } from './dfh_profile_proj_rel/pro-dfh-profile-proj-rel.reducer';
import { proInfoProjRelReducers } from './info_proj_rel/pro-info-proj-rel.reducer';
import { ProState } from './pro.models';
import { proProjectReducers } from './project/pro-project.reducer';
import { proTableConfigReducers } from './table_config/pro-table-config.reducer';
import { proTextPropertyReducers } from './text_property/pro-text-property.reducer';

export const proReducers = combineReducers<ProState>({
  project: proProjectReducers,
  info_proj_rel: proInfoProjRelReducers,
  dfh_profile_proj_rel: proDfhProfileProjRelReducers,
  dfh_class_proj_rel: proDfhClassProjRelReducers,
  class_field_config: proClassFieldConfigReducers,
  text_property: proTextPropertyReducers,
  analysis: proAnalysisReducers,
  table_config: proTableConfigReducers,
})
