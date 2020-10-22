import {InfPersistentItem, InfTemporalEntity, InfStatement, InfPlace, InfLanguage, InfAppellation, InfTimePrimitive, InfTextProperty, InfLangString, InfDimension, ProInfoProjRel, DatDigital, WarEntityPreview} from '.';
import {property, model} from '@loopback/repository';
import {DatTextProperty} from './dat-text-property.model';
import {DatColumn} from './dat-column.model';
import {DatClassColumnMapping} from './dat-class-column-mapping.model';


@model()
class InfObject {
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
class ProObject {
  @property.array(ProInfoProjRel) info_proj_rel?: Partial<ProInfoProjRel>[]
}

@model()
class DatObject {
  @property.array(DatDigital) digital?: Partial<DatDigital>[]
  @property.array(DatColumn) column?: Partial<DatColumn>[]
  @property.array(DatTextProperty) text_property?: Partial<DatTextProperty>[]
  @property.array(DatClassColumnMapping) class_column_mapping?: Partial<DatClassColumnMapping>[]
}


@model()
class WarObject {
  @property.array(WarEntityPreview) entity_preview?: Partial<WarEntityPreview>[]
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
export class GvSchemaObject {
  @property() inf?: InfObject
  @property() pro?: ProObject
  @property() dat?: DatObject
  @property() war?: WarObject
}
