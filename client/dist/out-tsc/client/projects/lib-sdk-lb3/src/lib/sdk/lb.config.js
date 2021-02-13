/* tslint:disable */
/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
*
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
export class LoopBackConfig {
    static setApiVersion(version = 'api') {
        LoopBackConfig.version = version;
    }
    static getApiVersion() {
        return LoopBackConfig.version;
    }
    static setBaseURL(url = '/') {
        LoopBackConfig.path = url;
    }
    static getPath() {
        return LoopBackConfig.path;
    }
    static setAuthPrefix(authPrefix = '') {
        LoopBackConfig.authPrefix = authPrefix;
    }
    static getAuthPrefix() {
        return LoopBackConfig.authPrefix;
    }
    static setDebugMode(isEnabled) {
        LoopBackConfig.debug = isEnabled;
    }
    static debuggable() {
        return LoopBackConfig.debug;
    }
    static filterOnUrl() {
        LoopBackConfig.filterOn = 'url';
    }
    static filterOnHeaders() {
        LoopBackConfig.filterOn = 'headers';
    }
    static whereOnUrl() {
        LoopBackConfig.whereOn = 'url';
    }
    static whereOnHeaders() {
        LoopBackConfig.whereOn = 'headers';
    }
    static isHeadersFilteringSet() {
        return (LoopBackConfig.filterOn === 'headers');
    }
    static isHeadersWhereSet() {
        return (LoopBackConfig.whereOn === 'headers');
    }
    static setSecureWebSockets() {
        LoopBackConfig.secure = true;
    }
    static unsetSecureWebSockets() {
        LoopBackConfig.secure = false;
    }
    static isSecureWebSocketsSet() {
        return LoopBackConfig.secure;
    }
    static setRequestOptionsCredentials(withCredentials = false) {
        LoopBackConfig.withCredentials = withCredentials;
    }
    static getRequestOptionsCredentials() {
        return LoopBackConfig.withCredentials;
    }
}
LoopBackConfig.path = '//:3000';
LoopBackConfig.version = 'lb3-api';
LoopBackConfig.authPrefix = '';
LoopBackConfig.debug = true;
LoopBackConfig.filterOn = 'headers';
LoopBackConfig.whereOn = 'headers';
LoopBackConfig.secure = false;
LoopBackConfig.withCredentials = false;
//# sourceMappingURL=lb.config.js.map