/* tslint:disable */
declare var Object: any;
import { Inject, Injectable } from '@angular/core';
import { LoopBackAuth, SDKToken } from '@kleiolab/lib-sdk-lb3';
import { GvInternalStorage } from '../cookies/cookies.module';
import { Configuration } from '../sdk-lb4';
import { PubAccount } from '../sdk-lb4/model/models';

export class GvAuthToken {
  lb3 = new SDKToken()
  lb4Token = ''
  lb4ExpiresInMs: number;
  user: PubAccount = null;
  rememberMe = true;
}

/**
* @author Jonas Schneider
* @license MIT
* @description
* This module handles the client side authentication for
* Loopback 3 SDK and Loopback 4 SDK
**/
@Injectable()
export class GvAuthService {

  private _gvAuthToken = new GvAuthToken();
  private set gvAuthToken(val: GvAuthToken) {
    this._gvAuthToken = val;
    this.lb4SdkConfig.accessToken = val.lb4Token
  }
  private get gvAuthToken(): GvAuthToken {
    return this._gvAuthToken;
  }

  private lb4SdkConfig: Configuration;

  protected prefix: string = '$Geovistory::auth$';
  /**
   * @method constructor
   * @param {GvInternalStorage} storage Internal Storage Driver
   * @description
   * The constructor will initialize the token loading data from storage
   **/
  constructor(
    @Inject(GvInternalStorage) protected storage: GvInternalStorage,

    // TODO: remove when lb3 completely migrated
    @Inject(LoopBackAuth) protected lb3AuthService: LoopBackAuth,
  ) {
    this.gvAuthToken.lb4Token = this.load('lb4Token');
    this.gvAuthToken.lb4ExpiresInMs = this.load('lb4ExpiresInMs');
    this.gvAuthToken.user = this.loadUser();

    // TODO: remove when lb3 completely migrated
    this.gvAuthToken.lb3 = this.lb3AuthService.getToken();
  }


  /**
   * @method setToken
   * @param {GvAuthToken} token GvAuthToken or casted AccessToken instance
   * @return {void}
   * @description
   * This method will set a flag in order to remember the current credentials
   **/
  public setToken(token: GvAuthToken): void {
    this.gvAuthToken = Object.assign({}, this.gvAuthToken, token);
    this.save();
  }
  /**
   * @method getToken
   * @return {void}
   * @description
   * This method will set a flag in order to remember the current credentials.
   **/
  public getToken(): GvAuthToken {
    return this.gvAuthToken;
  }

  /**
   * @method getCurrentUserId
   * @return {any}
   * @description
   * This method will return the current user id, it can be number or string.
   **/
  public getCurrentUserId(): number | undefined {
    return this.gvAuthToken.user ? this.gvAuthToken.user.id : undefined;
  }
  /**
   * @method getCurrentUserData
   * @return {any}
   * @description
   * This method will return the current user instance.
   **/
  public getCurrentUserData(): PubAccount | null {
    return this.gvAuthToken.user;
  }
  /**
   * @method save
   * @return {boolean} Whether or not the information was saved
   * @description
   * This method will save in either local storage or cookies the current credentials.
   * But only if rememberMe is enabled.
   **/
  public save(): boolean {
    let today = new Date();
    let expires = new Date(today.getTime() + (this.gvAuthToken.lb4ExpiresInMs));
    this.persist('lb4Token', this.gvAuthToken.lb4Token, expires);
    this.persist('lb4ExpiresInMs', this.gvAuthToken.lb4ExpiresInMs, expires);
    this.persist('user', this.gvAuthToken.user, expires);
    this.persist('rememberMe', this.gvAuthToken.rememberMe, expires);

    this.lb3AuthService.setToken(this.gvAuthToken.lb3)

    return true;
  };
  /**
   * @method load
   * @param {string} prop Property name
   * @return {any} Any information persisted in storage
   * @description
   * This method will load either from local storage or cookies the provided property.
   **/
  protected load(prop: string): any {
    return this.storage.get(`${this.prefix}${prop}`);
  }
  /**
   * @method clear
   * @return {void}
   * @description
   * This method will clear cookies or the local storage.
   **/
  public clear(): void {

    // TODO: remove when lb3 completely migrated
    this.lb3AuthService.clear()

    Object.keys(this.gvAuthToken).forEach((prop: string) => this.storage.remove(`${this.prefix}${prop}`));
    this.gvAuthToken = new GvAuthToken();
  }
  /**
   * @method persist
   * @return {void}
   * @description
   * This method saves values to storage
   **/
  protected persist(prop: string, value: any, expires?: Date): void {
    try {
      this.storage.set(
        `${this.prefix}${prop}`,
        (typeof value === 'object') ? JSON.stringify(value) : value,
        this.gvAuthToken.rememberMe ? expires : null
      );
    }
    catch (err) {
      console.error('Cannot access local/session storage:', err);
    }
  }

  private loadUser(): PubAccount | null {
    const usr = this.load('user');
    let error;
    let user: PubAccount;

    if (!usr) return null;

    if (typeof usr === 'object') return usr;

    if (typeof usr === 'string') {

      try {
        user = JSON.parse(usr);
      }
      catch (e) {
        error = e;
      }
      finally {
        if (error) {
          return null
        }
        else {
          return user
        }
      }
    }

    return null
  }

  setLb4SdkConfig(config: Configuration): Configuration {
    this.lb4SdkConfig = config;
    return this.lb4SdkConfig
  }
}
