"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * abstract class as base for different analysis types
 * containing basisc logic needed by each type
 */
class Analysis {
    constructor() {
        this.destroy$ = new rxjs_1.Subject();
        this.applyHook = (hook) => {
            const h = hook;
            return operators_1.switchMap((hookRes) => {
                if (hookRes && hookRes.error) {
                    this.reject(hookRes.error);
                    const r = {};
                    return rxjs_1.of(r);
                }
                else {
                    return h();
                }
            });
        };
        this.promise = new Promise((res, rej) => {
            this.resolver = res;
            this.rejector = rej;
        });
    }
    /**
     * execute the request, apply all hooks and return a promise
     * useful for loopback
     */
    run() {
        this.validateInputs()
            .pipe(this.applyHook(() => this.checkFeasibility()), this.applyHook(() => this.produceResult()), this.applyHook(() => this.validateOutput()), operators_1.takeUntil(this.destroy$)).subscribe(hookRes => {
            if (hookRes && hookRes.error) {
                this.reject(hookRes.error);
            }
            else if (hookRes.res !== undefined) {
                this.resolve(hookRes.res);
            }
            else {
                this.reject({
                    name: 'Oops, something went wrong'
                });
            }
        });
        return this.promise;
    }
    resolve(response) {
        this.resolver(response);
        this.destroy$.next();
    }
    reject(error) {
        this.rejector(error);
        this.destroy$.next();
    }
}
exports.Analysis = Analysis;
//# sourceMappingURL=analysis.js.map