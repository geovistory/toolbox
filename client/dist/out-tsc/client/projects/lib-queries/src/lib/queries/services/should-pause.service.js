import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let ShouldPauseService = class ShouldPauseService {
    constructor() {
        this.shouldPause$ = new BehaviorSubject(false);
    }
};
ShouldPauseService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ShouldPauseService);
export { ShouldPauseService };
//# sourceMappingURL=should-pause.service.js.map