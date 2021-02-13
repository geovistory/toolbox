import { iif, of } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { switchMap } from 'rxjs/operators';
/**
 * switchMaps to the default, if condition is true, else to provided elseOutput
 *
 */
export function switchMapOr(defaultValue, elseOutput, conditionForDefault) {
    return function (source) {
        conditionForDefault = conditionForDefault ? conditionForDefault : (x) => (!x || Object.keys(x).length < 1);
        return source.pipe(
        // auditTime(1),
        switchMap(value => {
            return iif(() => conditionForDefault(value), of(defaultValue), elseOutput(value));
        }), tag(`switchMapOr`));
    };
}
//# sourceMappingURL=switchMapOr.js.map