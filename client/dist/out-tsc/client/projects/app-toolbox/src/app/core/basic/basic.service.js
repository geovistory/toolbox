import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let BasicService = class BasicService {
    constructor() {
        this.geoPosition$ = new BehaviorSubject(null);
        navigator.geolocation.getCurrentPosition((position) => {
            this.geoPosition$.next(position);
        });
    }
};
BasicService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], BasicService);
export { BasicService };
//# sourceMappingURL=basic.service.js.map