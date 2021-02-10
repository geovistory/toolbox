/// <reference path="../../../../../../node_modules/@types/cesium/index.d.ts" />

// import { QueryPoint } from 'projects/toolbox/src/app/modules/visuals/components/map-query-layer/map-query-layer.component';
import { CzmlDoubleI, CzmlPoint } from '../../../../../../../server/src/lb3/common/interfaces/czml-types';
import { TemporalDistribution } from './statistic-helpers';
import { QueryPoint } from './czml-label-generator';

// https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet

export interface CzmlPointGeneratorSettings {
  // Minimum value found in the set of points this point is part of.
  // Used to calculate relative pixelSize.
  minVal: number;
  // Maximum value found in the set of points this point is part of.
  // Used to calculate relative pixelSize.
  maxVal: number;
  // Minimum pixelSize of a point
  minPx: number;
  // Maximum pixelSize of a point
  maxPx: number;
  // Let time dynamic pixelSize start and end with value 0
  wrapPixelSizeWithZero?: boolean;

}

export class CzmlPointGenerator implements CzmlPointGeneratorSettings {

  /**
   * CzmlPoint (the data object)
   */
  d?: CzmlPoint = {};

  /**
   * Generator settings
   */
  minVal: number;
  maxVal: number;
  minPx = 0;
  maxPx = 20;
  wrapPixelSizeWithZero?= true;

  constructor(settings?: CzmlPointGeneratorSettings) {

    // Set default color
    this.d.color = {
      rgba: [20, 20, 20, 255],
      forwardExtrapolationType: 'HOLD',
      backwardExtrapolationType: 'HOLD'
    };

    // Set default outline color
    this.d.outlineColor = {
      rgba: [255, 0, 0, 200]
    };

    // Set default outline width
    this.d.outlineWidth = 1;

    // Set default pixel size
    this.d.pixelSize = 5;

    // override and extend with given czmlPoint
    Object.assign(this, settings);
  }

  public fromQueryPoint?(p: QueryPoint): CzmlPointGenerator {

    this.setPixelSize(p)

    this.setColor(p)

    this.setOutlineColor(p)

    return this;

  }

  private setColor?(p: QueryPoint) {

    if (p.color) {
      const color = Cesium.Color.fromCssColorString(p.color);
      if (color) {
        this.d.color = {
          ...this.d.color,
          rgba: Cesium.Color.pack(color, []).map(n => n * 255)
        }
      }
    }
  }

  private setOutlineColor?(p: QueryPoint) {

    if (p.color) {
      let color = Cesium.Color.fromCssColorString(p.color, new Cesium.Color());
      if (color) {
        color = color.darken(0.5, new Cesium.Color());
        this.d.outlineColor = {
          ...this.d.outlineColor,
          rgba: Cesium.Color.pack(color, []).map(n => n * 255)
        }
      }
    }
  }

  private setPixelSize?(p: QueryPoint) {
    if (p.temporalDistribution) {
      this.d.pixelSize = this.getDynamicPixelSize(p.temporalDistribution)
    } else {
      this.d.pixelSize = this.getPixelSizeByValue(p.entities.length);
    }
  }

  /**
   *
   * @param value value
   */
  private getPixelSizeByValue?(value: number) {
    if (
      this.minVal === undefined ||
      this.maxVal === undefined ||
      this.minPx === undefined ||
      this.maxPx === undefined) {
      throw new Error('Please provide minVal and maxVal for creating point pixelSize.');
    }

    // if (value <= this.minVal) return this.minPx;
    // return (((this.maxPx - this.minPx) * value) / (this.maxVal - this.minVal)) + this.minPx;
    const valDif = this.maxVal - this.minVal;
    const pxDif = this.maxPx - this.minPx;
    return (value - this.minVal) * (pxDif - valDif) + this.minPx;

  }


  /**
   * Creates an time dynamic pixel size according to given temporal distribution
   */
  private getDynamicPixelSize?(temporalDistribution: TemporalDistribution): CzmlDoubleI {
    let arr = [];

    temporalDistribution.forEach((d, i) => {
      const number = this.getPixelSizeByValue(d.items.length);
      if (number === undefined) throw new Error('Problem getting the pixelSize.');
      if (this.wrapPixelSizeWithZero && i === 0) {
        const beforStart = new Cesium.JulianDate();
        Cesium.JulianDate.addSeconds(d.start, -0.1, beforStart)
        arr = [beforStart.toString(), 0]
      }

      arr = [...arr, ...[d.start.toString(), number]]

      if (d.end) {
        const endTime = new Cesium.JulianDate();
        Cesium.JulianDate.addSeconds(d.end, -0.1, endTime)
        arr = [...arr, ...[endTime.toString(), number]]
      }

      if (this.wrapPixelSizeWithZero && temporalDistribution.length === (i + 1)) {
        const afterEnd = new Cesium.JulianDate();
        Cesium.JulianDate.addSeconds(Cesium.JulianDate.fromIso8601(arr[arr.length - 2]), 0.1, afterEnd)
        arr = [...arr, afterEnd.toString(), 0]
      }
    })



    return {
      backwardExtrapolationType: 'NONE',
      forwardExtrapolationType: 'NONE',
      number: arr
    }
  }





  toCzml?(): CzmlPoint {
    return this.d;
  }

}
