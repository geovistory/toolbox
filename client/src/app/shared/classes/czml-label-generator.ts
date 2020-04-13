/// <reference path="../../../../node_modules/@types/cesium/index.d.ts" />

// import { QueryPoint } from 'app/modules/visuals/components/map-query-layer/map-query-layer.component';
import { CzmlLabel } from '../../../../../src/common/interfaces/czml-types';
import { TimeSpan } from 'app/core/state/models';
import { EntityPreview, WarEntityPreview } from 'app/core';
import { TemporalDistribution } from './statistic-helpers';
export interface GeoPresence {
  time_span: TimeSpan,
  was_at: {
    lat: number,
    long: number
  }
}

export interface GeoEntity extends EntityPreview {
  presences: GeoPresence[],
}
export interface QueryPoint {
  id;
  color: string;
  presences: GeoPresence[],
  label: string,
  labels?: {
    time_span: TimeSpan,
    label: string
  }[],
  // these are the entity_previews given by the default entity_preview column
  entities: WarEntityPreview[],

  // these are the aggregated temporal entites given by the temporal column
  temporalEntities?: WarEntityPreview[],

  // if temporal distribution is added, the point size can be made time dynamic
  temporalDistribution?: TemporalDistribution,
}

export interface CzmlLabelGeneratorSettings {

}


export class CzmlLabelGenerator {

  /**
   * CzmlLabel data object
   */
  d: CzmlLabel;


  /**
  * Generator settings
  */



  constructor(settings?: CzmlLabelGeneratorSettings) {

    // set defaults
    this.d = {};

    // this.d.font = '32px sans-serif';

    this.d.horizontalOrigin = { horizontalOrigin: 'LEFT' };

    this.d.fillColor = {
      rgba: [20, 20, 20, 255]
    }

    this.d.outlineColor = {
      rgba: [255, 255, 255, 230]
    }

    this.d.outlineWidth = 2;

    this.d.pixelOffset = {
      cartesian2: [12.0, -16.0]
    }

    this.d.scaleByDistance = {
      nearFarScalar: [150, 1.0, 15000000, 0.5]
      //[1.5e2, 1.0, 8.0e6, 0.6]
    }

    // this.d.translucencyByDistance = {
    //     nearFarScalar: [1.5e2, 1.0, 8.0e6, 0.6]
    // }

    // override and extend with given czmlLabel
    Object.assign(this, settings);
  }

  public fromQueryPoint?(p: QueryPoint): CzmlLabelGenerator {

    this.setText(p)

    return this;

  }

  private setText?(p: QueryPoint) {
    if (p.labels) {
      // TODO time dynamic labels
    } else if (p.label) {
      this.d.text = p.label
    }
  }



  toCzml?(): CzmlLabel {
    return this.d;
  }

}
