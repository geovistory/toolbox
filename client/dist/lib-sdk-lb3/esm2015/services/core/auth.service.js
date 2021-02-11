import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { InternalStorage } from '../../storage/storage.swaps';
import { SDKToken } from '../../models/BaseModels';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
let LoopBackAuth = class LoopBackAuth {
    /**
     * @method constructor
     * @param {InternalStorage} storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    constructor(storage) {
        this.storage = storage;
        /**
         * @type {SDKToken}
         **/
        this.token = new SDKToken();
        /**
         * @type {string}
         **/
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    /**
     * @method setRememberMe
     * @param {boolean} value Flag to remember credentials
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setRememberMe(value) {
        this.token.rememberMe = value;
    }
    /**
     * @method setUser
     * @param {any} user Any type of user model
     * @return {void}
     * @description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     **/
    setUser(user) {
        this.token.user = user;
        this.save();
    }
    /**
     * @method setToken
     * @param {SDKToken} token SDKToken or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setToken(token) {
        this.token = Object.assign({}, this.token, token);
        this.save();
    }
    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    getToken() {
        return this.token;
    }
    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    getAccessTokenId() {
        return this.token.id;
    }
    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    getCurrentUserId() {
        return this.token.userId;
    }
    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    getCurrentUserData() {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    }
    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     **/
    save() {
        let today = new Date();
        let expires = new Date(today.getTime() + (this.token.ttl * 1000));
        this.persist('id', this.token.id, expires);
        this.persist('user', this.token.user, expires);
        this.persist('userId', this.token.userId, expires);
        this.persist('created', this.token.created, expires);
        this.persist('ttl', this.token.ttl, expires);
        this.persist('rememberMe', this.token.rememberMe, expires);
        return true;
    }
    ;
    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    load(prop) {
        return this.storage.get(`${this.prefix}${prop}`);
    }
    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    clear() {
        Object.keys(this.token).forEach((prop) => this.storage.remove(`${this.prefix}${prop}`));
        this.token = new SDKToken();
    }
    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    persist(prop, value, expires) {
        try {
            this.storage.set(`${this.prefix}${prop}`, (typeof value === 'object') ? JSON.stringify(value) : value, this.token.rememberMe ? expires : null);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
};
LoopBackAuth.ctorParameters = () => [
    { type: InternalStorage, decorators: [{ type: Inject, args: [InternalStorage,] }] }
];
LoopBackAuth = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(InternalStorage))
], LoopBackAuth);
export { LoopBackAuth };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic2VydmljZXMvY29yZS9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQ7Ozs7Ozs7O0dBUUc7QUFFSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBU3ZCOzs7OztRQUtJO0lBQ0osWUFBK0MsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFkdkU7O1lBRUk7UUFDSSxVQUFLLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUN6Qzs7WUFFSTtRQUNNLFdBQU0sR0FBVyxlQUFlLENBQUM7UUFRekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENB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LENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7OztRQUtJO0lBQ00sT0FBTyxDQUFDLElBQVksRUFBRSxLQUFVLEVBQUUsT0FBYztRQUN4RCxJQUFJO1lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2QsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxFQUN2QixDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQSxPQUFPLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FDbkMsQ0FBQztTQUNIO1FBQ0QsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBckl5RCxlQUFlLHVCQUExRCxNQUFNLFNBQUMsZUFBZTs7QUFmeEIsWUFBWTtJQUR4QixVQUFVLEVBQUU7SUFnQkUsbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0dBZnpCLFlBQVksQ0FvSnhCO1NBcEpZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEludGVybmFsU3RvcmFnZSB9IGZyb20gJy4uLy4uL3N0b3JhZ2Uvc3RvcmFnZS5zd2Fwcyc7XG5pbXBvcnQgeyBTREtUb2tlbiB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuKiBAbW9kdWxlIFNvY2tldENvbm5lY3Rpb25cbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgc29ja2V0IGNvbm5lY3Rpb25zIGFuZCByZXR1cm4gc2luZ2xldG9uIGluc3RhbmNlcyBmb3IgZWFjaFxuKiBjb25uZWN0aW9uLCBpdCB3aWxsIHVzZSB0aGUgU0RLIFNvY2tldCBEcml2ZXIgQXZhaWxhYmxlIGN1cnJlbnRseSBzdXBwb3J0aW5nXG4qIEFuZ3VsYXIgMiBmb3Igd2ViLCBOYXRpdmVTY3JpcHQgMiBhbmQgQW5ndWxhciBVbml2ZXJzYWwuXG4qKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb29wQmFja0F1dGgge1xuICAvKipcbiAgICogQHR5cGUge1NES1Rva2VufVxuICAgKiovXG4gIHByaXZhdGUgdG9rZW46IFNES1Rva2VuID0gbmV3IFNES1Rva2VuKCk7XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiovXG4gIHByb3RlY3RlZCBwcmVmaXg6IHN0cmluZyA9ICckTG9vcEJhY2tTREskJztcbiAgLyoqXG4gICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtJbnRlcm5hbFN0b3JhZ2V9IHN0b3JhZ2UgSW50ZXJuYWwgU3RvcmFnZSBEcml2ZXJcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB3aWxsIGluaXRpYWxpemUgdGhlIHRva2VuIGxvYWRpbmcgZGF0YSBmcm9tIHN0b3JhZ2VcbiAgICoqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEludGVybmFsU3RvcmFnZSkgcHJvdGVjdGVkIHN0b3JhZ2U6IEludGVybmFsU3RvcmFnZSkge1xuICAgIHRoaXMudG9rZW4uaWQgPSB0aGlzLmxvYWQoJ2lkJyk7XG4gICAgdGhpcy50b2tlbi51c2VyID0gdGhpcy5sb2FkKCd1c2VyJyk7XG4gICAgdGhpcy50b2tlbi51c2VySWQgPSB0aGlzLmxvYWQoJ3VzZXJJZCcpO1xuICAgIHRoaXMudG9rZW4uY3JlYXRlZCA9IHRoaXMubG9hZCgnY3JlYXRlZCcpO1xuICAgIHRoaXMudG9rZW4udHRsID0gdGhpcy5sb2FkKCd0dGwnKTtcbiAgICB0aGlzLnRva2VuLnJlbWVtYmVyTWUgPSB0aGlzLmxvYWQoJ3JlbWVtYmVyTWUnKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBzZXRSZW1lbWJlck1lXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgRmxhZyB0byByZW1lbWJlciBjcmVkZW50aWFsc1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzZXQgYSBmbGFnIGluIG9yZGVyIHRvIHJlbWVtYmVyIHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzXG4gICAqKi9cbiAgcHVibGljIHNldFJlbWVtYmVyTWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnRva2VuLnJlbWVtYmVyTWUgPSB2YWx1ZTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBzZXRVc2VyXG4gICAqIEBwYXJhbSB7YW55fSB1c2VyIEFueSB0eXBlIG9mIHVzZXIgbW9kZWxcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSB1c2VyIGluZm9ybWF0aW9uIGFuZCBwZXJzaXN0IGl0IGlmIHRoZVxuICAgKiByZW1lbWJlck1lIGZsYWcgaXMgc2V0LlxuICAgKiovXG4gIHB1YmxpYyBzZXRVc2VyKHVzZXI6IGFueSkge1xuICAgIHRoaXMudG9rZW4udXNlciA9IHVzZXI7XG4gICAgdGhpcy5zYXZlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0VG9rZW5cbiAgICogQHBhcmFtIHtTREtUb2tlbn0gdG9rZW4gU0RLVG9rZW4gb3IgY2FzdGVkIEFjY2Vzc1Rva2VuIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNldCBhIGZsYWcgaW4gb3JkZXIgdG8gcmVtZW1iZXIgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHNcbiAgICoqL1xuICBwdWJsaWMgc2V0VG9rZW4odG9rZW46IFNES1Rva2VuKTogdm9pZCB7XG4gICAgdGhpcy50b2tlbiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudG9rZW4sIHRva2VuKTtcbiAgICB0aGlzLnNhdmUoKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBnZXRUb2tlblxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzZXQgYSBmbGFnIGluIG9yZGVyIHRvIHJlbWVtYmVyIHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzLlxuICAgKiovXG4gIHB1YmxpYyBnZXRUb2tlbigpOiBTREtUb2tlbiB7XG4gICAgcmV0dXJuIDxTREtUb2tlbj50aGlzLnRva2VuO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldEFjY2Vzc1Rva2VuSWRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIGFjdHVhbCB0b2tlbiBzdHJpbmcsIG5vdCB0aGUgb2JqZWN0IGluc3RhbmNlLlxuICAgKiovXG4gIHB1YmxpYyBnZXRBY2Nlc3NUb2tlbklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4uaWQ7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0Q3VycmVudFVzZXJJZFxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgY3VycmVudCB1c2VyIGlkLCBpdCBjYW4gYmUgbnVtYmVyIG9yIHN0cmluZy5cbiAgICoqL1xuICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJJZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnRva2VuLnVzZXJJZDtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBnZXRDdXJyZW50VXNlckRhdGFcbiAgICogQHJldHVybiB7YW55fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgdXNlciBpbnN0YW5jZS5cbiAgICoqL1xuICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJEYXRhKCk6IGFueSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdGhpcy50b2tlbi51c2VyID09PSAnc3RyaW5nJykgPyBKU09OLnBhcnNlKHRoaXMudG9rZW4udXNlcikgOiB0aGlzLnRva2VuLnVzZXI7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2F2ZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgaW5mb3JtYXRpb24gd2FzIHNhdmVkXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNhdmUgaW4gZWl0aGVyIGxvY2FsIHN0b3JhZ2Ugb3IgY29va2llcyB0aGUgY3VycmVudCBjcmVkZW50aWFscy5cbiAgICogQnV0IG9ubHkgaWYgcmVtZW1iZXJNZSBpcyBlbmFibGVkLlxuICAgKiovXG4gIHB1YmxpYyBzYXZlKCk6IGJvb2xlYW4ge1xuICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgIGxldCBleHBpcmVzID0gbmV3IERhdGUodG9kYXkuZ2V0VGltZSgpICsgKHRoaXMudG9rZW4udHRsICogMTAwMCkpO1xuICAgICAgdGhpcy5wZXJzaXN0KCdpZCcsIHRoaXMudG9rZW4uaWQsIGV4cGlyZXMpO1xuICAgICAgdGhpcy5wZXJzaXN0KCd1c2VyJywgdGhpcy50b2tlbi51c2VyLCBleHBpcmVzKTtcbiAgICAgIHRoaXMucGVyc2lzdCgndXNlcklkJywgdGhpcy50b2tlbi51c2VySWQsIGV4cGlyZXMpO1xuICAgICAgdGhpcy5wZXJzaXN0KCdjcmVhdGVkJywgdGhpcy50b2tlbi5jcmVhdGVkLCBleHBpcmVzKTtcbiAgICAgIHRoaXMucGVyc2lzdCgndHRsJywgdGhpcy50b2tlbi50dGwsIGV4cGlyZXMpO1xuICAgICAgdGhpcy5wZXJzaXN0KCdyZW1lbWJlck1lJywgdGhpcy50b2tlbi5yZW1lbWJlck1lLCBleHBpcmVzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICB9O1xuICAvKipcbiAgICogQG1ldGhvZCBsb2FkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAgICogQHJldHVybiB7YW55fSBBbnkgaW5mb3JtYXRpb24gcGVyc2lzdGVkIGluIHN0b3JhZ2VcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgbG9hZCBlaXRoZXIgZnJvbSBsb2NhbCBzdG9yYWdlIG9yIGNvb2tpZXMgdGhlIHByb3ZpZGVkIHByb3BlcnR5LlxuICAgKiovXG4gIHByb3RlY3RlZCBsb2FkKHByb3A6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQoYCR7dGhpcy5wcmVmaXh9JHtwcm9wfWApO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNsZWFyXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGNsZWFyIGNvb2tpZXMgb3IgdGhlIGxvY2FsIHN0b3JhZ2UuXG4gICAqKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHRoaXMudG9rZW4pLmZvckVhY2goKHByb3A6IHN0cmluZykgPT4gdGhpcy5zdG9yYWdlLnJlbW92ZShgJHt0aGlzLnByZWZpeH0ke3Byb3B9YCkpO1xuICAgIHRoaXMudG9rZW4gPSBuZXcgU0RLVG9rZW4oKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBwZXJzaXN0XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCBzYXZlcyB2YWx1ZXMgdG8gc3RvcmFnZVxuICAgKiovXG4gIHByb3RlY3RlZCBwZXJzaXN0KHByb3A6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zdG9yYWdlLnNldChcbiAgICAgICAgYCR7dGhpcy5wcmVmaXh9JHtwcm9wfWAsXG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlLFxuICAgICAgICB0aGlzLnRva2VuLnJlbWVtYmVyTWU/ZXhwaXJlczpudWxsXG4gICAgICApO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgIH1cbiAgfVxufVxuIl19