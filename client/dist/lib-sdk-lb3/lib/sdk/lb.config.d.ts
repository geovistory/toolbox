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
export declare class LoopBackConfig {
    private static path;
    private static version;
    private static authPrefix;
    private static debug;
    private static filterOn;
    private static whereOn;
    private static secure;
    private static withCredentials;
    static setApiVersion(version?: string): void;
    static getApiVersion(): string | number;
    static setBaseURL(url?: string): void;
    static getPath(): string;
    static setAuthPrefix(authPrefix?: string): void;
    static getAuthPrefix(): string;
    static setDebugMode(isEnabled: boolean): void;
    static debuggable(): boolean;
    static filterOnUrl(): void;
    static filterOnHeaders(): void;
    static whereOnUrl(): void;
    static whereOnHeaders(): void;
    static isHeadersFilteringSet(): boolean;
    static isHeadersWhereSet(): boolean;
    static setSecureWebSockets(): void;
    static unsetSecureWebSockets(): void;
    static isSecureWebSocketsSet(): boolean;
    static setRequestOptionsCredentials(withCredentials?: boolean): void;
    static getRequestOptionsCredentials(): boolean;
}
