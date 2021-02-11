import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module StorageBrowser
* @license MIT
* @description
* This module handle localStorage, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
var StorageBrowser = /** @class */ (function () {
    function StorageBrowser() {
    }
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    StorageBrowser.prototype.get = function (key) {
        var data = localStorage.getItem(key);
        return this.parse(data);
    };
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    StorageBrowser.prototype.set = function (key, value, expires) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    };
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    StorageBrowser.prototype.remove = function (key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
        else {
            console.log('Trying to remove unexisting key: ', key);
        }
    };
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    StorageBrowser.prototype.parse = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    StorageBrowser = tslib_1.__decorate([
        Injectable()
    ], StorageBrowser);
    return StorageBrowser;
}());
export { StorageBrowser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5icm93c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zdG9yYWdlL3N0b3JhZ2UuYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0M7Ozs7Ozs7R0FPRztBQUVIO0lBQUE7SUF1REEsQ0FBQztJQXREQzs7Ozs7O1FBTUk7SUFDSiw0QkFBRyxHQUFILFVBQUksR0FBVztRQUNiLElBQUksSUFBSSxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRDs7Ozs7OztRQU9JO0lBQ0osNEJBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxLQUFVLEVBQUUsT0FBYztRQUN6QyxZQUFZLENBQUMsT0FBTyxDQUNsQixHQUFHLEVBQ0gsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQzFELENBQUM7SUFDSixDQUFDO0lBQ0Q7Ozs7OztRQU1JO0lBQ0osK0JBQU0sR0FBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7SUFDRDs7Ozs7OztRQU9JO0lBQ0ksOEJBQUssR0FBYixVQUFjLEtBQVU7UUFDdEIsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBdERVLGNBQWM7UUFEMUIsVUFBVSxFQUFFO09BQ0EsY0FBYyxDQXVEMUI7SUFBRCxxQkFBQztDQUFBLEFBdkRELElBdURDO1NBdkRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4qIEBtb2R1bGUgU3RvcmFnZUJyb3dzZXJcbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgbG9jYWxTdG9yYWdlLCBpdCB3aWxsIGJlIHByb3ZpZGVkIHVzaW5nIERJIFN3YXBwaW5nIGFjY29yZGluZyB0aGVcbiogU0RLIFNvY2tldCBEcml2ZXIgQXZhaWxhYmxlIGN1cnJlbnRseSBzdXBwb3J0aW5nIEFuZ3VsYXIgMiBmb3Igd2ViIGFuZCBOYXRpdmVTY3JpcHQgMi5cbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VCcm93c2VyIHtcbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgU3RvcmFnZSBrZXkgbmFtZVxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgZ2V0dGVyIHdpbGwgcmV0dXJuIGFueSB0eXBlIG9mIGRhdGEgcGVyc2lzdGVkIGluIGxvY2FsU3RvcmFnZS5cbiAgICoqL1xuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGxldCBkYXRhOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIHJldHVybiB0aGlzLnBhcnNlKGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIEFueSB2YWx1ZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHNldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBsb2NhbFN0b3JhZ2UuXG4gICAqKi9cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAga2V5LFxuICAgICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBhIGxvY2FsU3RvcmFnZSBpdGVtIGZyb20gdGhlIGNsaWVudC5cbiAgICoqL1xuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlW2tleV0pIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUcnlpbmcgdG8gcmVtb3ZlIHVuZXhpc3Rpbmcga2V5OiAnLCBrZXkpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBwYXJzZVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgSW5wdXQgZGF0YSBleHBlY3RlZCB0byBiZSBKU09OXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHBhcnNlIHRoZSBzdHJpbmcgYXMgSlNPTiBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIHdpbGxcbiAgICogcmV0dXJuIHRoZSB2YWx1ZSBpdHNlbGYuXG4gICAqKi9cbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19