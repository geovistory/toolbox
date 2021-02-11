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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zd2Fwcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvc3RvcmFnZS9zdG9yYWdlLnN3YXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEI7Ozs7Ozs7SUFPSTtBQUNKO0lBQUE7SUEwQkEsQ0FBQztJQXpCQzs7Ozs7O1FBTUk7SUFDSix5QkFBRyxHQUFILFVBQUksR0FBVyxJQUFRLENBQUM7SUFDeEI7Ozs7Ozs7UUFPSTtJQUNKLHlCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWMsSUFBUyxDQUFDO0lBQ3JEOzs7Ozs7UUFNSTtJQUNKLDRCQUFNLEdBQU4sVUFBTyxHQUFXLElBQVMsQ0FBQztJQUM5QixrQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7O0FBQ0Q7Ozs7Ozs7OztJQVNJO0FBQ0o7SUFBcUMsMkNBQVc7SUFBaEQ7O0lBQWtELENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFBbkQsQ0FBcUMsV0FBVyxHQUFHOztBQUNuRDs7Ozs7Ozs7O0lBU0k7QUFDSjtJQUFnQyxzQ0FBVztJQUEzQzs7SUFBNkMsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUE5QyxDQUFnQyxXQUFXLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKsKgQG1vZHVsZSBTdG9yYWdlXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAqIEBsaWNlbnNlIE1JVFxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgSW50ZXJuYWxTdG9yYWdlIGNsYXNzIGlzIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN3YXBwaW5nLlxuICogSXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBmYWN0b3J5IG1ldGhvZCBmcm9tIGRpZmZlcmVudCBzb3VyY2VzLlxuICoqL1xuZXhwb3J0IGNsYXNzIEJhc2VTdG9yYWdlIHtcbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgU3RvcmFnZSBrZXkgbmFtZVxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgZ2V0dGVyIHdpbGwgcmV0dXJuIGFueSB0eXBlIG9mIGRhdGEgcGVyc2lzdGVkIGluIHN0b3JhZ2UuXG4gICAqKi9cbiAgZ2V0KGtleTogc3RyaW5nKTogYW55IHt9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIEFueSB2YWx1ZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHNldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBsb2NhbFN0b3JhZ2UuXG4gICAqKi9cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge31cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVtb3ZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgU3RvcmFnZSBrZXkgbmFtZVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZW1vdmUgYSBsb2NhbFN0b3JhZ2UgaXRlbSBmcm9tIHRoZSBjbGllbnQuXG4gICAqKi9cbiAgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7fVxufVxuLyoqXG4gKsKgQG1vZHVsZSBJbnRlcm5hbFN0b3JhZ2VcbiAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICogQGxpY2Vuc2UgTUlUXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBJbnRlcm5hbFN0b3JhZ2UgY2xhc3MgaXMgdXNlZCBmb3IgZGVwZW5kZW5jeSBpbmplY3Rpb24gc3dhcHBpbmcuXG4gKiBJdCB3aWxsIGJlIHByb3ZpZGVkIHVzaW5nIGZhY3RvcnkgbWV0aG9kIGZyb20gZGlmZmVyZW50IHNvdXJjZXMuXG4gKiBUaGlzIGlzIG1haW5seSByZXF1aXJlZCBiZWNhdXNlIEFuZ3VsYXIgVW5pdmVyc2FsIGludGVncmF0aW9uLlxuICogSXQgZG9lcyBpbmplY3QgYSBDb29raWVTdG9yYWdlIGluc3RlYWQgb2YgTG9jYWxTdG9yYWdlLlxuICoqL1xuZXhwb3J0IGNsYXNzIEludGVybmFsU3RvcmFnZSBleHRlbmRzIEJhc2VTdG9yYWdlIHt9XG4vKipcbiAqwqBAbW9kdWxlIFNES1N0b3JhZ2VcbiAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICogQGxpY2Vuc2UgTUlUXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBTREtTdG9yYWdlIGNsYXNzIGlzIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN3YXBwaW5nLlxuICogSXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBmYWN0b3J5IG1ldGhvZCBhY2NvcmRpbmcgdGhlIHJpZ2h0IGVudmlyb25tZW50LlxuICogVGhpcyBpcyBjcmVhdGVkIGZvciBwdWJsaWMgdXNhZ2UsIHRvIGFsbG93IHBlcnNpc3RpbmcgY3VzdG9tIGRhdGFcbiAqIEludG8gdGhlIGxvY2FsIHN0b3JhZ2UgQVBJLlxuICoqL1xuZXhwb3J0IGNsYXNzIFNES1N0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZSB7fVxuIl19