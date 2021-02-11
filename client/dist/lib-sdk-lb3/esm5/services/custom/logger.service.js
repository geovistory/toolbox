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
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (LoopBackConfig.debuggable())
            console.log.apply(console, args);
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (LoopBackConfig.debuggable())
            console.info.apply(console, args);
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (LoopBackConfig.debuggable())
            console.error.apply(console, args);
    };
    LoggerService.prototype.count = function (arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.group = function (arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.groupEnd = function () {
        if (LoopBackConfig.debuggable())
            console.groupEnd();
    };
    LoggerService.prototype.profile = function (arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    };
    LoggerService.prototype.profileEnd = function () {
        if (LoopBackConfig.debuggable())
            console.profileEnd();
    };
    LoggerService.prototype.time = function (arg) {
        if (LoopBackConfig.debuggable())
            console.time(arg);
    };
    LoggerService.prototype.timeEnd = function (arg) {
        if (LoopBackConfig.debuggable())
            console.timeEnd(arg);
    };
    LoggerService = tslib_1.__decorate([
        Injectable()
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jdXN0b20vbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRDs7Ozs7O0dBTUc7QUFFSDtJQUFBO0lBbURBLENBQUM7SUFqREMsMkJBQUcsR0FBSDtRQUFJLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ2hCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDRCQUFJLEdBQUo7UUFBSyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNqQixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQU0sY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDbEIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsNkJBQUssR0FBTCxVQUFNLEdBQVc7UUFDZixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsNkJBQUssR0FBTCxVQUFNLEdBQVc7UUFDZixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNFLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxHQUFXO1FBQ2pCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0UsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLEdBQVc7UUFDZCxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLEdBQVc7UUFDakIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQWxEVSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtPQUNBLGFBQWEsQ0FtRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQW5EWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QGpvaG5jYXNhcnJ1Ymlhcz5cbiogQG1vZHVsZSBMb2dnZXJTZXJ2aWNlXG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogQ29uc29sZSBMb2cgd3JhcHBlciB0aGF0IGNhbiBiZSBkaXNhYmxlZCBpbiBwcm9kdWN0aW9uIG1vZGVcbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xuXG4gIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBpbmZvKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgYXJncyk7XG4gIH1cblxuICBlcnJvciguLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxuXG4gIGNvdW50KGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBncm91cChhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5jb3VudChhcmcpO1xuICB9XG5cbiAgZ3JvdXBFbmQoKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gIH1cblxuICBwcm9maWxlKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBwcm9maWxlRW5kKCkge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS5wcm9maWxlRW5kKCk7XG4gIH1cblxuICB0aW1lKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLnRpbWUoYXJnKTtcbiAgfVxuXG4gIHRpbWVFbmQoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUudGltZUVuZChhcmcpO1xuICB9XG59XG4iXX0=