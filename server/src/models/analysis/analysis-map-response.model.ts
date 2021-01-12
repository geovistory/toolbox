import {model, property} from '@loopback/repository'
import {WarEntityPreview} from '../war-entity-preview.model'
import {ChartLinePoint} from './analysis-time-chart-response.model';




@model()
export class CzmlSpatialValue {

  @property({required: true})
  lat: number;

  @property({required: true})
  long: number;

  @property()
  from?: number;

  @property()
  to?: number;

  @property()
  iso_to?: string;

  @property()
  iso_from?: string;
}

@model()
export class TimeCzmlValue {

  @property({required: true})
  iso_x: string;

  @property({required: true})
  y: number;

  @property({required: true})
  data_ref: string;
}

@model()
export class MapTemporalData {
  @property({
    jsonSchema: {
      additionalProperties: true,
    }
  })
  data_lookup: {
    [key: string]: number[];
  };

  @property.array(ChartLinePoint, {required: true})
  timeLinePoints: ChartLinePoint[];

  @property.array(TimeCzmlValue, {required: true})
  timeCzmlValues: TimeCzmlValue[];
}

@model()
export class GeoEntityMapAndTimeCont {

  @property({required: true})
  geo_entity_pk: number;

  @property({required: true, type: WarEntityPreview})
  geo_entity_preview: WarEntityPreview;

  @property.array(CzmlSpatialValue, {required: true})
  geo_positions: CzmlSpatialValue[];

  @property.array(Number, {required: true})
  pk_entities: number[];

  @property({required: true, type: MapTemporalData})
  temporal_data: MapTemporalData
}


@model()
export class AnalysisMapResponse {
  @property.array(GeoEntityMapAndTimeCont, {required: true})
  geoPlaces: GeoEntityMapAndTimeCont[]
};
