import {model, property} from '@loopback/repository';
import {DatDigital, DfhApiProfile, DfhClass, DfhLabel, DfhProperty, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProDfhClassProjRel, ProInfoProjRel, ProProject, ProTextProperty, SysConfigValue, ProTableConfig} from '.';
import {DatClassColumnMapping} from './dat-class-column-mapping.model';
import {DatColumn} from './dat-column.model';
import {DatTextProperty} from './dat-text-property.model';
import {ProAnalysis} from './pro-analysis.model';
import {ProClassFieldConfig} from './pro-class-field-config.model';
import {ProDfhProfileProjRel} from './pro-dfh-profile-proj-rel.model';
import {WarEntityPreview} from './war-entity-preview.model';


@model()
export class InfObject {
  @property.array(InfPersistentItem) persistent_item?: Partial<InfPersistentItem>[]
  @property.array(InfTemporalEntity) temporal_entity?: Partial<InfTemporalEntity>[]
  @property.array(InfStatement) statement?: Partial<InfStatement>[]
  @property.array(InfPlace) place?: Partial<InfPlace>[]
  @property.array(InfLanguage) language?: Partial<InfLanguage>[]
  @property.array(InfAppellation) appellation?: Partial<InfAppellation>[]
  @property.array(InfTimePrimitive) time_primitive?: Partial<InfTimePrimitive>[]
  @property.array(InfTextProperty) text_property?: Partial<InfTextProperty>[]
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
  @property.array(DatColumn) column?: Partial<DatColumn>[]
  @property.array(DatTextProperty) text_property?: Partial<DatTextProperty>[]
  @property.array(DatClassColumnMapping) class_column_mapping?: Partial<DatClassColumnMapping>[]
}


@model()
export class WarObject {
  @property.array(WarEntityPreview) entity_preview?: Partial<WarEntityPreview>[]
}
@model()
export class DfhObject {
  @property.array(DfhApiProfile) profile?: DfhApiProfile[];
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
