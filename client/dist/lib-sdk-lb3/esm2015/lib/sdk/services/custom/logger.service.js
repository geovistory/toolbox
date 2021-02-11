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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NlcnZpY2VzL2N1c3RvbS9sb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pEOzs7Ozs7R0FNRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFFeEIsR0FBRyxDQUFDLEdBQUcsSUFBVztRQUNoQixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBRyxJQUFXO1FBQ2pCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLElBQVc7UUFDbEIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVc7UUFDZixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVc7UUFDZixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFXO1FBQ2pCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVc7UUFDZCxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDakIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGLENBQUE7QUFuRFksYUFBYTtJQUR6QixVQUFVLEVBQUU7R0FDQSxhQUFhLENBbUR6QjtTQW5EWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QGpvaG5jYXNhcnJ1Ymlhcz5cbiogQG1vZHVsZSBMb2dnZXJTZXJ2aWNlXG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogQ29uc29sZSBMb2cgd3JhcHBlciB0aGF0IGNhbiBiZSBkaXNhYmxlZCBpbiBwcm9kdWN0aW9uIG1vZGVcbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xuXG4gIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxuXG4gIGNvdW50KGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBncm91cChhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5jb3VudChhcmcpO1xuICB9XG5cbiAgZ3JvdXBFbmQoKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICBwcm9maWxlKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBwcm9maWxlRW5kKCkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5wcm9maWxlRW5kKCk7XG4gIH1cblxuICB0aW1lKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLnRpbWUoYXJnKTtcbiAgfVxuXG4gIHRpbWVFbmQoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUudGltZUVuZChhcmcpO1xuICB9XG59XG4iXX0=