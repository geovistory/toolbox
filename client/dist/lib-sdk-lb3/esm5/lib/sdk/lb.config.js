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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9sYi5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0g7SUFBQTtJQXFGQSxDQUFDO0lBM0VlLDRCQUFhLEdBQTNCLFVBQTRCLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsZUFBdUI7UUFDakQsY0FBYyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQUVhLDRCQUFhLEdBQTNCO1FBQ0UsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFYSx5QkFBVSxHQUF4QixVQUF5QixHQUFpQjtRQUFqQixvQkFBQSxFQUFBLFNBQWlCO1FBQ3hDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQzVCLENBQUM7SUFFYSxzQkFBTyxHQUFyQjtRQUNFLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRWEsNEJBQWEsR0FBM0IsVUFBNEIsVUFBdUI7UUFBdkIsMkJBQUEsRUFBQSxlQUF1QjtRQUNqRCxjQUFjLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUN6QyxDQUFDO0lBRWEsNEJBQWEsR0FBM0I7UUFDRSxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUM7SUFDbkMsQ0FBQztJQUVhLDJCQUFZLEdBQTFCLFVBQTJCLFNBQWtCO1FBQzNDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ25DLENBQUM7SUFFYSx5QkFBVSxHQUF4QjtRQUNFLE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRWEsMEJBQVcsR0FBekI7UUFDRSxjQUFjLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRWEsOEJBQWUsR0FBN0I7UUFDRSxjQUFjLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztJQUN0QyxDQUFDO0lBRWEseUJBQVUsR0FBeEI7UUFDRSxjQUFjLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRWEsNkJBQWMsR0FBNUI7UUFDRSxjQUFjLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRWEsb0NBQXFCLEdBQW5DO1FBQ0UsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVhLGdDQUFpQixHQUEvQjtRQUNFLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFYSxrQ0FBbUIsR0FBakM7UUFDRSxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRWEsb0NBQXFCLEdBQW5DO1FBQ0UsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVhLG9DQUFxQixHQUFuQztRQUNFLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRWEsMkNBQTRCLEdBQTFDLFVBQTJDLGVBQWdDO1FBQWhDLGdDQUFBLEVBQUEsdUJBQWdDO1FBQ3pFLGNBQWMsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQ25ELENBQUM7SUFFYSwyQ0FBNEIsR0FBMUM7UUFDRSxPQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUM7SUFDeEMsQ0FBQztJQW5GYyxtQkFBSSxHQUFXLFNBQVMsQ0FBQztJQUN6QixzQkFBTyxHQUFvQixTQUFTLENBQUM7SUFDckMseUJBQVUsR0FBVyxFQUFFLENBQUM7SUFDeEIsb0JBQUssR0FBWSxJQUFJLENBQUM7SUFDdEIsdUJBQVEsR0FBVyxTQUFTLENBQUM7SUFDN0Isc0JBQU8sR0FBVyxTQUFTLENBQUM7SUFDNUIscUJBQU0sR0FBWSxLQUFLLENBQUM7SUFDeEIsOEJBQWUsR0FBWSxLQUFLLENBQUM7SUE2RWxELHFCQUFDO0NBQUEsQUFyRkQsSUFxRkM7U0FyRlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiogQG1vZHVsZSBMb29wQmFja0NvbmZpZ1xuKiBAZGVzY3JpcHRpb25cbipcbiogVGhlIExvb3BCYWNrQ29uZmlnIG1vZHVsZSBoZWxwIGRldmVsb3BlcnMgdG8gZXh0ZXJuYWxseSBcbiogY29uZmlndXJlIHRoZSBiYXNlIHVybCBhbmQgYXBpIHZlcnNpb24gZm9yIGxvb3BiYWNrLmlvXG4qXG4qIEV4YW1wbGVcbipcbiogaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuL3Nkayc7XG4qIFxuKiBAQ29tcG9uZW50KCkgLy8gTm8gbWV0YWRhdGEgbmVlZGVkIGZvciB0aGlzIG1vZHVsZVxuKlxuKiBleHBvcnQgY2xhc3MgTXlBcHAge1xuKiAgIGNvbnN0cnVjdG9yKCkge1xuKiAgICAgTG9vcEJhY2tDb25maWcuc2V0QmFzZVVSTCgnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG4qICAgICBMb29wQmFja0NvbmZpZy5zZXRBcGlWZXJzaW9uKCdhcGknKTtcbiogICB9XG4qIH1cbioqL1xuZXhwb3J0IGNsYXNzIExvb3BCYWNrQ29uZmlnIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcGF0aDogc3RyaW5nID0gJy8vOjMwMDAnO1xuICBwcml2YXRlIHN0YXRpYyB2ZXJzaW9uOiBzdHJpbmcgfMKgbnVtYmVyID0gJ2xiMy1hcGknO1xuICBwcml2YXRlIHN0YXRpYyBhdXRoUHJlZml4OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBzdGF0aWMgZGVidWc6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIHN0YXRpYyBmaWx0ZXJPbjogc3RyaW5nID0gJ2hlYWRlcnMnO1xuICBwcml2YXRlIHN0YXRpYyB3aGVyZU9uOiBzdHJpbmcgPSAnaGVhZGVycyc7XG4gIHByaXZhdGUgc3RhdGljIHNlY3VyZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHN0YXRpYyB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgc3RhdGljIHNldEFwaVZlcnNpb24odmVyc2lvbjogc3RyaW5nID0gJ2FwaScpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgfVxuICBcbiAgcHVibGljIHN0YXRpYyBnZXRBcGlWZXJzaW9uKCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLnZlcnNpb247XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldEJhc2VVUkwodXJsOiBzdHJpbmcgPSAnLycpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy5wYXRoID0gdXJsO1xuICB9XG4gIFxuICBwdWJsaWMgc3RhdGljIGdldFBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTG9vcEJhY2tDb25maWcucGF0aDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0QXV0aFByZWZpeChhdXRoUHJlZml4OiBzdHJpbmcgPSAnJyk6IHZvaWQge1xuICAgIExvb3BCYWNrQ29uZmlnLmF1dGhQcmVmaXggPSBhdXRoUHJlZml4O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRBdXRoUHJlZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLmF1dGhQcmVmaXg7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldERlYnVnTW9kZShpc0VuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy5kZWJ1ZyA9IGlzRW5hYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZGVidWdnYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gTG9vcEJhY2tDb25maWcuZGVidWc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbHRlck9uVXJsKCk6IHZvaWQge1xuICAgIExvb3BCYWNrQ29uZmlnLmZpbHRlck9uID0gJ3VybCc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbHRlck9uSGVhZGVycygpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy5maWx0ZXJPbiA9ICdoZWFkZXJzJztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgd2hlcmVPblVybCgpOiB2b2lkIHtcbiAgICBMb29wQmFja0NvbmZpZy53aGVyZU9uID0gJ3VybCc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHdoZXJlT25IZWFkZXJzKCk6IHZvaWQge1xuICAgIExvb3BCYWNrQ29uZmlnLndoZXJlT24gPSAnaGVhZGVycyc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzSGVhZGVyc0ZpbHRlcmluZ1NldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKExvb3BCYWNrQ29uZmlnLmZpbHRlck9uID09PSAnaGVhZGVycycpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0hlYWRlcnNXaGVyZVNldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKExvb3BCYWNrQ29uZmlnLndoZXJlT24gPT09ICdoZWFkZXJzJyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldFNlY3VyZVdlYlNvY2tldHMoKTogdm9pZCB7XG4gICAgTG9vcEJhY2tDb25maWcuc2VjdXJlID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgdW5zZXRTZWN1cmVXZWJTb2NrZXRzKCk6IHZvaWQge1xuICAgIExvb3BCYWNrQ29uZmlnLnNlY3VyZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc1NlY3VyZVdlYlNvY2tldHNTZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIExvb3BCYWNrQ29uZmlnLnNlY3VyZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0UmVxdWVzdE9wdGlvbnNDcmVkZW50aWFscyh3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIExvb3BCYWNrQ29uZmlnLndpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UmVxdWVzdE9wdGlvbnNDcmVkZW50aWFscygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gTG9vcEJhY2tDb25maWcud2l0aENyZWRlbnRpYWxzO1xuICB9XG59XG4iXX0=