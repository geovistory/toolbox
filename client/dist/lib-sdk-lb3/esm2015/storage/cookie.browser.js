import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module CookieBrowser
* @license MIT
* @description
* This module handle cookies, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
let CookieBrowser = class CookieBrowser {
    /**
    * @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
    * @module CookieBrowser
    * @license MIT
    * @description
    * This module handle cookies, it will be provided using DI Swapping according the
    * SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
    **/
    constructor() {
        /**
         * @type {CookieInterface}
         **/
        this.cookies = {};
    }
    /**
     * @method get
     * @param {string} key Cookie key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in cookies.
     **/
    get(key) {
        if (!this.cookies[key]) {
            let cookie = window.document
                .cookie.split('; ')
                .filter((item) => item.split('=')[0] === key).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    }
    /**
     * @method set
     * @param {string} key Cookie key name
     * @param {any} value Any value
     * @param {Date=} expires The date of expiration (Optional)
     * @return {void}
     * @description
     * The setter will return any type of data persisted in cookies.
     **/
    set(key, value, expires) {
        this.cookies[key] = value;
        let cookie = `${key}=${encodeURI(value)}; path=/${expires ? `; expires=${expires.toUTCString()}` : ''}`;
        window.document.cookie = cookie;
    }
    /**
     * @method remove
     * @param {string} key Cookie key name
     * @return {void}
     * @description
     * This method will remove a cookie from the client.
     **/
    remove(key) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
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
            return JSON.parse(decodeURI(value));
        }
        catch (e) {
            return value;
        }
    }
};
CookieBrowser = tslib_1.__decorate([
    Injectable()
], CookieBrowser);
export { CookieBrowser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLmJyb3dzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJzdG9yYWdlL2Nvb2tpZS5icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQzs7Ozs7OztHQU9HO0FBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVQxQjs7Ozs7OztPQU9HO0lBQ0g7UUFFRTs7WUFFSTtRQUNJLFlBQU8sR0FBb0IsRUFBRSxDQUFDO0lBOER4QyxDQUFDO0lBN0RDOzs7Ozs7UUFNSTtJQUNKLEdBQUcsQ0FBQyxHQUFXO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7aUJBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ2xCLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7Ozs7OztRQVFJO0lBQ0osR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUUsT0FBYztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFjLE9BQU8sQ0FBQyxXQUFXLEVBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7Ozs7UUFNSTtJQUNKLE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLG1EQUFtRCxDQUFDO1FBQzVFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7Ozs7UUFPSTtJQUNJLEtBQUssQ0FBQyxLQUFVO1FBQ3RCLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFsRVksYUFBYTtJQUR6QixVQUFVLEVBQUU7R0FDQSxhQUFhLENBa0V6QjtTQWxFWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29va2llSW50ZXJmYWNlIHsgW2tleTogc3RyaW5nXTogYW55IH1cbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuKiBAbW9kdWxlIENvb2tpZUJyb3dzZXJcbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgY29va2llcywgaXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBESSBTd2FwcGluZyBhY2NvcmRpbmcgdGhlXG4qIFNESyBTb2NrZXQgRHJpdmVyIEF2YWlsYWJsZSBjdXJyZW50bHkgc3VwcG9ydGluZyBBbmd1bGFyIDIgZm9yIHdlYiBhbmQgTmF0aXZlU2NyaXB0IDIuXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb29raWVCcm93c2VyIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtDb29raWVJbnRlcmZhY2V9XG4gICAqKi9cbiAgcHJpdmF0ZSBjb29raWVzOiBDb29raWVJbnRlcmZhY2UgPSB7fTtcbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQ29va2llIGtleSBuYW1lXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBnZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gY29va2llcy5cbiAgICoqL1xuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICghdGhpcy5jb29raWVzW2tleV0pIHtcbiAgICAgIGxldCBjb29raWUgPSB3aW5kb3cuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAuY29va2llLnNwbGl0KCc7ICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLnNwbGl0KCc9JylbMF0gPT09IGtleSkucG9wKCk7XG4gICAgICBpZiAoIWNvb2tpZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb29raWVzW2tleV0gPSB0aGlzLnBhcnNlKGNvb2tpZS5zcGxpdCgnPScpLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29va2llc1trZXldO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IENvb2tpZSBrZXkgbmFtZVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgQW55IHZhbHVlXG4gICAqIEBwYXJhbSB7RGF0ZT19IGV4cGlyZXMgVGhlIGRhdGUgb2YgZXhwaXJhdGlvbiAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgc2V0dGVyIHdpbGwgcmV0dXJuIGFueSB0eXBlIG9mIGRhdGEgcGVyc2lzdGVkIGluIGNvb2tpZXMuXG4gICAqKi9cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuY29va2llc1trZXldID0gdmFsdWU7XG4gICAgbGV0IGNvb2tpZSA9IGAke2tleX09JHtlbmNvZGVVUkkodmFsdWUpfTsgcGF0aD0vJHtleHBpcmVzID8gYDsgZXhwaXJlcz0keyBleHBpcmVzLnRvVVRDU3RyaW5nKCkgfWAgOiAnJ31gO1xuICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQ29va2llIGtleSBuYW1lXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBhIGNvb2tpZSBmcm9tIHRoZSBjbGllbnQuXG4gICAqKi9cbiAgcmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz07IHBhdGg9LzsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVDsnO1xuICAgIGRlbGV0ZSB0aGlzLmNvb2tpZXNba2V5XTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBwYXJzZVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgSW5wdXQgZGF0YSBleHBlY3RlZCB0byBiZSBKU09OXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHBhcnNlIHRoZSBzdHJpbmcgYXMgSlNPTiBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIHdpbGxcbiAgICogcmV0dXJuIHRoZSB2YWx1ZSBpdHNlbGYuXG4gICAqKi9cbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJKHZhbHVlKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=