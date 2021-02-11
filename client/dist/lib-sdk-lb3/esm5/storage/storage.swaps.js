import * as tslib_1 from "tslib";
/* tslint:disable */
/**
 * @module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
var BaseStorage = /** @class */ (function () {
    function BaseStorage() {
    }
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in storage.
     **/
    BaseStorage.prototype.get = function (key) { };
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    BaseStorage.prototype.set = function (key, value, expires) { };
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    BaseStorage.prototype.remove = function (key) { };
    return BaseStorage;
}());
export { BaseStorage };
/**
 * @module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 * This is mainly required because Angular Universal integration.
 * It does inject a CookieStorage instead of LocalStorage.
 **/
var InternalStorage = /** @class */ (function (_super) {
    tslib_1.__extends(InternalStorage, _super);
    function InternalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalStorage;
}(BaseStorage));
export { InternalStorage };
/**
 * @module SDKStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SDKStorage class is used for dependency injection swapping.
 * It will be provided using factory method according the right environment.
 * This is created for public usage, to allow persisting custom data
 * Into the local storage API.
 **/
var SDKStorage = /** @class */ (function (_super) {
    tslib_1.__extends(SDKStorage, _super);
    function SDKStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SDKStorage;
}(BaseStorage));
export { SDKStorage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zd2Fwcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbInN0b3JhZ2Uvc3RvcmFnZS5zd2Fwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCOzs7Ozs7O0lBT0k7QUFDSjtJQUFBO0lBMEJBLENBQUM7SUF6QkM7Ozs7OztRQU1JO0lBQ0oseUJBQUcsR0FBSCxVQUFJLEdBQVcsSUFBUSxDQUFDO0lBQ3hCOzs7Ozs7O1FBT0k7SUFDSix5QkFBRyxHQUFILFVBQUksR0FBVyxFQUFFLEtBQVUsRUFBRSxPQUFjLElBQVMsQ0FBQztJQUNyRDs7Ozs7O1FBTUk7SUFDSiw0QkFBTSxHQUFOLFVBQU8sR0FBVyxJQUFTLENBQUM7SUFDOUIsa0JBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDOztBQUNEOzs7Ozs7Ozs7SUFTSTtBQUNKO0lBQXFDLDJDQUFXO0lBQWhEOztJQUFrRCxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBQW5ELENBQXFDLFdBQVcsR0FBRzs7QUFDbkQ7Ozs7Ozs7OztJQVNJO0FBQ0o7SUFBZ0Msc0NBQVc7SUFBM0M7O0lBQTZDLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBOUMsQ0FBZ0MsV0FBVyxHQUFHIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICrCoEBtb2R1bGUgU3RvcmFnZVxuICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gKiBAbGljZW5zZSBNSVRcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIEludGVybmFsU3RvcmFnZSBjbGFzcyBpcyB1c2VkIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbiBzd2FwcGluZy5cbiAqIEl0IHdpbGwgYmUgcHJvdmlkZWQgdXNpbmcgZmFjdG9yeSBtZXRob2QgZnJvbSBkaWZmZXJlbnQgc291cmNlcy5cbiAqKi9cbmV4cG9ydCBjbGFzcyBCYXNlU3RvcmFnZSB7XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHJldHVybiB7YW55fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGdldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBzdG9yYWdlLlxuICAgKiovXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7fVxuICAvKipcbiAgICogQG1ldGhvZCBzZXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSBBbnkgdmFsdWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBzZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gbG9jYWxTdG9yYWdlLlxuICAgKiovXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHt9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlbW92ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGEgbG9jYWxTdG9yYWdlIGl0ZW0gZnJvbSB0aGUgY2xpZW50LlxuICAgKiovXG4gIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge31cbn1cbi8qKlxuICrCoEBtb2R1bGUgSW50ZXJuYWxTdG9yYWdlXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAqIEBsaWNlbnNlIE1JVFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgSW50ZXJuYWxTdG9yYWdlIGNsYXNzIGlzIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN3YXBwaW5nLlxuICogSXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBmYWN0b3J5IG1ldGhvZCBmcm9tIGRpZmZlcmVudCBzb3VyY2VzLlxuICogVGhpcyBpcyBtYWlubHkgcmVxdWlyZWQgYmVjYXVzZSBBbmd1bGFyIFVuaXZlcnNhbCBpbnRlZ3JhdGlvbi5cbiAqIEl0IGRvZXMgaW5qZWN0IGEgQ29va2llU3RvcmFnZSBpbnN0ZWFkIG9mIExvY2FsU3RvcmFnZS5cbiAqKi9cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbFN0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZSB7fVxuLyoqXG4gKsKgQG1vZHVsZSBTREtTdG9yYWdlXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAqIEBsaWNlbnNlIE1JVFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgU0RLU3RvcmFnZSBjbGFzcyBpcyB1c2VkIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbiBzd2FwcGluZy5cbiAqIEl0IHdpbGwgYmUgcHJvdmlkZWQgdXNpbmcgZmFjdG9yeSBtZXRob2QgYWNjb3JkaW5nIHRoZSByaWdodCBlbnZpcm9ubWVudC5cbiAqIFRoaXMgaXMgY3JlYXRlZCBmb3IgcHVibGljIHVzYWdlLCB0byBhbGxvdyBwZXJzaXN0aW5nIGN1c3RvbSBkYXRhXG4gKiBJbnRvIHRoZSBsb2NhbCBzdG9yYWdlIEFQSS5cbiAqKi9cbmV4cG9ydCBjbGFzcyBTREtTdG9yYWdlIGV4dGVuZHMgQmFzZVN0b3JhZ2Uge31cbiJdfQ==