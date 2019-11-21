import { Observable, of, Subject } from 'rxjs';
import { ChartLine, CzmlDoubleValue, CzmlPacket, CzmlSpatialValue, MapAndTimeContInput, MapAndTimeContOutput, MapAndTimeContQueryRes, MapLayer, TimeCzmlValue, TimeChartContOutput } from '../../common/interfaces';
import { isValidMapAndTimeContInput } from '../../common/validators/map-and-time-cont-input.validator';
import { isValidMapAndTimeContOutput } from '../../common/validators/map-and-time-cont-output.validator';
import { isValidMapAndTimeContQueryRes } from '../../common/validators/map-and-time-cont-query-res.validator';
import { SqlBuilder } from '../query/sql-builder';
import { Analysis, HookResult } from './analysis';

type Result = MapAndTimeContOutput;

export class MapAndTimeCont extends Analysis<Result>   {
  result: Result | undefined;

  fullCount: number | undefined;

  constructor(
    private connector: any,
    private pkProject: number,
    private analysisDef: MapAndTimeContInput,
  ) {
    super()
  }
  validateInputs(): Observable<HookResult<Result>> {
    const v = isValidMapAndTimeContInput(this.analysisDef);
    if (v.validObj) {
      return of({})
    }
    else {
      return of({
        error: {
          name: 'Invalid analysis definition',
          message: v.error
        }
      })
    }
  }
  checkFeasibility(): Observable<HookResult<Result>> {

    const s$ = new Subject<HookResult<Result>>()
    const q = new SqlBuilder().buildCountQuery(this.analysisDef.queryDefinition, this.pkProject)
    this.connector.execute(q.sql, q.params, (err: any, resultObjects: any) => {
      if (err) {
        s$.next({
          error: {
            name: `Error when counting the number of resulting rows`
          }
        })
      }
      else {
        this.fullCount = parseInt(resultObjects[0].count, 10);
        s$.next()
      }
    });
    return s$;
  }
  /**
   * Run the query and produce the result
   */
  produceResult(): Observable<HookResult<Result>> {

    const s$ = new Subject<HookResult<Result>>()
    const q = new SqlBuilder().buildQuery(this.analysisDef.queryDefinition, this.pkProject)

    this.connector.execute(q.sql, q.params, (err: any, resultObjects: MapAndTimeContQueryRes) => {
      if (err) {
        s$.next({
          error: {
            name: `Error on query`,
            message: err
          }
        })
      }
      else {
        const v = isValidMapAndTimeContQueryRes(resultObjects)
        if (typeof this.fullCount !== 'number') {
          s$.next({
            error: {
              name: 'Something went wrong with counting the results.'
            }
          })
        }
        else if (v.validObj) {
          this.result = mapAndTimeContQueryResToOutput(v.validObj)
          s$.next()
        } else {
          s$.next({
            error: {
              name: 'Invalid query results.',
              message: v.error
            }
          })
        }
      }
    })

    return s$;


  }
  validateOutput(): Observable<HookResult<Result>> {

    const v = isValidMapAndTimeContOutput(this.result)

    if (v.validObj) {
      return of({ res: v.validObj })
    } else {
      return of({
        error: {
          name: 'Invalid output.',
          message: v.error
        }
      })
    }
  }

}


const tempValsToCesiumDouble = (temporalVals: TimeCzmlValue[]): CzmlDoubleValue[] => {
  const v: any[] = [];
  temporalVals.forEach(t => {
    v.push(t.iso_x)
    v.push(t.y)
  })
  return v
}

const createPoint = (id: string, pointColorRgba: number[], spatialVal: CzmlSpatialValue, temporalVals: TimeCzmlValue[]): CzmlPacket => {

  return {
    id,
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
        number: tempValsToCesiumDouble(temporalVals)
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
      cartographicDegrees: [
        spatialVal.lat, spatialVal.long, 0
      ]
    },
    availability: '0000-00-00T00:00:00Z/9999-12-31T24:00:00Z'
  }
}



/**
 * Converts a MapAndTimeContQueryRes to a MapAndTimeContOutput
 * TODO
 */
export function mapAndTimeContQueryResToOutput(queryRes: MapAndTimeContQueryRes): MapAndTimeContOutput {
  const czml: CzmlPacket[] = [{
    'id': 'document',
    'name': 'CZML Point - Time Dynamic',
    'version': '1.0'
  }];
  const chartLines: ChartLine[] = []
  const data_lookups: { [key: string]: number[] }[] = []
  let id = 1;
  queryRes.forEach(item => {
    item.geo_positions.forEach(position => {
      const color = [255, 255, 255, 128]
      const temporalVals = item.temporal_data.timeCzmlValues
      const c = createPoint(('_' + id++), color, position, temporalVals)
      czml.push(c);
    })
    const chartLine: ChartLine = {
      label: item.geo_entity_preview.entity_label,
      linePoints: item.temporal_data.timeLinePoints
    }
    chartLines.push(chartLine)
    data_lookups.push(item.temporal_data.data_lookup)
  })

  const map: MapLayer = { czml }
  const time: TimeChartContOutput = {
    activeLine: 0,
    chartLines
  }
  const out: MapAndTimeContOutput = {
    layers: [
      {
        map,
        time,
        data_lookups
      }
    ]
  }
  return out;
}
