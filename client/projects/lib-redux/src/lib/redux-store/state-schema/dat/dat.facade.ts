import { Injectable } from '@angular/core';
import { DatAnalysisFacade } from './analysis/pro-analysis.facade';
import { DatClassFieldConfigFacade } from './class_field_config/pro-class-field-config.facade';
import { DatDfhClassDatjRelFacade } from './dfh_class_proj_rel/pro-dfh-class-proj-rel.facade';
import { DatDfhDatfileDatjRelFacade } from './dfh_profile_proj_rel/pro-dfh-profile-proj-rel.facade';
import { DatInfoDatjRelFacade } from './info_proj_rel/pro-info-proj-rel.facade';
import { DatTableConfigFacade } from './table_config/pro-table-config.facade';
import { DatTextDatpertyFacade } from './text_property/pro-text-property.facade';

@Injectable()
export class DatFacade {
  constructor(
    public infoDatjRel: DatInfoDatjRelFacade,
    public dfhDatfileDatjRel: DatDfhDatfileDatjRelFacade,
    public dfhClassDatjRel: DatDfhClassDatjRelFacade,
    public classFieldConfig: DatClassFieldConfigFacade,
    public textDatperty: DatTextDatpertyFacade,
    public analysis: DatAnalysisFacade,
    public tableConfig: DatTableConfigFacade,
  ) { }
}
