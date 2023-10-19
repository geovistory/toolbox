import { Injectable } from '@angular/core';
import { ProAnalysisFacade } from './analysis/pro-analysis.facade';
import { ProClassFieldConfigFacade } from './class_field_config/pro-class-field-config.facade';
import { ProDfhClassProjRelFacade } from './dfh_class_proj_rel/pro-dfh-class-proj-rel.facade';
import { ProDfhProfileProjRelFacade } from './dfh_profile_proj_rel/pro-dfh-profile-proj-rel.facade';
import { ProInfoProjRelFacade } from './info_proj_rel/pro-info-proj-rel.facade';
import { ProTableConfigFacade } from './table_config/pro-table-config.facade';
import { ProTextPropertyFacade } from './text_property/pro-text-property.facade';

@Injectable({
  providedIn: 'root'
})
export class ProFacade {
  constructor(
    public infoProjRel: ProInfoProjRelFacade,
    public dfhProfileProjRel: ProDfhProfileProjRelFacade,
    public dfhClassProjRel: ProDfhClassProjRelFacade,
    public classFieldConfig: ProClassFieldConfigFacade,
    public textProperty: ProTextPropertyFacade,
    public analysis: ProAnalysisFacade,
    public tableConfig: ProTableConfigFacade,
  ) { }
}
