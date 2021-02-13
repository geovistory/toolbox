import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { LoopBackConfig } from '../../lb.config';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
let LoggerService = class LoggerService {
    log(...args) {
        if (LoopBackConfig.debuggable())
            console.log.apply(console, args);
    }
    info(...args) {
        if (LoopBackConfig.debuggable())
            console.info.apply(console, args);
    }
    error(...args) {
        if (LoopBackConfig.debuggable())
            console.error.apply(console, args);
    }
    count(arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    }
    group(arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    }
    groupEnd() {
        if (LoopBackConfig.debuggable())
            console.groupEnd();
    }
    profile(arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    }
    profileEnd() {
        if (LoopBackConfig.debuggable())
            console.profileEnd();
    }
    time(arg) {
        if (LoopBackConfig.debuggable())
            console.time(arg);
    }
    timeEnd(arg) {
        if (LoopBackConfig.debuggable())
            console.timeEnd(arg);
    }
};
LoggerService = tslib_1.__decorate([
    Injectable()
], LoggerService);
export { LoggerService };
//# sourceMappingURL=logger.service.js.map