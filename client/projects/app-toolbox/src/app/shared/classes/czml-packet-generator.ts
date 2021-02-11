/// <reference path="../../../../../../node_modules/@types/cesium/index.d.ts" />

import { CzmlLabelGenerator, QueryPoint } from './czml-label-generator';
import { CzmlPointGenerator } from './czml-point-generator';
import { CzmlPositionGenerator } from './czml-position-generator';
import { CzmlPacket } from '../../../../../../../server/src/lb3/common/interfaces/czml-types';

// https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet

export class CzmlPacketGenerator {

  d: CzmlPacket;

  constructor(id: string) {
    this.d = { id };
  }

  fromQueryPoint(p: QueryPoint, minVal = 1, maxVal = 10, minPx = 5, maxPx = 30): CzmlPacket {

    if (p.presences && p.presences.length) {

      this.d.point = new CzmlPointGenerator({ minVal, maxVal, minPx, maxPx }).fromQueryPoint(p).toCzml();

      this.d.label = new CzmlLabelGenerator().fromQueryPoint(p).toCzml();

      this.d.position = new CzmlPositionGenerator().fromQueryPoint(p).toCzml();

    }

    return this.d;

  }







}
