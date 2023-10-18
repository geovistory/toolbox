import { ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { proAnalysisReducerConfig } from './analysis/pro-analysis.reducer';
import { proClassFieldConfigReducerConfig } from './class_field_config/pro-class-field-config.reducer';
import { proDfhClassDatjRelReducerConfig } from './dfh_class_proj_rel/pro-dfh-class-proj-rel.reducer';
import { proDfhDatfileDatjRelReducerConfig } from './dfh_profile_proj_rel/pro-dfh-profile-proj-rel.reducer';
import { proInfoDatjRelReducerConfig } from './info_proj_rel/pro-info-proj-rel.reducer';
import { proTableConfigReducerConfig } from './table_config/pro-table-config.reducer';
import { proTextDatpertyReducerConfig } from './text_property/pro-text-property.reducer';

export const datDefinitions: ReducerConfigCollection = {
  infoDatjRel: proInfoDatjRelReducerConfig,
  dfhDatfileDatjRel: proDfhDatfileDatjRelReducerConfig,
  dfhClassDatjRel: proDfhClassDatjRelReducerConfig,
  classFieldConfig: proClassFieldConfigReducerConfig,
  textDatperty: proTextDatpertyReducerConfig,
  analysis: proAnalysisReducerConfig,
  tableConfig: proTableConfigReducerConfig,
}
