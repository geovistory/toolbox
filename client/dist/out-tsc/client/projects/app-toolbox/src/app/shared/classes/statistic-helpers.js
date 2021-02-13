/// <reference path="../../../../../../node_modules/@types/cesium/index.d.ts" />
import { TimeSpanUtil } from "@kleiolab/lib-utils";
import { indexBy, omit, sort, values } from "ramda";
export function getTemporalDelta(es) {
    let x = {};
    es.forEach(e => {
        if (e.time_span) {
            const extr = timeSpanExtremes(e.time_span);
            const start = Cesium.JulianDate.toIso8601(extr.start);
            const end = Cesium.JulianDate.toIso8601(extr.end);
            x = Object.assign({}, x, { [start]: {
                    date: extr.start,
                    adds: [...(x[start] || { adds: [] }).adds, e.pk_entity]
                }, [end]: {
                    date: extr.end,
                    removes: [...(x[end] || { removes: [] }).removes, e.pk_entity]
                } });
        }
    });
    const vals = values(x);
    const delta = sort((a, b) => {
        return Cesium.JulianDate.lessThan(a.date, b.date) ? -1 : 1;
    }, vals);
    return delta;
}
export function getTemporalDistribution(es) {
    let temporalDistribution = [];
    let minVal = Number.POSITIVE_INFINITY;
    let maxVal = Number.NEGATIVE_INFINITY;
    const delta = getTemporalDelta(es);
    const nextDate = (i) => {
        return delta[i + 1] ? delta[i + 1].date : undefined;
    };
    let itemsById = {};
    temporalDistribution = delta.map((deOp, i) => {
        if (i < delta.length) {
            const start = deOp.date;
            const end = nextDate(i);
            const distOp = {
                start, end, items: []
            };
            if (deOp.adds) {
                itemsById = Object.assign({}, itemsById, indexBy((x) => x, deOp.adds));
                distOp.items = values(itemsById);
            }
            if (deOp.removes) {
                itemsById = omit(deOp.removes, itemsById);
                distOp.items = values(itemsById);
            }
            if (distOp.items.length < minVal)
                minVal = distOp.items.length;
            if (distOp.items.length > maxVal)
                maxVal = distOp.items.length;
            return distOp;
        }
    });
    // console.log(temporalDistribution)
    return { temporalDistribution, minVal, maxVal };
}
/**
 * Converts a TimeSpan into an TimeSpanExtremes
 * @param t TimeSpan
 */
export function timeSpanExtremes(t) {
    if (!t || !Object.keys(t).length)
        return {};
    const timespan = new TimeSpanUtil(t);
    const minMax = timespan.getMinMaxTimePrimitive();
    const start = new Cesium.JulianDate(minMax.min.julianDay, -43200, Cesium.TimeStandard.UTC);
    const end = new Cesium.JulianDate(minMax.max.getDateTime()
        .getEndOf(minMax.max.duration).getJulianDay(), 43199, Cesium.TimeStandard.UTC);
    return { start, end };
}
/**
 * Converts a TimeSpan into an TimeSpanExtremesIso861
 * @param extremes TimeSpan
 */
export function timeSpanExtremesIso861(extremes) {
    if (!extremes)
        return {};
    const start = Cesium.JulianDate.toIso8601(extremes.start);
    const end = Cesium.JulianDate.toIso8601(extremes.end);
    const beforeStartDate = Cesium.JulianDate.addSeconds(start, -1, start);
    const beforeStart = Cesium.JulianDate.toIso8601(beforeStartDate);
    const afterEndDate = Cesium.JulianDate.addSeconds(end, 1, end);
    const afterEnd = Cesium.JulianDate.toIso8601(afterEndDate);
    return { start, end, beforeStart, afterEnd };
}
//# sourceMappingURL=statistic-helpers.js.map