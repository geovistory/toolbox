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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jb3JlL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRDs7Ozs7Ozs7R0FRRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFTdkI7Ozs7O1FBS0k7SUFDSixZQUErQyxPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQWR2RTs7WUFFSTtRQUNJLFVBQUssR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3pDOztZQUVJO1FBQ00sV0FBTSxHQUFXLGVBQWUsQ0FBQztRQVF6QyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZ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QUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7O1FBS0k7SUFDTSxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQVUsRUFBRSxPQUFjO1FBQ3hELElBQUk7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDZCxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLEVBQ3ZCLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUNuQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFySXlELGVBQWUsdUJBQTFELE1BQU0sU0FBQyxlQUFlOztBQWZ4QixZQUFZO0lBRHhCLFVBQVUsRUFBRTtJQWdCRSxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7R0FmekIsWUFBWSxDQW9KeEI7U0FwSlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW50ZXJuYWxTdG9yYWdlIH0gZnJvbSAnLi4vLi4vc3RvcmFnZS9zdG9yYWdlLnN3YXBzJztcbmltcG9ydCB7IFNES1Rva2VuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuLyoqXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4qIEBtb2R1bGUgU29ja2V0Q29ubmVjdGlvblxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIGhhbmRsZSBzb2NrZXQgY29ubmVjdGlvbnMgYW5kIHJldHVybiBzaW5nbGV0b24gaW5zdGFuY2VzIGZvciBlYWNoXG4qIGNvbm5lY3Rpb24sIGl0IHdpbGwgdXNlIHRoZSBTREsgU29ja2V0IERyaXZlciBBdmFpbGFibGUgY3VycmVudGx5IHN1cHBvcnRpbmdcbiogQW5ndWxhciAyIGZvciB3ZWIsIE5hdGl2ZVNjcmlwdCAyIGFuZCBBbmd1bGFyIFVuaXZlcnNhbC5cbioqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvb3BCYWNrQXV0aCB7XG4gIC8qKlxuICAgKiBAdHlwZSB7U0RLVG9rZW59XG4gICAqKi9cbiAgcHJpdmF0ZSB0b2tlbjogU0RLVG9rZW4gPSBuZXcgU0RLVG9rZW4oKTtcbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqKi9cbiAgcHJvdGVjdGVkIHByZWZpeDogc3RyaW5nID0gJyRMb29wQmFja1NESyQnO1xuICAvKipcbiAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0ludGVybmFsU3RvcmFnZX0gc3RvcmFnZSBJbnRlcm5hbCBTdG9yYWdlIERyaXZlclxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGNvbnN0cnVjdG9yIHdpbGwgaW5pdGlhbGl6ZSB0aGUgdG9rZW4gbG9hZGluZyBkYXRhIGZyb20gc3RvcmFnZVxuICAgKiovXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSW50ZXJuYWxTdG9yYWdlKSBwcm90ZWN0ZWQgc3RvcmFnZTogSW50ZXJuYWxTdG9yYWdlKSB7XG4gICAgdGhpcy50b2tlbi5pZCA9IHRoaXMubG9hZCgnaWQnKTtcbiAgICB0aGlzLnRva2VuLnVzZXIgPSB0aGlzLmxvYWQoJ3VzZXInKTtcbiAgICB0aGlzLnRva2VuLnVzZXJJZCA9IHRoaXMubG9hZCgndXNlcklkJyk7XG4gICAgdGhpcy50b2tlbi5jcmVhdGVkID0gdGhpcy5sb2FkKCdjcmVhdGVkJyk7XG4gICAgdGhpcy50b2tlbi50dGwgPSB0aGlzLmxvYWQoJ3R0bCcpO1xuICAgIHRoaXMudG9rZW4ucmVtZW1iZXJNZSA9IHRoaXMubG9hZCgncmVtZW1iZXJNZScpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFJlbWVtYmVyTWVcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBGbGFnIHRvIHJlbWVtYmVyIGNyZWRlbnRpYWxzXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNldCBhIGZsYWcgaW4gb3JkZXIgdG8gcmVtZW1iZXIgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHNcbiAgICoqL1xuICBwdWJsaWMgc2V0UmVtZW1iZXJNZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudG9rZW4ucmVtZW1iZXJNZSA9IHZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFVzZXJcbiAgICogQHBhcmFtIHthbnl9IHVzZXIgQW55IHR5cGUgb2YgdXNlciBtb2RlbFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHVzZXIgaW5mb3JtYXRpb24gYW5kIHBlcnNpc3QgaXQgaWYgdGhlXG4gICAqIHJlbWVtYmVyTWUgZmxhZyBpcyBzZXQuXG4gICAqKi9cbiAgcHVibGljIHNldFVzZXIodXNlcjogYW55KSB7XG4gICAgdGhpcy50b2tlbi51c2VyID0gdXNlcjtcbiAgICB0aGlzLnNhdmUoKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBzZXRUb2tlblxuICAgKiBAcGFyYW0ge1NES1Rva2VufSB0b2tlbiBTREtUb2tlbiBvciBjYXN0ZWQgQWNjZXNzVG9rZW4gaW5zdGFuY2VcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2V0IGEgZmxhZyBpbiBvcmRlciB0byByZW1lbWJlciB0aGUgY3VycmVudCBjcmVkZW50aWFsc1xuICAgKiovXG4gIHB1YmxpYyBzZXRUb2tlbih0b2tlbjogU0RLVG9rZW4pOiB2b2lkIHtcbiAgICB0aGlzLnRva2VuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50b2tlbiwgdG9rZW4pO1xuICAgIHRoaXMuc2F2ZSgpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldFRva2VuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNldCBhIGZsYWcgaW4gb3JkZXIgdG8gcmVtZW1iZXIgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHMuXG4gICAqKi9cbiAgcHVibGljIGdldFRva2VuKCk6IFNES1Rva2VuIHtcbiAgICByZXR1cm4gPFNES1Rva2VuPnRoaXMudG9rZW47XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0QWNjZXNzVG9rZW5JZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgYWN0dWFsIHRva2VuIHN0cmluZywgbm90IHRoZSBvYmplY3QgaW5zdGFuY2UuXG4gICAqKi9cbiAgcHVibGljIGdldEFjY2Vzc1Rva2VuSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbi5pZDtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBnZXRDdXJyZW50VXNlcklkXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBjdXJyZW50IHVzZXIgaWQsIGl0IGNhbiBiZSBudW1iZXIgb3Igc3RyaW5nLlxuICAgKiovXG4gIHB1YmxpYyBnZXRDdXJyZW50VXNlcklkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4udXNlcklkO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldEN1cnJlbnRVc2VyRGF0YVxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgY3VycmVudCB1c2VyIGluc3RhbmNlLlxuICAgKiovXG4gIHB1YmxpYyBnZXRDdXJyZW50VXNlckRhdGEoKTogYW55IHtcbiAgICByZXR1cm4gKHR5cGVvZiB0aGlzLnRva2VuLnVzZXIgPT09ICdzdHJpbmcnKSA/IEpTT04ucGFyc2UodGhpcy50b2tlbi51c2VyKSA6IHRoaXMudG9rZW4udXNlcjtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBzYXZlXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBpbmZvcm1hdGlvbiB3YXMgc2F2ZWRcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2F2ZSBpbiBlaXRoZXIgbG9jYWwgc3RvcmFnZSBvciBjb29raWVzIHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzLlxuICAgKiBCdXQgb25seSBpZiByZW1lbWJlck1lIGlzIGVuYWJsZWQuXG4gICAqKi9cbiAgcHVibGljIHNhdmUoKTogYm9vbGVhbiB7XG4gICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgbGV0IGV4cGlyZXMgPSBuZXcgRGF0ZSh0b2RheS5nZXRUaW1lKCkgKyAodGhpcy50b2tlbi50dGwgKiAxMDAwKSk7XG4gICAgICB0aGlzLnBlcnNpc3QoJ2lkJywgdGhpcy50b2tlbi5pZCwgZXhwaXJlcyk7XG4gICAgICB0aGlzLnBlcnNpc3QoJ3VzZXInLCB0aGlzLnRva2VuLnVzZXIsIGV4cGlyZXMpO1xuICAgICAgdGhpcy5wZXJzaXN0KCd1c2VySWQnLCB0aGlzLnRva2VuLnVzZXJJZCwgZXhwaXJlcyk7XG4gICAgICB0aGlzLnBlcnNpc3QoJ2NyZWF0ZWQnLCB0aGlzLnRva2VuLmNyZWF0ZWQsIGV4cGlyZXMpO1xuICAgICAgdGhpcy5wZXJzaXN0KCd0dGwnLCB0aGlzLnRva2VuLnR0bCwgZXhwaXJlcyk7XG4gICAgICB0aGlzLnBlcnNpc3QoJ3JlbWVtYmVyTWUnLCB0aGlzLnRva2VuLnJlbWVtYmVyTWUsIGV4cGlyZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIC8qKlxuICAgKiBAbWV0aG9kIGxvYWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICAgKiBAcmV0dXJuIHthbnl9IEFueSBpbmZvcm1hdGlvbiBwZXJzaXN0ZWQgaW4gc3RvcmFnZVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBsb2FkIGVpdGhlciBmcm9tIGxvY2FsIHN0b3JhZ2Ugb3IgY29va2llcyB0aGUgcHJvdmlkZWQgcHJvcGVydHkuXG4gICAqKi9cbiAgcHJvdGVjdGVkIGxvYWQocHJvcDogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldChgJHt0aGlzLnByZWZpeH0ke3Byb3B9YCk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgY2xlYXJcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgY2xlYXIgY29va2llcyBvciB0aGUgbG9jYWwgc3RvcmFnZS5cbiAgICoqL1xuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy50b2tlbikuZm9yRWFjaCgocHJvcDogc3RyaW5nKSA9PiB0aGlzLnN0b3JhZ2UucmVtb3ZlKGAke3RoaXMucHJlZml4fSR7cHJvcH1gKSk7XG4gICAgdGhpcy50b2tlbiA9IG5ldyBTREtUb2tlbigpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHBlcnNpc3RcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHNhdmVzIHZhbHVlcyB0byBzdG9yYWdlXG4gICAqKi9cbiAgcHJvdGVjdGVkIHBlcnNpc3QocHJvcDogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0KFxuICAgICAgICBgJHt0aGlzLnByZWZpeH0ke3Byb3B9YCxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWUsXG4gICAgICAgIHRoaXMudG9rZW4ucmVtZW1iZXJNZT9leHBpcmVzOm51bGxcbiAgICAgICk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgfVxuICB9XG59XG4iXX0=