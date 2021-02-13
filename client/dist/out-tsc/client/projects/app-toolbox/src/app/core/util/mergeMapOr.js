import { merge, partition } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';
export function mergeMapOr(defaultValue, elseOutput, condition) {
    return function (source) {
        condition = condition ? condition : (x) => (!x || Object.keys(x).length < 1);
        const [mapToDefault$, mapToElseOutput$] = partition(source, condition);
        const default$ = mapToDefault$.pipe(mapTo(defaultValue));
        const elseOutput$ = mapToElseOutput$.pipe(mergeMap(value => elseOutput(value)));
        return merge(default$, elseOutput$);
    };
}
//# sourceMappingURL=mergeMapOr.js.map