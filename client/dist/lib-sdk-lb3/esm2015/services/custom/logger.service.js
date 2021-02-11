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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jdXN0b20vbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRDs7Ozs7O0dBTUc7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBRXhCLEdBQUcsQ0FBQyxHQUFHLElBQVc7UUFDaEIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQUcsSUFBVztRQUNqQixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxJQUFXO1FBQ2xCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXO1FBQ2YsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXO1FBQ2YsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVztRQUNqQixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFXO1FBQ2QsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFXO1FBQ2pCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRixDQUFBO0FBbkRZLGFBQWE7SUFEekIsVUFBVSxFQUFFO0dBQ0EsYUFBYSxDQW1EekI7U0FuRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG4vKipcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBqb2huY2FzYXJydWJpYXM+XG4qIEBtb2R1bGUgTG9nZ2VyU2VydmljZVxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIENvbnNvbGUgTG9nIHdyYXBwZXIgdGhhdCBjYW4gYmUgZGlzYWJsZWQgaW4gcHJvZHVjdGlvbiBtb2RlXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dnZXJTZXJ2aWNlIHtcblxuICBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9XG5cbiAgaW5mbyguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9XG5cbiAgZXJyb3IoLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBjb3VudChhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5jb3VudChhcmcpO1xuICB9XG5cbiAgZ3JvdXAoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUuY291bnQoYXJnKTtcbiAgfVxuXG4gIGdyb3VwRW5kKCkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICB9XG5cbiAgcHJvZmlsZShhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5jb3VudChhcmcpO1xuICB9XG5cbiAgcHJvZmlsZUVuZCgpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUucHJvZmlsZUVuZCgpO1xuICB9XG5cbiAgdGltZShhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS50aW1lKGFyZyk7XG4gIH1cblxuICB0aW1lRW5kKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLnRpbWVFbmQoYXJnKTtcbiAgfVxufVxuIl19