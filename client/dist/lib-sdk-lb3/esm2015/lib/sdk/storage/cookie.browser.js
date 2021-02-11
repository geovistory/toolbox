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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLmJyb3dzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3N0b3JhZ2UvY29va2llLmJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDOzs7Ozs7O0dBT0c7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBVDFCOzs7Ozs7O09BT0c7SUFDSDtRQUVFOztZQUVJO1FBQ0ksWUFBTyxHQUFvQixFQUFFLENBQUM7SUE4RHhDLENBQUM7SUE3REM7Ozs7OztRQU1JO0lBQ0osR0FBRyxDQUFDLEdBQVc7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUTtpQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDbEIsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzVFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7Ozs7O1FBUUk7SUFDSixHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWMsT0FBTyxDQUFDLFdBQVcsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBQ0Q7Ozs7OztRQU1JO0lBQ0osTUFBTSxDQUFDLEdBQVc7UUFDaEIsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsbURBQW1ELENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7OztRQU9JO0lBQ0ksS0FBSyxDQUFDLEtBQVU7UUFDdEIsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWxFWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTtHQUNBLGFBQWEsQ0FrRXpCO1NBbEVZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBDb29raWVJbnRlcmZhY2UgeyBba2V5OiBzdHJpbmddOiBhbnkgfVxuLyoqXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4qIEBtb2R1bGUgQ29va2llQnJvd3NlclxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIGhhbmRsZSBjb29raWVzLCBpdCB3aWxsIGJlIHByb3ZpZGVkIHVzaW5nIERJIFN3YXBwaW5nIGFjY29yZGluZyB0aGVcbiogU0RLIFNvY2tldCBEcml2ZXIgQXZhaWxhYmxlIGN1cnJlbnRseSBzdXBwb3J0aW5nIEFuZ3VsYXIgMiBmb3Igd2ViIGFuZCBOYXRpdmVTY3JpcHQgMi5cbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZUJyb3dzZXIge1xuICAvKipcbiAgICogQHR5cGUge0Nvb2tpZUludGVyZmFjZX1cbiAgICoqL1xuICBwcml2YXRlIGNvb2tpZXM6IENvb2tpZUludGVyZmFjZSA9IHt9O1xuICAvKipcbiAgICogQG1ldGhvZCBnZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBDb29raWUga2V5IG5hbWVcbiAgICogQHJldHVybiB7YW55fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGdldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBjb29raWVzLlxuICAgKiovXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvb2tpZXNba2V5XSkge1xuICAgICAgbGV0IGNvb2tpZSA9IHdpbmRvdy5kb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgIC5jb29raWUuc3BsaXQoJzsgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBhbnkpID0+IGl0ZW0uc3BsaXQoJz0nKVswXSA9PT0ga2V5KS5wb3AoKTtcbiAgICAgIGlmICghY29va2llKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvb2tpZXNba2V5XSA9IHRoaXMucGFyc2UoY29va2llLnNwbGl0KCc9Jykuc2xpY2UoMSkuam9pbignPScpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb29raWVzW2tleV07XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQ29va2llIGtleSBuYW1lXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBBbnkgdmFsdWVcbiAgICogQHBhcmFtIHtEYXRlPX0gZXhwaXJlcyBUaGUgZGF0ZSBvZiBleHBpcmF0aW9uIChPcHRpb25hbClcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBzZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gY29va2llcy5cbiAgICoqL1xuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGV4cGlyZXM/OiBEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5jb29raWVzW2tleV0gPSB2YWx1ZTtcbiAgICBsZXQgY29va2llID0gYCR7a2V5fT0ke2VuY29kZVVSSSh2YWx1ZSl9OyBwYXRoPS8ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7IGV4cGlyZXMudG9VVENTdHJpbmcoKSB9YCA6ICcnfWA7XG4gICAgd2luZG93LmRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZW1vdmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBDb29raWUga2V5IG5hbWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGEgY29va2llIGZyb20gdGhlIGNsaWVudC5cbiAgICoqL1xuICByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBrZXkgKyAnPTsgcGF0aD0vOyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UOyc7XG4gICAgZGVsZXRlIHRoaXMuY29va2llc1trZXldO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHBhcnNlXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBJbnB1dCBkYXRhIGV4cGVjdGVkIHRvIGJlIEpTT05cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcGFyc2UgdGhlIHN0cmluZyBhcyBKU09OIGlmIHBvc3NpYmxlLCBvdGhlcndpc2Ugd2lsbFxuICAgKiByZXR1cm4gdGhlIHZhbHVlIGl0c2VsZi5cbiAgICoqL1xuICBwcml2YXRlIHBhcnNlKHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVVUkkodmFsdWUpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==