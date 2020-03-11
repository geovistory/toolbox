/// <reference path="../../../../node_modules/@types/cesium/index.d.ts" />

import { TimeSpan, WarEntityPreview } from "app/core";
import { indexBy, omit, sort, values } from "ramda";
import { JulianDate, TimeStandard } from "cesium";

/**
 *
 * start: the ISO8601 string representing the start
 * end: the ISO8601 string representing the end
 * beforeStart: the ISO8601 string representing the start
 * afterEnd: the ISO8601 string representing the start
 *
 */
export interface CesiumTimeSpanExtremesIso861 {

  start?: string; // ISO8601
  end?: string; // ISO8601

  beforeStart?: string; // ISO8601
  afterEnd?: string; // ISO8601

}

/**
 *
 * start: the Date representing the start
 * end: the Date representing the end
 */
export interface CesiumTimeSpanExtremes {
  start?;
  end?;
}

export interface TemporalDeltaOperation {
  adds?: any[]
  removes?: any[]
  date: JulianDate
}
/**
 * The distribution of frequency over time
 * Example:
    {
        '2012-04-30T12:00:00Z': {
            date: '',
            adds: [2211]
        },
        '2012-04-30T13:00:00Z': {
            adds: [3344, 5566]
        },
        '2012-04-30T15:00:00Z/16:00:00Z': {
            adds: [7788],
            removes: [2211, 5566]
        },
    }
 */
export type TemporalDelta = TemporalDeltaOperation[]

export interface TemporalDistributionOperation {
  start: JulianDate
  end: JulianDate
  items?: any[]
}
/**
 * The distribution of frequency over time
 * Example:
  "someProperty": [
        {
            interval: "2012-04-30T12:00:00Z/13:00:00Z",
            items: [2211]
        },
        {
            interval: "2012-04-30T13:00:00Z/14:00:00Z",
            items: [2211, 3344, 5566]
        },
        {
            interval: "2012-04-30T15:00:00Z/16:00:00Z",
            items: [2211, 5566]
        },
    ]
 */
export type TemporalDistribution = TemporalDistributionOperation[];

export function getTemporalDelta(es: WarEntityPreview[]): TemporalDelta {

  let x: { [time: string]: TemporalDeltaOperation } = {};

  es.forEach(e => {
    if (e.time_span) {
      const extr = timeSpanExtremes(e.time_span);
      const start: string = JulianDate.toIso8601(extr.start);
      const end: string = JulianDate.toIso8601(extr.end);
      x = {
        ...x,
        [start]: {
          date: extr.start,
          adds: [...(x[start] || { adds: [] }).adds, e.pk_entity]
        },
        [end]: {
          date: extr.end,
          removes: [...(x[end] || { removes: [] }).removes, e.pk_entity]
        }
      }
    }
  })
  const vals = values(x);
  const delta: TemporalDelta = sort((a, b) => {
    return JulianDate.lessThan(a.date, b.date) ? -1 : 1;
  }, vals);
  return delta;
}


export function getTemporalDistribution(es: WarEntityPreview[]): {
  temporalDistribution: TemporalDistribution,
  minVal: number,
  maxVal: number
} {

  let temporalDistribution = [];
  let minVal = Number.POSITIVE_INFINITY;
  let maxVal = Number.NEGATIVE_INFINITY;

  const delta = getTemporalDelta(es);


  const nextDate = (i): JulianDate => {
    return delta[i + 1] ? delta[i + 1].date : undefined;
  }
  let itemsById = {};

  temporalDistribution = delta.map((deOp, i) => {
    if (i < delta.length) {
      const start = deOp.date;
      const end = nextDate(i);
      const distOp: TemporalDistributionOperation = {
        start, end, items: []
      };

      if (deOp.adds) {
        itemsById = { ...itemsById, ...indexBy((x) => x, deOp.adds) }
        distOp.items = values(itemsById)
      }
      if (deOp.removes) {
        itemsById = omit(deOp.removes, itemsById);
        distOp.items = values(itemsById)
      }
      if (distOp.items.length < minVal) minVal = distOp.items.length
      if (distOp.items.length > maxVal) maxVal = distOp.items.length

      return distOp;
    }
  })

  console.log(temporalDistribution)
  return { temporalDistribution, minVal, maxVal };
}

/**
 * Converts a TimeSpan into an TimeSpanExtremes
 * @param timeSpan TimeSpan
 */
export function timeSpanExtremes(timeSpan: TimeSpan): CesiumTimeSpanExtremes {

  if (!timeSpan || !Object.keys(timeSpan).length) return {};

  timeSpan = new TimeSpan(timeSpan);
  const minMax = timeSpan.getMinMaxTimePrimitive();

  const start = new JulianDate(minMax.min.julianDay, -43200, TimeStandard.UTC);
  const end = new JulianDate(minMax.max.getDateTime()
    .getEndOf(minMax.max.duration).getJulianDay(), 43199, TimeStandard.UTC);

  return { start, end }

}



// /**
//  * Converts a TimeSpan into an TimeSpanExtremesIso861
//  * @param extremes TimeSpan
//  */
// export function timeSpanExtremesIso861(extremes: CesiumTimeSpanExtremes): CesiumTimeSpanExtremesIso861 {

//   if (!extremes) return {};

//   const start: string = JulianDate.toIso8601(extremes.start);
//   const end: string = JulianDate.toIso8601(extremes.end);

//   const beforeStartDate = JulianDate.addSeconds(start, -1, start);
//   const beforeStart: string = JulianDate.toIso8601(beforeStartDate);

//   const afterEndDate = JulianDate.addSeconds(end, 1, end);
//   const afterEnd: string = JulianDate.toIso8601(afterEndDate);

//   return { start, end, beforeStart, afterEnd }

// }



