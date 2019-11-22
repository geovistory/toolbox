import { ChartLinePoint } from './time-chart-cont-output.interface';

export type MapAndTimeContQueryRes = GeoEntityMapAndTimeCont[]

// TODO: Merge this interface with the frontend one
interface EntityPreview {

  pk_entity: number;
  fk_project: number;
  entity_label: string;
  class_label: string;
  type_label?: string;
  fk_type?: number;
  time_span?: object
  entity_type: 'peIt' | 'teEn'
}

export interface CzmlSpatialValue {
  from?: number;
  to?: number;
  iso_to?: string;
  iso_from?: string;
  lat: number;
  long: number;
}
export interface TimeCzmlValue { iso_x: string; y: number; data_ref: string; }
export interface GeoEntityMapAndTimeCont {
  geo_entity_pk: number,
  geo_entity_preview: EntityPreview,
  geo_positions: CzmlSpatialValue[],
  pk_entities: number[],
  temporal_data: {
    data_lookup: { [key: string]: number[] };
    timeLinePoints: ChartLinePoint[];
    timeCzmlValues: TimeCzmlValue[];
  }
}
