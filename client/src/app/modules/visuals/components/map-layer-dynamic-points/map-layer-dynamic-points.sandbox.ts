import { sandboxOf } from 'angular-playground';
import { TimeSpan } from 'app/core';
import { BehaviorSubject } from 'rxjs';
import { VisualsModule } from '../../visuals.module';
import { MapLayerDynamicPointsComponent, MapLayerDynamicPointsData } from './map-layer-dynamic-points.component';
import { CzmlPacket } from 'app/shared/classes/czml-types';

const data1: CzmlPacket[] = [{
  'id': '122',
  'point': {
    'color': {
      'rgba': [170, 187, 204, 255],
      'forwardExtrapolationType': 'HOLD',
      'backwardExtrapolationType': 'HOLD'
    },
    'outlineColor': { 'rgba': [85, 93.5, 102, 255] },
    'outlineWidth': 1,
    'pixelSize': {
      'backwardExtrapolationType': 'NONE',
      'forwardExtrapolationType': 'NONE',
      'number': [
        '2017-09-02T23:59:59.9000000000014552Z', 0,
        '2017-09-03T00:00:00Z', 29,
        '2019-10-30T23:59:58.9000000000014552Z', 29,
        '2019-10-30T23:59:59Z', 0]
    }
  },
  'label': {
    'horizontalOrigin': { 'horizontalOrigin': 'LEFT' },
    'fillColor': {
      'rgba': [20, 20, 20, 255]
    },
    'outlineColor': {
      'rgba': [255, 255, 255, 230]
    },
    'outlineWidth': 2,
    'pixelOffset': {
      'cartesian2': [12, -16]
    },
    'scaleByDistance': {
      'nearFarScalar': [150, 1, 15000000, 0.5]
    },
    'text': 'A'
  },
  'position': {
    forwardExtrapolationType: 'HOLD',
    backwardExtrapolationType: 'HOLD',
    // 'interpolationAlgorithm': 'LAGRANGE',
    // 'interpolationDegree': 5,
    // 'referenceFrame': 'INERTIAL',
    'epoch': '2019-29-02T16:03:00Z',
    'cartographicDegrees': [
      '2019-29-02T16:03:00Z', 44.234, 7.5, 0
    ]
  }
}]



export default sandboxOf(MapLayerDynamicPointsComponent, {
  declareComponent: false,
  imports: [
    VisualsModule
  ]
})
  .add('MapLayerDynamicPointsComponent | Preset ', {
    context: {
      data$: new BehaviorSubject(data1),
    },
    template: `
        <div style="width:800px;height:400px; margin: 30px;">
          <ac-map #acMap class="gv-flex-fh">

          <gv-map-layer-dynamic-points [data$]="data$" [acMap]="acMap">
          </gv-map-layer-dynamic-points>

          <!-- <gv-polygons-editor-layer></gv-polygons-editor-layer> -->
          </ac-map>
        </div>

       `
  })
