import { combineLatest, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
export class AbstractControlFactory {
    constructor() {
        this.valueChanges$ = new BehaviorSubject(undefined);
        this.statusChanges$ = new BehaviorSubject(undefined);
    }
}
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
//# sourceMappingURL=form-factory.models.js.map