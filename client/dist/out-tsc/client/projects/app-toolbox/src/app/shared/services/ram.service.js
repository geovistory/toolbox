import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
let RamService = class RamService {
    constructor() {
        this.open$ = new BehaviorSubject(false);
        this.source$ = new Subject();
        this.target$ = new Subject();
    }
    reset() {
        this.open$.next(false);
        this.source$.next(undefined);
        this.target$.next(undefined);
    }
};
RamService = tslib_1.__decorate([
    Injectable()
], RamService);
export { RamService };
//# sourceMappingURL=ram.service.js.map