// TODO DELETE UNUSED
import { combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";
/**
 * Combine Latest or, if input is an empty array, emit empty array
 */
export function combineLatestOrEmpty(obs) {
    obs = [of(null), ...obs];
    return combineLatest(obs).pipe(map((values) => {
        values.shift();
        return values;
    }));
}
//# sourceMappingURL=combineLatestOrEmpty.js.map