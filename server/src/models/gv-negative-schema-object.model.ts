import {Entity, model, property} from '@loopback/repository';
import {ProAnalysis} from './pro-analysis.model';
import {ProTextProperty} from './pro-text-property.model';

@model()
export class PkEntity {
  @property() pk_entity: number
}
@model()
export class PkEntityVersion {
  @property() pk_entity: number
  @property() entity_version: number
}

@model()
export class FkProjectFkEntity extends Entity {
  @property() fk_project: number
  @property() fk_entity: number
}

// @model()
// class ProObject {
// }

@model()
class DatNegativeObject {
  @property.array(PkEntityVersion) digital?: PkEntityVersion[]
  @property.array(PkEntity) chunk?: PkEntity[]
  @property.array(PkEntity) column?: PkEntity[]
  @property.array(PkEntity) class_column_mapping?: PkEntity[]
  @property.array(PkEntity) text_property?: PkEntity[]
  @property.array(PkEntity) namespace?: PkEntity[]
}

@model()
class InfNegativeObject {
  @property.array(PkEntity) resource?: PkEntity[]
  @property.array(PkEntity) statement?: PkEntity[]
  @property.array(PkEntity) place?: PkEntity[]
  @property.array(PkEntity) language?: PkEntity[]
  @property.array(PkEntity) appellation?: PkEntity[]
  @property.array(PkEntity) time_primitive?: PkEntity[]
  @property.array(PkEntity) text_property?: PkEntity[]
  @property.array(PkEntity) lang_string?: PkEntity[]
  @property.array(PkEntity) dimension?: PkEntity[]
}




@model()
class ProNegativeObject {
  @property.array(FkProjectFkEntity) info_proj_rel?: FkProjectFkEntity[]
  @property.array(ProTextProperty) text_property?: Partial<ProTextProperty>[];
  @property.array(ProAnalysis) analysis?: Partial<ProAnalysis>[];
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
export class GvNegativeSchemaObject {
  @property() dat?: DatNegativeObject
  @property() inf?: InfNegativeObject
  @property() pro?: ProNegativeObject
}
