/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
export declare class LoggerService {
    log(...args: any[]): void;
    info(...args: any[]): void;
    error(...args: any[]): void;
    count(arg: string): void;
    group(arg: string): void;
    groupEnd(): void;
    profile(arg: string): void;
    profileEnd(): void;
    time(arg: string): void;
    timeEnd(arg: string): void;
}
