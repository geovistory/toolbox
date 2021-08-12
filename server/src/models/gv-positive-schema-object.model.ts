import { model, property } from '@loopback/repository';
import { DatDigital, DfhApiProfile, DfhClass, DfhLabel, DfhProperty, InfAppellation, InfDimension, InfLangString, InfLanguage,  InfPlace, InfStatement, InfResource,  InfTimePrimitive, ProDfhClassProjRel, ProInfoProjRel, ProProject, ProTableConfig, ProTextProperty,  DfhProfile } from '.';
import { DatClassColumnMapping } from './dat-class-column-mapping.model';
import { DatColumn } from './dat-column.model';
import { DatTextProperty } from './dat-text-property.model';
import { ProAnalysis } from './pro-analysis.model';
import { ProClassFieldConfig } from './pro-class-field-config.model';
import { ProDfhProfileProjRel } from './pro-dfh-profile-proj-rel.model';
import { SysSystemRelevantClass } from './sys-system-relevant-class.model';
import { WarEntityPreview } from './war-entity-preview.model';
import {DatChunk} from './dat-chunk.model';
import {DatNamespace} from './dat-namespace.model';
import {SysConfigValue} from './sys-config/sys-config-value.model';


@model()
export class InfObject {
  @property.array(InfResource) resource?: Partial<InfResource>[]
  @property.array(InfStatement) statement?: Partial<InfStatement>[]
  @property.array(InfPlace) place?: Partial<InfPlace>[]
  @property.array(InfLanguage) language?: Partial<InfLanguage>[]
  @property.array(InfAppellation) appellation?: Partial<InfAppellation>[]
  @property.array(InfTimePrimitive) time_primitive?: Partial<InfTimePrimitive>[]
  @property.array(InfLangString) lang_string?: Partial<InfLangString>[]
  @property.array(InfDimension) dimension?: Partial<InfDimension>[]
}

@model()
export class ProObject {
  @property.array(ProInfoProjRel) info_proj_rel?: Partial<ProInfoProjRel>[]
  @property.array(ProAnalysis) analysis?: Partial<ProAnalysis>[]
  @property.array(ProTableConfig) table_config?: Partial<ProTableConfig>[]
  @property.array(ProClassFieldConfig) class_field_config?: Partial<ProClassFieldConfig>[]
  @property.array(ProDfhClassProjRel) dfh_class_proj_rel?: Partial<ProDfhClassProjRel>[];
  @property.array(ProTextProperty) text_property?: Partial<ProTextProperty>[];
  @property.array(ProDfhProfileProjRel) dfh_profile_proj_rel?: Partial<ProDfhProfileProjRel>[];
  @property.array(ProProject) project?: Partial<ProProject>[];
}

@model()
export class DatObject {
  @property.array(DatDigital) digital?: Partial<DatDigital>[]
  @property.array(DatDigital) chunk?: Partial<DatChunk>[]
  @property.array(DatColumn) column?: Partial<DatColumn>[]
  @property.array(DatTextProperty) text_property?: Partial<DatTextProperty>[]
  @property.array(DatClassColumnMapping) class_column_mapping?: Partial<DatClassColumnMapping>[]
  @property.array(DatNamespace) namespace?: Partial<DatNamespace>[]
}


@model()
export class WarObject {
  @property.array(WarEntityPreview) entity_preview?: Partial<WarEntityPreview>[]
}
@model()
export class DfhObject {
  @property.array(DfhProfile) profile?: DfhProfile[];
  @property.array(DfhClass) klass?: DfhClass[];
  @property.array(DfhProperty) property?: DfhProperty[];
  @property.array(DfhLabel) label?: DfhLabel[];
}

@model()
export class SysObject {
  @property.array(SysConfigValue) config?: SysConfigValue[];
  @property.array(DfhClass) klass?: DfhClass[];
  @property.array(DfhProperty) property?: DfhProperty[];
  @property.array(DfhLabel) label?: DfhLabel[];
  @property.array(SysSystemRelevantClass) system_relevant_class?: SysSystemRelevantClass[];
}

/**
 * This model reflects the database schema and acts as a data exchange format
 * between geovistory server and geovistory client.
 *
 * Objects of this model can be easily consumed by geovistory client, which
 * puts the individual elements of the object in the Redux store.
 *
 * Therefor this model is usualy used for the response of an API.
 *
 */
@model()
export class GvPositiveSchemaObject {
  @property() inf?: InfObject
  @property() pro?: ProObject
  @property() dat?: DatObject
  @property() war?: WarObject
  @property() dfh?: DfhObject
  @property() sys?: SysObject
}
