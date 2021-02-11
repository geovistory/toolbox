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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NlcnZpY2VzL2N1c3RvbS9sb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pEOzs7Ozs7R0FNRztBQUVIO0lBQUE7SUFtREEsQ0FBQztJQWpEQywyQkFBRyxHQUFIO1FBQUksY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDaEIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNEJBQUksR0FBSjtRQUFLLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ2pCLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFBTSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNsQixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCw2QkFBSyxHQUFMLFVBQU0sR0FBVztRQUNmLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw2QkFBSyxHQUFMLFVBQU0sR0FBVztRQUNmLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLEdBQVc7UUFDakIsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDRSxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssR0FBVztRQUNkLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsR0FBVztRQUNqQixJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBbERVLGFBQWE7UUFEekIsVUFBVSxFQUFFO09BQ0EsYUFBYSxDQW1EekI7SUFBRCxvQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuLyoqXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAam9obmNhc2FycnViaWFzPlxuKiBAbW9kdWxlIExvZ2dlclNlcnZpY2VcbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBDb25zb2xlIExvZyB3cmFwcGVyIHRoYXQgY2FuIGJlIGRpc2FibGVkIGluIHByb2R1Y3Rpb24gbW9kZVxuKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nZ2VyU2VydmljZSB7XG5cbiAgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxuXG4gIGluZm8oLi4uYXJnczogYW55W10pIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxuXG4gIGVycm9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9XG5cbiAgY291bnQoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUuY291bnQoYXJnKTtcbiAgfVxuXG4gIGdyb3VwKGFyZzogc3RyaW5nKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLmNvdW50KGFyZyk7XG4gIH1cblxuICBncm91cEVuZCgpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgfVxuXG4gIHByb2ZpbGUoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUuY291bnQoYXJnKTtcbiAgfVxuXG4gIHByb2ZpbGVFbmQoKSB7XG4gICAgaWYgKExvb3BCYWNrQ29uZmlnLmRlYnVnZ2FibGUoKSlcbiAgICBjb25zb2xlLnByb2ZpbGVFbmQoKTtcbiAgfVxuXG4gIHRpbWUoYXJnOiBzdHJpbmcpIHtcbiAgICBpZiAoTG9vcEJhY2tDb25maWcuZGVidWdnYWJsZSgpKVxuICAgIGNvbnNvbGUudGltZShhcmcpO1xuICB9XG5cbiAgdGltZUVuZChhcmc6IHN0cmluZykge1xuICAgIGlmIChMb29wQmFja0NvbmZpZy5kZWJ1Z2dhYmxlKCkpXG4gICAgY29uc29sZS50aW1lRW5kKGFyZyk7XG4gIH1cbn1cbiJdfQ==