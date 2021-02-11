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
let StorageBrowser = class StorageBrowser {
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    get(key) {
        let data = localStorage.getItem(key);
        return this.parse(data);
    }
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key, value, expires) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    }
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
        else {
            console.log('Trying to remove unexisting key: ', key);
        }
    }
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    parse(value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
};
StorageBrowser = tslib_1.__decorate([
    Injectable()
], StorageBrowser);
export { StorageBrowser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5icm93c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic3RvcmFnZS9zdG9yYWdlLmJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDOzs7Ozs7O0dBT0c7QUFFSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCOzs7Ozs7UUFNSTtJQUNKLEdBQUcsQ0FBQyxHQUFXO1FBQ2IsSUFBSSxJQUFJLEdBQVcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7Ozs7O1FBT0k7SUFDSixHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQ3pDLFlBQVksQ0FBQyxPQUFPLENBQ2xCLEdBQUcsRUFDSCxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDMUQsQ0FBQztJQUNKLENBQUM7SUFDRDs7Ozs7O1FBTUk7SUFDSixNQUFNLENBQUMsR0FBVztRQUNoQixJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztJQUNEOzs7Ozs7O1FBT0k7SUFDSSxLQUFLLENBQUMsS0FBVTtRQUN0QixJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBdkRZLGNBQWM7SUFEMUIsVUFBVSxFQUFFO0dBQ0EsY0FBYyxDQXVEMUI7U0F2RFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKipcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiogQG1vZHVsZSBTdG9yYWdlQnJvd3NlclxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIGhhbmRsZSBsb2NhbFN0b3JhZ2UsIGl0IHdpbGwgYmUgcHJvdmlkZWQgdXNpbmcgREkgU3dhcHBpbmcgYWNjb3JkaW5nIHRoZVxuKiBTREsgU29ja2V0IERyaXZlciBBdmFpbGFibGUgY3VycmVudGx5IHN1cHBvcnRpbmcgQW5ndWxhciAyIGZvciB3ZWIgYW5kIE5hdGl2ZVNjcmlwdCAyLlxuKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RvcmFnZUJyb3dzZXIge1xuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBnZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gbG9jYWxTdG9yYWdlLlxuICAgKiovXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IGRhdGE6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2UoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgU3RvcmFnZSBrZXkgbmFtZVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgQW55IHZhbHVlXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgc2V0dGVyIHdpbGwgcmV0dXJuIGFueSB0eXBlIG9mIGRhdGEgcGVyc2lzdGVkIGluIGxvY2FsU3RvcmFnZS5cbiAgICoqL1xuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICBrZXksXG4gICAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWVcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGEgbG9jYWxTdG9yYWdlIGl0ZW0gZnJvbSB0aGUgY2xpZW50LlxuICAgKiovXG4gIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChsb2NhbFN0b3JhZ2Vba2V5XSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1RyeWluZyB0byByZW1vdmUgdW5leGlzdGluZyBrZXk6ICcsIGtleSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHBhcnNlXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBJbnB1dCBkYXRhIGV4cGVjdGVkIHRvIGJlIEpTT05cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcGFyc2UgdGhlIHN0cmluZyBhcyBKU09OIGlmIHBvc3NpYmxlLCBvdGhlcndpc2Ugd2lsbFxuICAgKiByZXR1cm4gdGhlIHZhbHVlIGl0c2VsZi5cbiAgICoqL1xuICBwcml2YXRlIHBhcnNlKHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=