import { ReducerConfigCollection } from '../_lib/crud-reducer-factory';
import { proAnalysisReducerConfig } from './analysis/pro-analysis.reducer';
import { proClassFieldConfigReducerConfig } from './class_field_config/pro-class-field-config.reducer';
import { proDfhClassProjRelReducerConfig } from './dfh_class_proj_rel/pro-dfh-class-proj-rel.reducer';
import { proDfhProfileProjRelReducerConfig } from './dfh_profile_proj_rel/pro-dfh-profile-proj-rel.reducer';
import { proInfoProjRelReducerConfig } from './info_proj_rel/pro-info-proj-rel.reducer';
import { proTableConfigReducerConfig } from './table_config/pro-table-config.reducer';
import { proTextPropertyReducerConfig } from './text_property/pro-text-property.reducer';

export const proDefinitions: ReducerConfigCollection = {
  info_proj_rel: proInfoProjRelReducerConfig,
  dfh_profile_proj_rel: proDfhProfileProjRelReducerConfig,
  dfh_class_proj_rel: proDfhClassProjRelReducerConfig,
  class_field_config: proClassFieldConfigReducerConfig,
  text_property: proTextPropertyReducerConfig,
  analysis: proAnalysisReducerConfig,
  table_config: proTableConfigReducerConfig,
}
