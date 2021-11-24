import {Entity, model, property} from '@loopback/repository';
import {CalendarType} from './enums/CalendarType';
import {Granularity} from './enums/Granularity';
export interface WarStatementId {
  pk_entity: number,
  fk_project?: number | null
}
// // This is a duplicate in order to make code compile
// enum Granularity {
//   '1 century' = '1 century',
//   '1 decade' = '1 decade',
//   '1 year' = '1 year',
//   '1 month' = '1 month',
//   '1 day' = '1 day',
//   '1 hour' = '1 hour',
//   '1 minute' = '1 minute',
//   '1 second' = '1 second',
// };
// // This is a duplicate in<y order to make code compile
// enum CalendarType {
//   'gregorian' = 'gregorian',
//   'julian' = 'julian'
// }
@model()
class WarStatementStringVT {
  @property({required: true}) pkEntity: number;
  @property({required: true}) fkClass: number;
  @property({required: true}) string: string;
}
enum GeoJsonType {Point = 'Point'}
@model()
class WarStatementGeoJson {
  @property({
    type: String,
    required: true,
    jsonSchema: {
      enum: Object.values(GeoJsonType),
    }
  }) type: GeoJsonType;
  @property.array(Number, {required: true}) coordinates: number[];
}
@model()
class WarStatementGeometryVT {
  @property({required: true}) pkEntity: number;
  @property({required: true}) fkClass: number;
  @property({required: true}) geoJSON: WarStatementGeoJson;
}
@model()
class WarStatementLanguageVT {
  @property({required: true}) pkEntity: number
  @property({required: true}) fkClass: number
  @property({required: true}) label: string
  @property({required: true}) iso6391: string
  @property({required: true}) iso6392b: string
  @property({required: true}) iso6392t: string
}
@model()
class WarStatementTimePrimitiveVTPart {
  @property({required: true}) julianDay: number;
  @property({required: true}) julianSecond: number;
  @property({required: true}) calJulian: string;
  @property({required: true}) calGregorian: string;
  @property({required: true}) calGregorianIso8601: string;
}

@model()
class WarStatementTimePrimitiveVT {
  @property({required: true}) pkEntity: number;
  @property({required: true}) fkClass: number;
  @property({required: true}) julianDay: number;
  @property({required: true}) label: string;
  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(Granularity),
    },
  })
  duration: Granularity;

  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(CalendarType),
    },
  }) calendar: CalendarType;

  @property({required: true, type: WarStatementTimePrimitiveVTPart})
  from: WarStatementTimePrimitiveVTPart

  @property({required: true, type: WarStatementTimePrimitiveVTPart})
  to: WarStatementTimePrimitiveVTPart
}

@model()
class WarStatementLangStringVT {
  @property({required: true}) pkEntity: number;
  @property({required: true}) fkClass: number;
  @property({required: true}) fkLanguage: number;
  @property({required: true}) string: string;
}
@model()
class WarStatementDimensionVT {
  @property({required: true}) pkEntity: number;
  @property({required: true}) fkClass: number;
  @property({required: true}) fkMeasurementUnit: number;
  @property({required: true}) numericValue: number;
}
@model()
export class WarStatementObjectValue {
  @property() string?: WarStatementStringVT
  @property() geometry?: WarStatementGeometryVT
  @property() language?: WarStatementLanguageVT
  @property() timePrimitive?: WarStatementTimePrimitiveVT
  @property() langString?: WarStatementLangStringVT
  @property() dimension?: WarStatementDimensionVT
}

@model({
  settings: {
    forceId: false,
    id: ['pk_entity', 'fk_project'],
    postgresql: {schema: 'war', table: 'statement'},
    validateUpsert: true,
    idInjection: false
  }
})
export class WarStatement extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  pk_entity?: number;

  @property({
    type: 'number',
  })
  fk_project?: number;

  @property({
    type: 'number',
  })
  project?: number;

  @property({
    type: 'number',
  })
  fk_property?: number;

  @property({
    type: 'number',
  })
  fk_object_info?: number;

  @property({
    type: 'number',
  })
  fk_subject_info?: number;

  @property({
    type: 'number',
  })
  ord_num_of_domain?: number;

  @property({
    type: 'number',
  })
  ord_num_of_range?: number;


  @property({
    type: 'number',
  })
  is_in_project_count?: number;

  @property({
    type: WarStatementObjectValue,
  })
  object_info_value?: WarStatementObjectValue


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<WarStatement>) {
    super(data);
  }
}

export interface WarStatementRelations {
  // describe navigational properties here
}

export type WarStatementWithRelations = WarStatement & WarStatementRelations;
