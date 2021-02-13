import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { LoopBackAuth, SDKToken } from '@kleiolab/lib-sdk-lb3';
import { GvInternalStorage } from '../cookies/cookies.module';
export class GvAuthToken {
    constructor() {
        this.lb3 = new SDKToken();
        this.lb4Token = '';
        this.user = null;
        this.rememberMe = true;
    }
}
/**
* @author Jonas Schneider
* @license MIT
* @description
* This module handles the client side authentication for
* Loopback 3 SDK and Loopback 4 SDK
**/
let GvAuthService = class GvAuthService {
    /**
     * @method constructor
     * @param {GvInternalStorage} storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    constructor(storage, 
    // TODO: remove when lb3 completely migrated
    lb3AuthService) {
        this.storage = storage;
        this.lb3AuthService = lb3AuthService;
        this._gvAuthToken = new GvAuthToken();
        this.prefix = '$Geovistory::auth$';
        this.gvAuthToken.lb4Token = this.load('lb4Token');
        this.gvAuthToken.lb4ExpiresInMs = this.load('lb4ExpiresInMs');
        this.gvAuthToken.user = this.loadUser();
        // TODO: remove when lb3 completely migrated
        this.gvAuthToken.lb3 = this.lb3AuthService.getToken();
    }
    set gvAuthToken(val) {
        this._gvAuthToken = val;
        this.lb4SdkConfig.accessToken = val.lb4Token;
    }
    get gvAuthToken() {
        return this._gvAuthToken;
    }
    /**
     * @method setToken
     * @param {GvAuthToken} token GvAuthToken or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    setToken(token) {
        this.gvAuthToken = Object.assign({}, this.gvAuthToken, token);
        this.save();
    }
    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    getToken() {
        return this.gvAuthToken;
    }
    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    getCurrentUserId() {
        return this.gvAuthToken.user ? this.gvAuthToken.user.id : undefined;
    }
    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    getCurrentUserData() {
        return this.gvAuthToken.user;
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
        let expires = new Date(today.getTime() + (this.gvAuthToken.lb4ExpiresInMs));
        this.persist('lb4Token', this.gvAuthToken.lb4Token, expires);
        this.persist('lb4ExpiresInMs', this.gvAuthToken.lb4ExpiresInMs, expires);
        this.persist('user', this.gvAuthToken.user, expires);
        this.persist('rememberMe', this.gvAuthToken.rememberMe, expires);
        this.lb3AuthService.setToken(this.gvAuthToken.lb3);
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
        // TODO: remove when lb3 completely migrated
        this.lb3AuthService.clear();
        Object.keys(this.gvAuthToken).forEach((prop) => this.storage.remove(`${this.prefix}${prop}`));
        this.gvAuthToken = new GvAuthToken();
    }
    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    persist(prop, value, expires) {
        try {
            this.storage.set(`${this.prefix}${prop}`, (typeof value === 'object') ? JSON.stringify(value) : value, this.gvAuthToken.rememberMe ? expires : null);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
    loadUser() {
        const usr = this.load('user');
        let error;
        let user;
        if (!usr)
            return null;
        if (typeof usr === 'object')
            return usr;
        if (typeof usr === 'string') {
            try {
                user = JSON.parse(usr);
            }
            catch (e) {
                error = e;
            }
            finally {
                if (error) {
                    return null;
                }
                else {
                    return user;
                }
            }
        }
        return null;
    }
    setLb4SdkConfig(config) {
        this.lb4SdkConfig = config;
        return this.lb4SdkConfig;
    }
};
GvAuthService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(GvInternalStorage)),
    tslib_1.__param(1, Inject(LoopBackAuth))
], GvAuthService);
export { GvAuthService };
//# sourceMappingURL=auth.service.js.map