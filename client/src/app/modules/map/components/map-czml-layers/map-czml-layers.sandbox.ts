import { ViewerConfiguration } from 'angular-cesium';
import { sandboxOf } from 'angular-playground';
import { clone } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { MapCzmlLayersComponent, MapLayer } from './map-czml-layers.component';
import { MapModule } from '../../map.module';
import { CzmlPacket } from '../../../../../../../src/common/interfaces';
import { data2 } from './map-czml-layers.mock';

const now = new Date();
let earliest, latest;
const getIso = (secondsFromNow) => {
  const clon = clone(now)
  const d = new Date(clon.setSeconds(clon.getSeconds() + secondsFromNow))
  if (!earliest || earliest > d) earliest = d;
  if (!latest || latest < d) latest = d;
  return d.toISOString()
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomCoordinate() {
  return getRandomArbitrary(0, 90)
}
function randomColor() {
  return [
    getRandomArbitrary(50, 255),
    getRandomArbitrary(50, 255),
    getRandomArbitrary(50, 255),
    128
  ]
}

let id = 1;
const createPoint = (pointColorRgba: number[]): CzmlPacket => {

  return {
    id: '_' + id++,
    point: {
      color: {
        rgba: [255, 255, 255, 128],
        forwardExtrapolationType: 'HOLD',
        backwardExtrapolationType: 'HOLD'
      },
      outlineColor: {
        rgba: pointColorRgba
      },
      outlineWidth: 3,
      pixelSize: {
        backwardExtrapolationType: 'HOLD',
        forwardExtrapolationType: 'HOLD',
        number: [
          getIso(1), 10,
          getIso(2), 29,
          getIso(15), 29,
          getIso(16), 10]
      }
    },
    // label: {
    //   horizontalOrigin: { horizontalOrigin: 'LEFT' },
    //   fillColor: {
    //     rgba: [20, 20, 20, 255]
    //   },
    //   outlineColor: {
    //     rgba: [255, 255, 255, 230]
    //   },
    //   outlineWidth: 2,
    //   pixelOffset: {
    //     cartesian2: [12, -16]
    //   },
    //   scaleByDistance: {
    //     nearFarScalar: [150, 1, 15000000, 0.5]
    //   },
    //   text: 'A'
    // },
    position: {
      cartographicDegrees: [randomCoordinate(), randomCoordinate(), 0]
    }
    // ,
    // availability: earliest.toISOString() + '/' + latest.toISOString()
  }
}
const createPoints = (n: number, pointColorRgba: number[]) => {
  const points: CzmlPacket[] = [];
  for (let i = 0; i < n; i++) {
    points.push(createPoint(pointColorRgba))
  }
  return points;
}
const createLayerCzmlDoc = (): CzmlPacket[] => {
  const nPoints = getRandomArbitrary(50, 100);
  const pointColorRgba = randomColor()
  return [{
    'id': 'document',
    'name': 'CZML Point - Time Dynamic',
    'version': '1.0'
  }, ...createPoints(nPoints, pointColorRgba)];
}


const data: { layers: MapLayer[] } = {
  layers: [
    {
      czml: createLayerCzmlDoc(),
    },
    {
      czml: createLayerCzmlDoc(),
    }
  ]
}


export default sandboxOf(MapCzmlLayersComponent, {
  declareComponent: false,
  imports: [MapModule]
})
  .add('MapCzmlLayersComponent | Preset ', {
    context: {
      data$: new BehaviorSubject(data),
    },
    template: `
        <div style="width:800px;height:400px; margin: 30px;">

          <gv-map-czml-layers [data$]="data$">
          </gv-map-czml-layers>
        </div>
        `
  })
  .add('MapCzmlLayersComponent | Preset2 ', {
    context: {
      data$: new BehaviorSubject(data2),
    },
    template: `
          <div style="width:800px;height:400px; margin: 30px;">

            <gv-map-czml-layers [data$]="data$">
            </gv-map-czml-layers>

          </div>
          `
  })
