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
var LoopBackConfig = /** @class */ (function () {
    function LoopBackConfig() {
    }
    LoopBackConfig.setApiVersion = function (version) {
        if (version === void 0) { version = 'api'; }
        LoopBackConfig.version = version;
    };
    LoopBackConfig.getApiVersion = function () {
        return LoopBackConfig.version;
    };
    LoopBackConfig.setBaseURL = function (url) {
        if (url === void 0) { url = '/'; }
        LoopBackConfig.path = url;
    };
    LoopBackConfig.getPath = function () {
        return LoopBackConfig.path;
    };
    LoopBackConfig.setAuthPrefix = function (authPrefix) {
        if (authPrefix === void 0) { authPrefix = ''; }
        LoopBackConfig.authPrefix = authPrefix;
    };
    LoopBackConfig.getAuthPrefix = function () {
        return LoopBackConfig.authPrefix;
    };
    LoopBackConfig.setDebugMode = function (isEnabled) {
        LoopBackConfig.debug = isEnabled;
    };
    LoopBackConfig.debuggable = function () {
        return LoopBackConfig.debug;
    };
    LoopBackConfig.filterOnUrl = function () {
        LoopBackConfig.filterOn = 'url';
    };
    LoopBackConfig.filterOnHeaders = function () {
        LoopBackConfig.filterOn = 'headers';
    };
    LoopBackConfig.whereOnUrl = function () {
        LoopBackConfig.whereOn = 'url';
    };
    LoopBackConfig.whereOnHeaders = function () {
        LoopBackConfig.whereOn = 'headers';
    };
    LoopBackConfig.isHeadersFilteringSet = function () {
        return (LoopBackConfig.filterOn === 'headers');
    };
    LoopBackConfig.isHeadersWhereSet = function () {
        return (LoopBackConfig.whereOn === 'headers');
    };
    LoopBackConfig.setSecureWebSockets = function () {
        LoopBackConfig.secure = true;
    };
    LoopBackConfig.unsetSecureWebSockets = function () {
        LoopBackConfig.secure = false;
    };
    LoopBackConfig.isSecureWebSocketsSet = function () {
        return LoopBackConfig.secure;
    };
    LoopBackConfig.setRequestOptionsCredentials = function (withCredentials) {
        if (withCredentials === void 0) { withCredentials = false; }
        LoopBackConfig.withCredentials = withCredentials;
    };
    LoopBackConfig.getRequestOptionsCredentials = function () {
        return LoopBackConfig.withCredentials;
    };
    LoopBackConfig.path = '//:3000';
    LoopBackConfig.version = 'lb3-api';
    LoopBackConfig.authPrefix = '';
    LoopBackConfig.debug = true;
    LoopBackConfig.filterOn = 'headers';
    LoopBackConfig.whereOn = 'headers';
    LoopBackConfig.secure = false;
    LoopBackConfig.withCredentials = false;
    return LoopBackConfig;
}());
export { LoopBackConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNIO0lBQUE7SUFxRkEsQ0FBQztJQTNFZSw0QkFBYSxHQUEzQixVQUE0QixPQUF1QjtRQUF2Qix3QkFBQSxFQUFBLGVBQXVCO1FBQ2pELGNBQWMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFYSw0QkFBYSxHQUEzQjtRQUNFLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBRWEseUJBQVUsR0FBeEIsVUFBeUIsR0FBaUI7UUFBakIsb0JBQUEsRUFBQSxTQUFpQjtRQUN4QyxjQUFjLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUM1QixDQUFDO0lBRWEsc0JBQU8sR0FBckI7UUFDRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVhLDRCQUFhLEdBQTNCLFVBQTRCLFVBQXVCO1FBQXZCLDJCQUFBLEVBQUEsZUFBdUI7UUFDakQsY0FBYyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDekMsQ0FBQztJQUVhLDRCQUFhLEdBQTNCO1FBQ0UsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDO0lBQ25DLENBQUM7SUFFYSwyQkFBWSxHQUExQixVQUEyQixTQUFrQjtRQUMzQyxjQUFjLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRWEseUJBQVUsR0FBeEI7UUFDRSxPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVhLDBCQUFXLEdBQXpCO1FBQ0UsY0FBYyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVhLDhCQUFlLEdBQTdCO1FBQ0UsY0FBYyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDdEMsQ0FBQztJQUVhLHlCQUFVLEdBQXhCO1FBQ0UsY0FBYyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVhLDZCQUFjLEdBQTVCO1FBQ0UsY0FBYyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDckMsQ0FBQztJQUVhLG9DQUFxQixHQUFuQztRQUNFLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFYSxnQ0FBaUIsR0FBL0I7UUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRWEsa0NBQW1CLEdBQWpDO1FBQ0UsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVhLG9DQUFxQixHQUFuQztRQUNFLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFYSxvQ0FBcUIsR0FBbkM7UUFDRSxPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVhLDJDQUE0QixHQUExQyxVQUEyQyxlQUFnQztRQUFoQyxnQ0FBQSxFQUFBLHVCQUFnQztRQUN6RSxjQUFjLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUNuRCxDQUFDO0lBRWEsMkNBQTRCLEdBQTFDO1FBQ0UsT0FBTyxjQUFjLENBQUMsZUFBZSxDQUFDO0lBQ3hDLENBQUM7SUFuRmMsbUJBQUksR0FBVyxTQUFTLENBQUM7SUFDekIsc0JBQU8sR0FBb0IsU0FBUyxDQUFDO0lBQ3JDLHlCQUFVLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLG9CQUFLLEdBQVksSUFBSSxDQUFDO0lBQ3RCLHVCQUFRLEdBQVcsU0FBUyxDQUFDO0lBQzdCLHNCQUFPLEdBQVcsU0FBUyxDQUFDO0lBQzVCLHFCQUFNLEdBQVksS0FBSyxDQUFDO0lBQ3hCLDhCQUFlLEdBQVksS0FBSyxDQUFDO0lBNkVsRCxxQkFBQztDQUFBLEFBckZELElBcUZDO1NBckZZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4qIEBtb2R1bGUgTG9vcEJhY2tDb25maWdcbiogQGRlc2NyaXB0aW9uXG4qXG4qIFRoZSBMb29wQmFja0NvbmZpZyBtb2R1bGUgaGVscCBkZXZlbG9wZXJzIHRvIGV4dGVybmFsbHkgXG4qIGNvbmZpZ3VyZSB0aGUgYmFzZSB1cmwgYW5kIGFwaSB2ZXJzaW9uIGZvciBsb29wYmFjay5pb1xuKlxuKiBFeGFtcGxlXG4qXG4qIGltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi9zZGsnO1xuKiBcbiogQENvbXBvbmVudCgpIC8vIE5vIG1ldGFkYXRhIG5lZWRlZCBmb3IgdGhpcyBtb2R1bGVcbipcbiogZXhwb3J0IGNsYXNzIE15QXBwIHtcbiogICBjb25zdHJ1Y3RvcigpIHtcbiogICAgIExvb3BCYWNrQ29uZmlnLnNldEJhc2VVUkwoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpO1xuKiAgICAgTG9vcEJhY2tDb25maWcuc2V0QXBpVmVyc2lvbignYXBpJyk7XG4qICAgfVxuKiB9XG4qKi9cbmV4cG9ydCBjbGFzcyBMb29wQmFja0NvbmZpZyB7XG4gIHByaXZhdGUgc3RhdGljIHBhdGg6IHN0cmluZyA9ICcvLzozMDAwJztcbiAgcHJpdmF0ZSBzdGF0aWMgdmVyc2lvbjogc3RyaW5nIHzCoG51bWJlciA9ICdsYjMtYXBpJztcbiAgcHJpdmF0ZSBzdGF0aWMgYXV0aFByZWZpeDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgc3RhdGljIGRlYnVnOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBzdGF0aWMgZmlsdGVyT246IHN0cmluZyA9ICdoZWFkZXJzJztcbiAgcHJpdmF0ZSBzdGF0aWMgd2hlcmVPbjogc3RyaW5nID0gJ2hlYWRlcnMnO1xuICBwcml2YXRlIHN0YXRpYyBzZWN1cmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIHN0YXRpYyBzZXRBcGlWZXJzaW9uKHZlcnNpb246IHN0cmluZyA9ICdhcGknKTogdm9pZCB7XG4gICAgTG9vcEJhY2tDb25maWcudmVyc2lvbiA9IHZlcnNpb247XG4gIH1cbiAgXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QXBpVmVyc2lvbigpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIHJldHVybiBMb29wQmFja0NvbmZpZy52ZXJzaW9uO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRCYXNlVVJMKHVybDogc3RyaW5nID0gJy8nKTogdm9pZCB7XG4gICAgTG9vcEJhY2tDb25maWcucGF0aCA9IHVybDtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLnBhdGg7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldEF1dGhQcmVmaXgoYXV0aFByZWZpeDogc3RyaW5nID0gJycpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy5hdXRoUHJlZml4ID0gYXV0aFByZWZpeDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QXV0aFByZWZpeCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBMb29wQmFja0NvbmZpZy5hdXRoUHJlZml4O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXREZWJ1Z01vZGUoaXNFbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgTG9vcEJhY2tDb25maWcuZGVidWcgPSBpc0VuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGRlYnVnZ2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLmRlYnVnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWx0ZXJPblVybCgpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy5maWx0ZXJPbiA9ICd1cmwnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaWx0ZXJPbkhlYWRlcnMoKTogdm9pZCB7XG4gICAgTG9vcEJhY2tDb25maWcuZmlsdGVyT24gPSAnaGVhZGVycyc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHdoZXJlT25VcmwoKTogdm9pZCB7XG4gICAgTG9vcEJhY2tDb25maWcud2hlcmVPbiA9ICd1cmwnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyB3aGVyZU9uSGVhZGVycygpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy53aGVyZU9uID0gJ2hlYWRlcnMnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0hlYWRlcnNGaWx0ZXJpbmdTZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChMb29wQmFja0NvbmZpZy5maWx0ZXJPbiA9PT0gJ2hlYWRlcnMnKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNIZWFkZXJzV2hlcmVTZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChMb29wQmFja0NvbmZpZy53aGVyZU9uID09PSAnaGVhZGVycycpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRTZWN1cmVXZWJTb2NrZXRzKCk6IHZvaWQge1xuICAgIExvb3BCYWNrQ29uZmlnLnNlY3VyZSA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVuc2V0U2VjdXJlV2ViU29ja2V0cygpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy5zZWN1cmUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNTZWN1cmVXZWJTb2NrZXRzU2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBMb29wQmFja0NvbmZpZy5zZWN1cmU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldFJlcXVlc3RPcHRpb25zQ3JlZGVudGlhbHMod2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy53aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFJlcXVlc3RPcHRpb25zQ3JlZGVudGlhbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgfVxufVxuIl19