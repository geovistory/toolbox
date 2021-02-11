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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5icm93c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zdG9yYWdlL3N0b3JhZ2UuYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0M7Ozs7Ozs7R0FPRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekI7Ozs7OztRQU1JO0lBQ0osR0FBRyxDQUFDLEdBQVc7UUFDYixJQUFJLElBQUksR0FBVyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0Q7Ozs7Ozs7UUFPSTtJQUNKLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWM7UUFDekMsWUFBWSxDQUFDLE9BQU8sQ0FDbEIsR0FBRyxFQUNILE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUMxRCxDQUFDO0lBQ0osQ0FBQztJQUNEOzs7Ozs7UUFNSTtJQUNKLE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBQ0Q7Ozs7Ozs7UUFPSTtJQUNJLEtBQUssQ0FBQyxLQUFVO1FBQ3RCLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2RFksY0FBYztJQUQxQixVQUFVLEVBQUU7R0FDQSxjQUFjLENBdUQxQjtTQXZEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuKiBAbW9kdWxlIFN0b3JhZ2VCcm93c2VyXG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogVGhpcyBtb2R1bGUgaGFuZGxlIGxvY2FsU3RvcmFnZSwgaXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBESSBTd2FwcGluZyBhY2NvcmRpbmcgdGhlXG4qIFNESyBTb2NrZXQgRHJpdmVyIEF2YWlsYWJsZSBjdXJyZW50bHkgc3VwcG9ydGluZyBBbmd1bGFyIDIgZm9yIHdlYiBhbmQgTmF0aXZlU2NyaXB0IDIuXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yYWdlQnJvd3NlciB7XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHJldHVybiB7YW55fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGdldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBsb2NhbFN0b3JhZ2UuXG4gICAqKi9cbiAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgZGF0YTogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZShkYXRhKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBBbnkgdmFsdWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBzZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gbG9jYWxTdG9yYWdlLlxuICAgKiovXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgIGtleSxcbiAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgU3RvcmFnZSBrZXkgbmFtZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZW1vdmUgYSBsb2NhbFN0b3JhZ2UgaXRlbSBmcm9tIHRoZSBjbGllbnQuXG4gICAqKi9cbiAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZVtrZXldKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnVHJ5aW5nIHRvIHJlbW92ZSB1bmV4aXN0aW5nIGtleTogJywga2V5KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcGFyc2VcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIElucHV0IGRhdGEgZXhwZWN0ZWQgdG8gYmUgSlNPTlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBwYXJzZSB0aGUgc3RyaW5nIGFzIEpTT04gaWYgcG9zc2libGUsIG90aGVyd2lzZSB3aWxsXG4gICAqIHJldHVybiB0aGUgdmFsdWUgaXRzZWxmLlxuICAgKiovXG4gIHByaXZhdGUgcGFyc2UodmFsdWU6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==