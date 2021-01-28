import {model, property} from '@loopback/repository';

@model()
class PkEntity {
  @property() pk_entity: number
}
@model()
class PkEntityVersion {
  @property() pk_entity: number
  @property() entity_version: number
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
}
