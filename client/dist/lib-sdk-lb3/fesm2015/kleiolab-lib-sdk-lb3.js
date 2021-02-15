import { __decorate, __param } from 'tslib';
import { CommonModule } from '@angular/common';
import { HttpParams, HttpHeaders, HttpRequest, HttpResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, Injectable, NgZone, Optional, NgModule } from '@angular/core';
import { throwError, Subject, merge, Observable } from 'rxjs';
import { catchError, share, filter, map } from 'rxjs/operators';
import io from 'socket.io-client';

/* tslint:disable */
/**
 * @module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
class BaseStorage {
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in storage.
     **/
    get(key) { }
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key, value, expires) { }
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key) { }
}
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
class InternalStorage extends BaseStorage {
}
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
class SDKStorage extends BaseStorage {
}

/* tslint:disable */
class AccessToken {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    static getModelName() {
        return "AccessToken";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    static factory(data) {
        return new AccessToken(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'AccessToken',
            plural: 'AccessTokens',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "ttl": {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                "scopes": {
                    name: 'scopes',
                    type: '["string"]'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
                    type: 'string'
                },
            },
            relations: {
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User'
                },
            }
        };
    }
}
class SDKToken {
    constructor(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
}

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
LoopBackAuth = __decorate([
    Injectable(),
    __param(0, Inject(InternalStorage))
], LoopBackAuth);

/**
 * Default error handler
 */
let ErrorHandler = class ErrorHandler {
    handleError(errorResponse) {
        return throwError(errorResponse.error.error || 'Server error');
    }
};
ErrorHandler = __decorate([
    Injectable()
], ErrorHandler);

/* tslint:disable */
class IO {
    constructor(socket) {
        this.observables = {};
        this.socket = socket;
    }
    emit(event, data) {
        this.socket.emit('ME:RT:1://event', {
            event: event,
            data: data
        });
    }
    on(event) {
        if (this.observables[event]) {
            return this.observables[event];
        }
        let subject = new Subject();
        this.socket.on(event, (res) => subject.next(res));
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    }
}

/* tslint:disable */
class SchemaObject {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SchemaObject`.
     */
    static getModelName() {
        return "SchemaObject";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SchemaObject for dynamic purposes.
    **/
    static factory(data) {
        return new SchemaObject(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SchemaObject',
            plural: 'SchemaObjects',
            path: 'SchemaObjects',
            idName: 'inf',
            properties: {
                "inf": {
                    name: 'inf',
                    type: 'any'
                },
                "pro": {
                    name: 'pro',
                    type: 'any'
                },
                "dat": {
                    name: 'dat',
                    type: 'any'
                },
                "sys": {
                    name: 'sys',
                    type: 'any'
                },
                "dfh": {
                    name: 'dfh',
                    type: 'any'
                },
            },
            relations: {}
        };
    }
}

class SysClassFieldPropertyRel {
    // property?: DfhProperty;
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassFieldPropertyRel`.
     */
    static getModelName() {
        return "SysClassFieldPropertyRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassFieldPropertyRel for dynamic purposes.
    **/
    static factory(data) {
        return new SysClassFieldPropertyRel(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SysClassFieldPropertyRel',
            plural: 'SysClassFieldPropertyRels',
            path: 'SysClassFieldPropertyRels',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number'
                },
                "property_is_outgoing": {
                    name: 'property_is_outgoing',
                    type: 'boolean'
                },
                "ord_num": {
                    name: 'ord_num',
                    type: 'number'
                },
            },
            relations: {
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
                property: {
                    name: 'property',
                    type: 'DfhProperty',
                    model: 'DfhProperty',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_property',
                    keyTo: 'pk_property'
                },
            }
        };
    }
}

class SysClassField {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassField`.
     */
    static getModelName() {
        return "SysClassField";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassField for dynamic purposes.
    **/
    static factory(data) {
        return new SysClassField(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SysClassField',
            plural: 'SysClassFields',
            path: 'SysClassFields',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
                "fk_system_type_ng_component": {
                    name: 'fk_system_type_ng_component',
                    type: 'number'
                },
                "used_table": {
                    name: 'used_table',
                    type: 'string'
                },
            },
            relations: {
                class_field_property_rel: {
                    name: 'class_field_property_rel',
                    type: 'SysClassFieldPropertyRel[]',
                    model: 'SysClassFieldPropertyRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_class_field'
                },
                class_field_configs: {
                    name: 'class_field_configs',
                    type: 'ProClassFieldConfig[]',
                    model: 'ProClassFieldConfig',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_class_field'
                },
                classes: {
                    name: 'classes',
                    type: 'DfhClass[]',
                    model: 'DfhClass',
                    relationType: 'hasMany',
                    modelThrough: 'ProClassFieldConfig',
                    keyThrough: 'fk_class_for_class_field',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_class_field'
                },
            }
        };
    }
}

/* tslint:disable */
class SysClassHasTypeProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassHasTypeProperty`.
     */
    static getModelName() {
        return "SysClassHasTypeProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassHasTypeProperty for dynamic purposes.
    **/
    static factory(data) {
        return new SysClassHasTypeProperty(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SysClassHasTypeProperty',
            plural: 'SysClassHasTypeProperties',
            path: 'SysClassHasTypeProperties',
            idName: 'pk_entity',
            properties: {
                "pk_typed_class": {
                    name: 'pk_typed_class',
                    type: 'number'
                },
                "typed_class_label": {
                    name: 'typed_class_label',
                    type: 'string'
                },
                "dfh_pk_property": {
                    name: 'dfh_pk_property',
                    type: 'number'
                },
                "property_label": {
                    name: 'property_label',
                    type: 'string'
                },
                "pk_type_class": {
                    name: 'pk_type_class',
                    type: 'number'
                },
                "type_class_label": {
                    name: 'type_class_label',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}

/* tslint:disable */
class SysSystemRelevantClass {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemRelevantClass`.
     */
    static getModelName() {
        return "SysSystemRelevantClass";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemRelevantClass for dynamic purposes.
    **/
    static factory(data) {
        return new SysSystemRelevantClass(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SysSystemRelevantClass',
            plural: 'SysSystemRelevantClasses',
            path: 'SysSystemRelevantClasses',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "required_by_entities": {
                    name: 'required_by_entities',
                    type: 'boolean'
                },
                "required_by_sources": {
                    name: 'required_by_sources',
                    type: 'boolean'
                },
                "required_by_basics": {
                    name: 'required_by_basics',
                    type: 'boolean'
                },
                "excluded_from_entities": {
                    name: 'excluded_from_entities',
                    type: 'boolean'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}

/* tslint:disable */
class PubAccount {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccount`.
     */
    static getModelName() {
        return "PubAccount";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccount for dynamic purposes.
    **/
    static factory(data) {
        return new PubAccount(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'PubAccount',
            plural: 'PubAccounts',
            path: 'PubAccounts',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
                projects: {
                    name: 'projects',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    modelThrough: 'PubAccountProjectRel',
                    keyThrough: 'fk_project',
                    keyFrom: 'id',
                    keyTo: 'account_id'
                },
            }
        };
    }
}

/* tslint:disable */
class Email {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Email`.
     */
    static getModelName() {
        return "Email";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Email for dynamic purposes.
    **/
    static factory(data) {
        return new Email(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'Email',
            plural: 'Emails',
            path: 'Emails',
            idName: 'id',
            properties: {
                "to": {
                    name: 'to',
                    type: 'string'
                },
                "from": {
                    name: 'from',
                    type: 'string'
                },
                "subject": {
                    name: 'subject',
                    type: 'string'
                },
                "text": {
                    name: 'text',
                    type: 'string'
                },
                "html": {
                    name: 'html',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}

class ProProject {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    static getModelName() {
        return "ProProject";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProProject for dynamic purposes.
    **/
    static factory(data) {
        return new ProProject(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ProProject',
            plural: 'ProProjects',
            path: 'ProProjects',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
            },
            relations: {
                accounts: {
                    name: 'accounts',
                    type: 'PubAccount[]',
                    model: 'PubAccount',
                    relationType: 'hasMany',
                    modelThrough: 'PubAccountProjectRel',
                    keyThrough: 'account_id',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                text_properties: {
                    name: 'text_properties',
                    type: 'ProTextProperty[]',
                    model: 'ProTextProperty',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                default_language: {
                    name: 'default_language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                persistent_items: {
                    name: 'persistent_items',
                    type: 'InfPersistentItem[]',
                    model: 'InfPersistentItem',
                    relationType: 'hasMany',
                    modelThrough: 'ProInfoProjRel',
                    keyThrough: 'fk_entity',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                namespaces: {
                    name: 'namespaces',
                    type: 'DatNamespace[]',
                    model: 'DatNamespace',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
            }
        };
    }
}

class PubAccountProjectRel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccountProjectRel`.
     */
    static getModelName() {
        return "PubAccountProjectRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of PubAccountProjectRel for dynamic purposes.
    **/
    static factory(data) {
        return new PubAccountProjectRel(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'PubAccountProjectRel',
            plural: 'PubAccountProjectRels',
            path: 'PubAccountProjectRels',
            idName: 'id',
            properties: {
                "role": {
                    name: 'role',
                    type: 'string',
                    default: 'admin'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "account_id": {
                    name: 'account_id',
                    type: 'number'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {
                account: {
                    name: 'account',
                    type: 'PubAccount',
                    model: 'PubAccount',
                    relationType: 'belongsTo',
                    keyFrom: 'account_id',
                    keyTo: 'id'
                },
                project: {
                    name: 'project',
                    type: 'ProProject',
                    model: 'ProProject',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_project',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class ProTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    static getModelName() {
        return "ProTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new ProTextProperty(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ProTextProperty',
            plural: 'ProTextProperties',
            path: 'ProTextProperties',
            idName: 'pk_entity',
            properties: {
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_dfh_class": {
                    name: 'fk_dfh_class',
                    type: 'number'
                },
                "fk_dfh_property": {
                    name: 'fk_dfh_property',
                    type: 'number'
                },
                "fk_dfh_property_domain": {
                    name: 'fk_dfh_property_domain',
                    type: 'number'
                },
                "fk_dfh_property_range": {
                    name: 'fk_dfh_property_range',
                    type: 'number'
                },
                "fk_pro_project": {
                    name: 'fk_pro_project',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "tmsp_creation": {
                    name: 'tmsp_creation',
                    type: 'string'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
            },
            relations: {
                project: {
                    name: 'project',
                    type: 'ProProject',
                    model: 'ProProject',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_project',
                    keyTo: 'pk_entity'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                systemType: {
                    name: 'systemType',
                    type: 'SysSystemType',
                    model: 'SysSystemType',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_system_type',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

/* tslint:disable */
class ProInfoProjRel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    static getModelName() {
        return "ProInfoProjRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProInfoProjRel for dynamic purposes.
    **/
    static factory(data) {
        return new ProInfoProjRel(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ProInfoProjRel',
            plural: 'ProInfoProjRels',
            path: 'ProInfoProjRels',
            idName: 'pk_entity',
            properties: {
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_entity": {
                    name: 'fk_entity',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
                    type: 'string'
                },
                "fk_entity_version_concat": {
                    name: 'fk_entity_version_concat',
                    type: 'string'
                },
                "is_in_project": {
                    name: 'is_in_project',
                    type: 'boolean'
                },
                "is_standard_in_project": {
                    name: 'is_standard_in_project',
                    type: 'boolean'
                },
                "calendar": {
                    name: 'calendar',
                    type: 'string'
                },
                "ord_num_of_domain": {
                    name: 'ord_num_of_domain',
                    type: 'number'
                },
                "ord_num_of_range": {
                    name: 'ord_num_of_range',
                    type: 'number'
                },
                "ord_num_of_text_property": {
                    name: 'ord_num_of_text_property',
                    type: 'number'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
                "fk_creator": {
                    name: 'fk_creator',
                    type: 'number'
                },
                "fk_last_modifier": {
                    name: 'fk_last_modifier',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "tmsp_creation": {
                    name: 'tmsp_creation',
                    type: 'string'
                },
            },
            relations: {}
        };
    }
}

/* tslint:disable */
class DfhProfile {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    static getModelName() {
        return "DfhProfile";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhProfile for dynamic purposes.
    **/
    static factory(data) {
        return new DfhProfile(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DfhProfile',
            plural: 'DfhProfiles',
            path: 'DfhProfiles',
            idName: 'pk_profile',
            properties: {
                "pk_profile": {
                    name: 'pk_profile',
                    type: 'number'
                },
                "owned_by_project": {
                    name: 'owned_by_project',
                    type: 'number'
                },
                "is_ongoing_forced_publication": {
                    name: 'is_ongoing_forced_publication',
                    type: 'boolean'
                },
                "date_profile_published": {
                    name: 'date_profile_published',
                    type: 'string'
                },
                "date_profile_deprecated": {
                    name: 'date_profile_deprecated',
                    type: 'string'
                },
                "tmsp_last_dfh_update": {
                    name: 'tmsp_last_dfh_update',
                    type: 'string'
                },
            },
            relations: {}
        };
    }
}

/* tslint:disable */
class DfhLabel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhLabel`.
     */
    static getModelName() {
        return "DfhLabel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhLabel for dynamic purposes.
    **/
    static factory(data) {
        return new DfhLabel(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DfhLabel',
            plural: 'DfhLabels',
            path: 'DfhLabels',
            idName: 'type',
            properties: {
                "type": {
                    name: 'type',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
                "language": {
                    name: 'language',
                    type: 'string'
                },
                "fk_profile": {
                    name: 'fk_profile',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}

class DatChunk {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatChunk`.
     */
    static getModelName() {
        return "DatChunk";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatChunk for dynamic purposes.
    **/
    static factory(data) {
        return new DatChunk(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DatChunk',
            plural: 'DatChunks',
            path: 'DatChunks',
            idName: 'pk_entity',
            properties: {
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_text": {
                    name: 'fk_text',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                digital: {
                    name: 'digital',
                    type: 'DatDigital',
                    model: 'DatDigital',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_text',
                    keyTo: 'pk_text'
                },
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_data'
                },
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class DatColumn {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    static getModelName() {
        return "DatColumn";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatColumn for dynamic purposes.
    **/
    static factory(data) {
        return new DatColumn(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DatColumn',
            plural: 'DatColumns',
            path: 'DatColumns',
            idName: 'pk_entity',
            properties: {
                "fk_digital": {
                    name: 'fk_digital',
                    type: 'number'
                },
                "fk_data_type": {
                    name: 'fk_data_type',
                    type: 'number'
                },
                "fk_column_content_type": {
                    name: 'fk_column_content_type',
                    type: 'number'
                },
                "fk_column_relationship_type": {
                    name: 'fk_column_relationship_type',
                    type: 'number'
                },
                "fk_original_column": {
                    name: 'fk_original_column',
                    type: 'number'
                },
                "is_imported": {
                    name: 'is_imported',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class DatTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatTextProperty`.
     */
    static getModelName() {
        return "DatTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new DatTextProperty(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DatTextProperty',
            plural: 'DatTextProperties',
            path: 'DatTextProperties',
            idName: 'pk_entity',
            properties: {
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "fk_entity": {
                    name: 'fk_entity',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class DatDigital {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatDigital`.
     */
    static getModelName() {
        return "DatDigital";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatDigital for dynamic purposes.
    **/
    static factory(data) {
        return new DatDigital(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DatDigital',
            plural: 'DatDigitals',
            path: 'DatDigitals',
            idName: 'pk_entity',
            properties: {
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "pk_text": {
                    name: 'pk_text',
                    type: 'number'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

/* tslint:disable */
class SysAppContext {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysAppContext`.
     */
    static getModelName() {
        return "SysAppContext";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysAppContext for dynamic purposes.
    **/
    static factory(data) {
        return new SysAppContext(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SysAppContext',
            plural: 'SysAppContexts',
            path: 'SysAppContexts',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "label": {
                    name: 'label',
                    type: 'string'
                },
            },
            relations: {}
        };
    }
}

class ProClassFieldConfig {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProClassFieldConfig`.
     */
    static getModelName() {
        return "ProClassFieldConfig";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProClassFieldConfig for dynamic purposes.
    **/
    static factory(data) {
        return new ProClassFieldConfig(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ProClassFieldConfig',
            plural: 'ProClassFieldConfigs',
            path: 'ProClassFieldConfigs',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number'
                },
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_domain_class": {
                    name: 'fk_domain_class',
                    type: 'number'
                },
                "fk_range_class": {
                    name: 'fk_range_class',
                    type: 'number'
                },
                "ord_num": {
                    name: 'ord_num',
                    type: 'number'
                },
                "fk_class_for_class_field": {
                    name: 'fk_class_for_class_field',
                    type: 'number'
                },
            },
            relations: {
                property: {
                    name: 'property',
                    type: 'DfhProperty',
                    model: 'DfhProperty',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_property',
                    keyTo: 'pk_property'
                },
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
                project: {
                    name: 'project',
                    type: 'ProProject',
                    model: 'ProProject',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_project',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

/* tslint:disable */
class ProDfhClassProjRel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhClassProjRel`.
     */
    static getModelName() {
        return "ProDfhClassProjRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProDfhClassProjRel for dynamic purposes.
    **/
    static factory(data) {
        return new ProDfhClassProjRel(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ProDfhClassProjRel',
            plural: 'ProDfhClassProjRels',
            path: 'ProDfhClassProjRels',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "enabled_in_entities": {
                    name: 'enabled_in_entities',
                    type: 'boolean'
                },
            },
            relations: {}
        };
    }
}

/* tslint:disable */
class ProDfhProfileProjRel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhProfileProjRel`.
     */
    static getModelName() {
        return "ProDfhProfileProjRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProDfhProfileProjRel for dynamic purposes.
    **/
    static factory(data) {
        return new ProDfhProfileProjRel(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ProDfhProfileProjRel',
            plural: 'ProDfhProfileProjRels',
            path: 'ProDfhProfileProjRels',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_profile": {
                    name: 'fk_profile',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "enabled": {
                    name: 'enabled',
                    type: 'boolean'
                },
            },
            relations: {}
        };
    }
}

class InfAppellation {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfAppellation`.
     */
    static getModelName() {
        return "InfAppellation";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfAppellation for dynamic purposes.
    **/
    static factory(data) {
        return new InfAppellation(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfAppellation',
            plural: 'InfAppellations',
            path: 'InfAppellations',
            idName: 'pk_entity',
            properties: {
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
            }
        };
    }
}

class InfLangString {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLangString`.
     */
    static getModelName() {
        return "InfLangString";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLangString for dynamic purposes.
    **/
    static factory(data) {
        return new InfLangString(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfLangString',
            plural: 'InfLangStrings',
            path: 'InfLangStrings',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class InfDimension {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfDimension`.
     */
    static getModelName() {
        return "InfDimension";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfDimension for dynamic purposes.
    **/
    static factory(data) {
        return new InfDimension(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfDimension',
            plural: 'InfDimensions',
            path: 'InfDimensions',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "fk_measurement_unit": {
                    name: 'fk_measurement_unit',
                    type: 'number'
                },
                "numeric_value": {
                    name: 'numeric_value',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
                measurement_unit: {
                    name: 'measurement_unit',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_measurement_unit',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class InfTemporalEntity {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTemporalEntity`.
     */
    static getModelName() {
        return "InfTemporalEntity";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTemporalEntity for dynamic purposes.
    **/
    static factory(data) {
        return new InfTemporalEntity(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfTemporalEntity',
            plural: 'InfTemporalEntities',
            path: 'InfTemporalEntities',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_info'
                },
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
                text_properties: {
                    name: 'text_properties',
                    type: 'InfTextProperty[]',
                    model: 'InfTextProperty',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_concerned_entity'
                },
            }
        };
    }
}

class InfStatement {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    static getModelName() {
        return "InfStatement";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfStatement for dynamic purposes.
    **/
    static factory(data) {
        return new InfStatement(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfStatement',
            plural: 'InfStatements',
            path: 'InfStatements',
            idName: 'pk_entity',
            properties: {
                "fk_subject_info": {
                    name: 'fk_subject_info',
                    type: 'number',
                    default: 0
                },
                "fk_subject_data": {
                    name: 'fk_subject_data',
                    type: 'number',
                    default: 0
                },
                "fk_subject_tables_cell": {
                    name: 'fk_subject_tables_cell',
                    type: 'number',
                    default: 0
                },
                "fk_subject_tables_row": {
                    name: 'fk_subject_tables_row',
                    type: 'number',
                    default: 0
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number',
                    default: 0
                },
                "fk_property_of_property": {
                    name: 'fk_property_of_property',
                    type: 'number',
                    default: 0
                },
                "fk_object_info": {
                    name: 'fk_object_info',
                    type: 'number',
                    default: 0
                },
                "fk_object_data": {
                    name: 'fk_object_data',
                    type: 'number',
                    default: 0
                },
                "fk_object_tables_cell": {
                    name: 'fk_object_tables_cell',
                    type: 'number',
                    default: 0
                },
                "fk_object_tables_row": {
                    name: 'fk_object_tables_row',
                    type: 'number',
                    default: 0
                },
                "is_in_project_count": {
                    name: 'is_in_project_count',
                    type: 'number'
                },
                "is_standard_in_project_count": {
                    name: 'is_standard_in_project_count',
                    type: 'number'
                },
                "community_favorite_calendar": {
                    name: 'community_favorite_calendar',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                subject_temporal_entity: {
                    name: 'subject_temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_info',
                    keyTo: 'pk_entity'
                },
                subject_digital: {
                    name: 'subject_digital',
                    type: 'DatDigital',
                    model: 'DatDigital',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_data',
                    keyTo: 'pk_entity'
                },
                subject_chunk: {
                    name: 'subject_chunk',
                    type: 'DatChunk',
                    model: 'DatChunk',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_data',
                    keyTo: 'pk_entity'
                },
                subject_statement: {
                    name: 'subject_statement',
                    type: 'InfStatement',
                    model: 'InfStatement',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_info',
                    keyTo: 'pk_entity'
                },
                object_temporal_entity: {
                    name: 'object_temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_appellation: {
                    name: 'object_appellation',
                    type: 'InfAppellation',
                    model: 'InfAppellation',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_lang_string: {
                    name: 'object_lang_string',
                    type: 'InfLangString',
                    model: 'InfLangString',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_chunk: {
                    name: 'object_chunk',
                    type: 'DatChunk',
                    model: 'DatChunk',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_data',
                    keyTo: 'pk_entity'
                },
                object_dimension: {
                    name: 'object_dimension',
                    type: 'InfDimension',
                    model: 'InfDimension',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_language: {
                    name: 'object_language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                subject_persistent_item: {
                    name: 'subject_persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_subject_info',
                    keyTo: 'pk_entity'
                },
                object_persistent_item: {
                    name: 'object_persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_time_primitive: {
                    name: 'object_time_primitive',
                    type: 'InfTimePrimitive',
                    model: 'InfTimePrimitive',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
                object_place: {
                    name: 'object_place',
                    type: 'InfPlace',
                    model: 'InfPlace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_object_info',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

class InfLanguage {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLanguage`.
     */
    static getModelName() {
        return "InfLanguage";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLanguage for dynamic purposes.
    **/
    static factory(data) {
        return new InfLanguage(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfLanguage',
            plural: 'InfLanguages',
            path: 'InfLanguages',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_language": {
                    name: 'pk_language',
                    type: 'string'
                },
                "lang_type": {
                    name: 'lang_type',
                    type: 'string'
                },
                "scope": {
                    name: 'scope',
                    type: 'string'
                },
                "iso6392b": {
                    name: 'iso6392b',
                    type: 'string'
                },
                "iso6392t": {
                    name: 'iso6392t',
                    type: 'string'
                },
                "iso6391": {
                    name: 'iso6391',
                    type: 'string'
                },
                "notes": {
                    name: 'notes',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
            }
        };
    }
}

class InfPersistentItem {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPersistentItem`.
     */
    static getModelName() {
        return "InfPersistentItem";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfPersistentItem for dynamic purposes.
    **/
    static factory(data) {
        return new InfPersistentItem(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfPersistentItem',
            plural: 'InfPersistentItems',
            path: 'InfPersistentItems',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_info'
                },
                dfh_class: {
                    name: 'dfh_class',
                    type: 'DfhClass',
                    model: 'DfhClass',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class',
                    keyTo: 'pk_class'
                },
                text_properties: {
                    name: 'text_properties',
                    type: 'InfTextProperty[]',
                    model: 'InfTextProperty',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_concerned_entity'
                },
            }
        };
    }
}

class InfTimePrimitive {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTimePrimitive`.
     */
    static getModelName() {
        return "InfTimePrimitive";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTimePrimitive for dynamic purposes.
    **/
    static factory(data) {
        return new InfTimePrimitive(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfTimePrimitive',
            plural: 'InfTimePrimitives',
            path: 'InfTimePrimitives',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "julian_day": {
                    name: 'julian_day',
                    type: 'number'
                },
                "duration": {
                    name: 'duration',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
            }
        };
    }
}

class InfPlace {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPlace`.
     */
    static getModelName() {
        return "InfPlace";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfPlace for dynamic purposes.
    **/
    static factory(data) {
        return new InfPlace(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfPlace',
            plural: 'InfPlaces',
            path: 'InfPlaces',
            idName: 'pk_entity',
            properties: {
                "long": {
                    name: 'long',
                    type: 'number'
                },
                "lat": {
                    name: 'lat',
                    type: 'number'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
            }
        };
    }
}

/* tslint:disable */
class DatNamespace {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatNamespace`.
     */
    static getModelName() {
        return "DatNamespace";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatNamespace for dynamic purposes.
    **/
    static factory(data) {
        return new DatNamespace(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'DatNamespace',
            plural: 'DatNamespaces',
            path: 'DatNamespaces',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_root_namespace": {
                    name: 'fk_root_namespace',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "standard_label": {
                    name: 'standard_label',
                    type: 'string'
                },
            },
            relations: {}
        };
    }
}

class InfTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    static getModelName() {
        return "InfTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new InfTextProperty(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'InfTextProperty',
            plural: 'InfTextProperties',
            path: 'InfTextProperties',
            idName: 'pk_entity',
            properties: {
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_concerned_entity": {
                    name: 'fk_concerned_entity',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                persistent_item: {
                    name: 'persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_concerned_entity',
                    keyTo: 'pk_entity'
                },
                temporal_entity: {
                    name: 'temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_concerned_entity',
                    keyTo: 'pk_entity'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}

/* tslint:disable */
class SysSystemType {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemType`.
     */
    static getModelName() {
        return "SysSystemType";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemType for dynamic purposes.
    **/
    static factory(data) {
        return new SysSystemType(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'SysSystemType',
            plural: 'SysSystemTypes',
            path: 'SysSystemTypes',
            idName: 'pk_entity',
            properties: {
                "notes": {
                    name: 'notes',
                    type: 'string'
                },
                "definition": {
                    name: 'definition',
                    type: 'string'
                },
                "st_schema_name": {
                    name: 'st_schema_name',
                    type: 'string'
                },
                "st_table_name": {
                    name: 'st_table_name',
                    type: 'string'
                },
                "st_column_name": {
                    name: 'st_column_name',
                    type: 'string'
                },
                "st_group": {
                    name: 'st_group',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}

/* tslint:disable */
/**
 * @class FireLoopRef<T>
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 **/
class FireLoopRef {
    /**
    * @method constructor
    * @param {any} model The model we want to create a reference
    * @param {SocketConnection} socket Socket connection to handle events
    * @param {FireLoopRef<any>} parent Parent FireLoop model reference
    * @param {string} relationship The defined model relationship
    * @description
    * The constructor will receive the required parameters and then will register this reference
    * into the server, needed to allow multiple references for the same model.
    * This ids are referenced into this specific client connection and won't have issues
    * with other client ids.
    **/
    constructor(model, socket, parent = null, relationship = null) {
        this.model = model;
        this.socket = socket;
        this.parent = parent;
        this.relationship = relationship;
        // Reference ID
        this.id = this.buildId();
        // Model Childs
        this.childs = {};
        // Disposable Events
        this.disposable = {};
        this.socket.emit(`Subscribe.${!parent ? model.getModelName() : parent.model.getModelName()}`, { id: this.id, scope: model.getModelName(), relationship: relationship });
        return this;
    }
    /**
    * @method dispose
    * @return {void}
    * @description
    * This method is super important to avoid memory leaks in the server.
    * This method requires to be called on components destroy
    *
    * ngOnDestroy() {
    *  this.someRef.dispose()
    * }
    **/
    dispose() {
        const subscription = this.operation('dispose', {}).subscribe(() => {
            Object.keys(this.disposable).forEach((channel) => {
                this.socket.removeListener(channel, this.disposable[channel]);
                this.socket.removeAllListeners(channel);
            });
            subscription.unsubscribe();
        });
    }
    /**
    * @method upsert
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for upsert function.
    **/
    upsert(data) {
        return this.operation('upsert', data);
    }
    /**
    * @method create
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for create function.
    **/
    create(data) {
        return this.operation('create', data);
    }
    /**
    * @method remove
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for remove function.
    **/
    remove(data) {
        return this.operation('remove', data);
    }
    /**
    * @method remote
    * @param {string} method Remote method name
    * @param {any[]=} params Parameters to be applied into the remote method
    * @param {boolean} broadcast Flag to define if the method results should be broadcasted
    * @return {Observable<any>}
    * @description
    * This method calls for any remote method. It is flexible enough to
    * allow you call either built-in or custom remote methods.
    *
    * FireLoop provides this interface to enable calling remote methods
    * but also to optionally send any defined accept params that will be
    * applied within the server.
    **/
    remote(method, params, broadcast = false) {
        return this.operation('remote', { method, params, broadcast });
    }
    /**
    * @method onRemote
    * @param {string} method Remote method name
    * @return {Observable<any>}
    * @description
    * This method listen for public broadcasted remote method results. If the remote method
    * execution is not public only the owner will receive the result data.
    **/
    onRemote(method) {
        let event = 'remote';
        if (!this.relationship) {
            event = `${this.model.getModelName()}.${event}`;
        }
        else {
            event = `${this.parent.model.getModelName()}.${this.relationship}.${event}`;
        }
        return this.broadcasts(event, {});
    }
    /**
    * @method on
    * @param {string} event Event name
    * @param {LoopBackFilter} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for different type of events. Valid events are:
    *   - change (Triggers on any model change -create, update, remove-)
    *   - value (Triggers on new entries)
    *   - child_added (Triggers when a child is added)
    *   - child_updated (Triggers when a child is updated)
    *   - child_removed (Triggers when a child is removed)
    **/
    on(event, filter = { limit: 100, order: 'id DESC' }) {
        if (event === 'remote') {
            throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
        }
        let request;
        if (!this.relationship) {
            event = `${this.model.getModelName()}.${event}`;
            request = { filter };
        }
        else {
            event = `${this.parent.model.getModelName()}.${this.relationship}.${event}`;
            request = { filter, parent: this.parent.instance };
        }
        if (event.match(/(value|change|stats)/)) {
            return merge(this.pull(event, request), this.broadcasts(event, request));
        }
        else {
            return this.broadcasts(event, request);
        }
    }
    /**
    * @method stats
    * @param {LoopBackFilter=} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for real-time statistics, will trigger on every
    * statistic modification.
    * TIP: You can improve performance by adding memcached to LoopBack models.
    **/
    stats(filter) {
        return this.on('stats', filter);
    }
    /**
    * @method make
    * @param {any} instance Persisted model instance reference
    * @return {Observable<T>}
    * @description
    * This method will set a model instance into this a new FireLoop Reference.
    * This allows to persiste parentship when creating related instances.
    *
    * It also allows to have multiple different persisted instance references to same model.
    * otherwise if using singleton will replace a previous instance for a new instance, when
    * we actually want to have more than 1 instance of same model.
    **/
    make(instance) {
        let reference = new FireLoopRef(this.model, this.socket);
        reference.instance = instance;
        return reference;
    }
    /**
    * @method child
    * @param {string} relationship A defined model relationship
    * @return {FireLoopRef<T>}
    * @description
    * This method creates child references, which will persist related model
    * instances. e.g. Room.messages, where messages belongs to a specific Room.
    **/
    child(relationship) {
        // Return singleton instance
        if (this.childs[relationship]) {
            return this.childs[relationship];
        }
        // Try to get relation settings from current model
        let settings = this.model.getModelDefinition().relations[relationship];
        // Verify the relationship actually exists
        if (!settings) {
            throw new Error(`Invalid model relationship ${this.model.getModelName()} <-> ${relationship}, verify your model settings.`);
        }
        // Verify if the relationship model is public
        if (settings.model === '') {
            throw new Error(`Relationship model is private, cam't use ${relationship} unless you set your model as public.`);
        }
        // Lets get a model reference and add a reference for all of the models
        let model = this.model.models.get(settings.model);
        model.models = this.model.models;
        // If everything goes well, we will store a child reference and return it.
        this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
        return this.childs[relationship];
    }
    /**
    * @method pull
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This method will pull initial data from server
    **/
    pull(event, request) {
        let sbj = new Subject();
        let that = this;
        let nowEvent = `${event}.pull.requested.${this.id}`;
        this.socket.emit(`${event}.pull.request.${this.id}`, request);
        function pullNow(data) {
            if (that.socket.removeListener) {
                that.socket.removeListener(nowEvent, pullNow);
            }
            sbj.next(data);
        }
        ;
        this.socket.on(nowEvent, pullNow);
        return sbj.asObservable();
    }
    /**
    * @method broadcasts
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This will listen for public broadcasts announces and then request
    * for data according a specific client request, not shared with other clients.
    **/
    broadcasts(event, request) {
        let sbj = new Subject();
        let channels = {
            announce: `${event}.broadcast.announce.${this.id}`,
            broadcast: `${event}.broadcast.${this.id}`
        };
        let that = this;
        // Announces Handler
        this.disposable[channels.announce] = function (res) {
            that.socket.emit(`${event}.broadcast.request.${that.id}`, request);
        };
        // Broadcasts Handler
        this.disposable[channels.broadcast] = function (data) {
            sbj.next(data);
        };
        this.socket.on(channels.announce, this.disposable[channels.announce]);
        this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
        return sbj.asObservable();
    }
    /**
    * @method operation
    * @param {string} event Event name
    * @param {any} data Any type of data sent to the server
    * @return {Observable<T>}
    * @description
    * This internal method will run operations depending on current context
    **/
    operation(event, data) {
        if (!this.relationship) {
            event = `${this.model.getModelName()}.${event}.${this.id}`;
        }
        else {
            event = `${this.parent.model.getModelName()}.${this.relationship}.${event}.${this.id}`;
        }
        let subject = new Subject();
        let config = {
            data,
            parent: this.parent && this.parent.instance ? this.parent.instance : null
        };
        this.socket.emit(event, config);
        let resultEvent = '';
        if (!this.relationship) {
            resultEvent = `${this.model.getModelName()}.value.result.${this.id}`;
        }
        else {
            resultEvent = `${this.parent.model.getModelName()}.${this.relationship}.value.result.${this.id}`;
        }
        this.socket.on(resultEvent, (res) => {
            if (res.error) {
                subject.error(res);
            }
            else {
                subject.next(res);
            }
        });
        if (event.match('dispose')) {
            setTimeout(() => subject.next());
        }
        // This event listener will be wiped within socket.connections
        this.socket.sharedObservables.sharedOnDisconnect.subscribe(() => subject.complete());
        return subject.asObservable().pipe(catchError((error) => Observable.throw(error)));
    }
    /**
    * @method buildId
    * @return {number}
    * @description
    * This internal method build an ID for this reference, this allows to have
    * multiple references for the same model or relationships.
    **/
    buildId() {
        return Date.now() + Math.floor(Math.random() * 100800) *
            Math.floor(Math.random() * 100700) *
            Math.floor(Math.random() * 198500);
    }
}

/* tslint:disable */

/* tslint:disable */
class FireLoop {
    constructor(socket, models) {
        this.socket = socket;
        this.models = models;
        this.references = {};
    }
    ref(model) {
        let name = model.getModelName();
        model.models = this.models;
        this.references[name] = new FireLoopRef(model, this.socket);
        return this.references[name];
    }
}

/* tslint:disable */
/**
 * @module SocketDriver
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SocketDriver class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
class SocketDriver {
    connect(url, options) { }
}

/* tslint:disable */
/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
*
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
class LoopBackConfig {
    static setApiVersion(version = 'api') {
        LoopBackConfig.version = version;
    }
    static getApiVersion() {
        return LoopBackConfig.version;
    }
    static setBaseURL(url = '/') {
        LoopBackConfig.path = url;
    }
    static getPath() {
        return LoopBackConfig.path;
    }
    static setAuthPrefix(authPrefix = '') {
        LoopBackConfig.authPrefix = authPrefix;
    }
    static getAuthPrefix() {
        return LoopBackConfig.authPrefix;
    }
    static setDebugMode(isEnabled) {
        LoopBackConfig.debug = isEnabled;
    }
    static debuggable() {
        return LoopBackConfig.debug;
    }
    static filterOnUrl() {
        LoopBackConfig.filterOn = 'url';
    }
    static filterOnHeaders() {
        LoopBackConfig.filterOn = 'headers';
    }
    static whereOnUrl() {
        LoopBackConfig.whereOn = 'url';
    }
    static whereOnHeaders() {
        LoopBackConfig.whereOn = 'headers';
    }
    static isHeadersFilteringSet() {
        return (LoopBackConfig.filterOn === 'headers');
    }
    static isHeadersWhereSet() {
        return (LoopBackConfig.whereOn === 'headers');
    }
    static setSecureWebSockets() {
        LoopBackConfig.secure = true;
    }
    static unsetSecureWebSockets() {
        LoopBackConfig.secure = false;
    }
    static isSecureWebSocketsSet() {
        return LoopBackConfig.secure;
    }
    static setRequestOptionsCredentials(withCredentials = false) {
        LoopBackConfig.withCredentials = withCredentials;
    }
    static getRequestOptionsCredentials() {
        return LoopBackConfig.withCredentials;
    }
}
LoopBackConfig.path = '//:3000';
LoopBackConfig.version = 'lb3-api';
LoopBackConfig.authPrefix = '';
LoopBackConfig.debug = true;
LoopBackConfig.filterOn = 'headers';
LoopBackConfig.whereOn = 'headers';
LoopBackConfig.secure = false;
LoopBackConfig.withCredentials = false;

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
let SocketConnection = class SocketConnection {
    /**
     * @method constructor
     * @param {SocketDriver} driver Socket IO Driver
     * @param {NgZone} zone Angular 2 Zone
     * @description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     **/
    constructor(driver, zone) {
        this.driver = driver;
        this.zone = zone;
        this.subjects = {
            onConnect: new Subject(),
            onDisconnect: new Subject(),
            onAuthenticated: new Subject(),
            onUnAuthorized: new Subject()
        };
        this.sharedObservables = {};
        this.authenticated = false;
        this.sharedObservables = {
            sharedOnConnect: this.subjects.onConnect.asObservable().pipe(share()),
            sharedOnDisconnect: this.subjects.onDisconnect.asObservable().pipe(share()),
            sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().pipe(share()),
            sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().pipe(share())
        };
        // This is needed to create the first channel, subsequents will share the connection
        // We are using Hot Observables to avoid duplicating connection status events.
        this.sharedObservables.sharedOnConnect.subscribe();
        this.sharedObservables.sharedOnDisconnect.subscribe();
        this.sharedObservables.sharedOnAuthenticated.subscribe();
        this.sharedObservables.sharedOnUnAuthorized.subscribe();
    }
    /**
     * @method connect
     * @param {AccessToken} token AccesToken instance
     * @return {void}
     * @description
     * This method will create a new socket connection when not previously established.
     * If there is a broken connection it will re-connect.
     **/
    connect(token = null) {
        if (!this.socket) {
            console.info('Creating a new connection with: ', LoopBackConfig.getPath());
            // Create new socket connection
            this.socket = this.driver.connect(LoopBackConfig.getPath(), {
                log: false,
                secure: LoopBackConfig.isSecureWebSocketsSet(),
                forceNew: true,
                forceWebsockets: true,
                transports: ['websocket']
            });
            // Listen for connection
            this.on('connect', () => {
                this.subjects.onConnect.next('connected');
                // Authenticate or start heartbeat now    
                this.emit('authentication', token);
            });
            // Listen for authentication
            this.on('authenticated', () => {
                this.authenticated = true;
                this.subjects.onAuthenticated.next();
                this.heartbeater();
            });
            // Listen for authentication
            this.on('unauthorized', (err) => {
                this.authenticated = false;
                this.subjects.onUnAuthorized.next(err);
            });
            // Listen for disconnections
            this.on('disconnect', (status) => this.subjects.onDisconnect.next(status));
        }
        else if (this.socket && !this.socket.connected) {
            if (typeof this.socket.off === 'function') {
                this.socket.off();
            }
            if (typeof this.socket.destroy === 'function') {
                this.socket.destroy();
            }
            delete this.socket;
            this.connect(token);
        }
    }
    /**
     * @method isConnected
     * @return {boolean}
     * @description
     * This method will return true or false depending on established connections
     **/
    isConnected() {
        return (this.socket && this.socket.connected);
    }
    /**
     * @method on
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method listen for server events from the current WebSocket connection.
     * This method is a facade that will wrap the original "on" method and run it
     * within the Angular Zone to avoid update issues.
     **/
    on(event, handler) {
        this.socket.on(event, (data) => this.zone.run(() => handler(data)));
    }
    /**
     * @method emit
     * @param {string} event Event name
     * @param {any=} data Any type of data
     * @return {void}
     * @description
     * This method will send any type of data to the server according the event set.
     **/
    emit(event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    }
    /**
     * @method removeListener
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    removeListener(event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    }
    /**
     * @method removeAllListeners
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    removeAllListeners(event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    }
    /**
     * @method disconnect
     * @return {void}
     * @description
     * This will disconnect the client from the server
     **/
    disconnect() {
        this.socket.disconnect();
    }
    /**
     * @method heartbeater
     * @return {void}
     * @description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     **/
    heartbeater() {
        let heartbeater = setInterval(() => {
            if (this.isConnected()) {
                this.socket.emit('lb-ping');
            }
            else {
                this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', (data) => console.info('Heartbeat: ', data));
    }
};
SocketConnection.ctorParameters = () => [
    { type: SocketDriver, decorators: [{ type: Inject, args: [SocketDriver,] }] },
    { type: NgZone, decorators: [{ type: Inject, args: [NgZone,] }] }
];
SocketConnection = __decorate([
    Injectable(),
    __param(0, Inject(SocketDriver)),
    __param(1, Inject(NgZone))
], SocketConnection);

let SDKModels = class SDKModels {
    constructor() {
        this.models = {
            SchemaObject: SchemaObject,
            SysClassFieldPropertyRel: SysClassFieldPropertyRel,
            SysClassField: SysClassField,
            SysClassHasTypeProperty: SysClassHasTypeProperty,
            SysSystemRelevantClass: SysSystemRelevantClass,
            PubAccount: PubAccount,
            Email: Email,
            ProProject: ProProject,
            PubAccountProjectRel: PubAccountProjectRel,
            ProTextProperty: ProTextProperty,
            ProInfoProjRel: ProInfoProjRel,
            DfhProfile: DfhProfile,
            DfhLabel: DfhLabel,
            DatChunk: DatChunk,
            DatColumn: DatColumn,
            DatTextProperty: DatTextProperty,
            DatDigital: DatDigital,
            SysAppContext: SysAppContext,
            ProClassFieldConfig: ProClassFieldConfig,
            ProDfhClassProjRel: ProDfhClassProjRel,
            ProDfhProfileProjRel: ProDfhProfileProjRel,
            InfAppellation: InfAppellation,
            InfLangString: InfLangString,
            InfDimension: InfDimension,
            InfTemporalEntity: InfTemporalEntity,
            InfStatement: InfStatement,
            InfLanguage: InfLanguage,
            InfPersistentItem: InfPersistentItem,
            InfTimePrimitive: InfTimePrimitive,
            InfPlace: InfPlace,
            DatNamespace: DatNamespace,
            InfTextProperty: InfTextProperty,
            SysSystemType: SysSystemType,
        };
    }
    get(modelName) {
        return this.models[modelName];
    }
    getAll() {
        return this.models;
    }
    getModelNames() {
        return Object.keys(this.models);
    }
};
SDKModels = __decorate([
    Injectable()
], SDKModels);

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
let RealTime = class RealTime {
    /**
    * @method constructor
    * @param {SocketConnection} connection WebSocket connection service
    * @param {SDKModels} models Model provider service
    * @param {LoopBackAuth} auth LoopBack authentication service
    * @description
    * It will intialize the shared on ready communication channel.
    **/
    constructor(connection, models, auth) {
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.connecting = false;
        this.onReadySubject = new Subject();
        this.sharedOnReady = this.onReadySubject.asObservable().pipe(share());
        this.sharedOnReady.subscribe();
    }
    /**
    * @method onDisconnect
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is disconnected from server.
    **/
    onDisconnect() {
        return this.connection.sharedObservables.sharedOnDisconnect;
    }
    /**
    * @method onAuthenticated
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is authenticated with the server.
    **/
    onAuthenticated() {
        return this.connection.sharedObservables.sharedOnAuthenticated;
    }
    /**
    * @method onUnAuthorized
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is not authorized to connect with the server.
    **/
    onUnAuthorized() {
        return this.connection.sharedObservables.sharedOnUnAuthorized;
    }
    /**
    * @method onReady
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is Ready for broadcasting.
    * and will register connection flow events to notify subscribers.
    **/
    onReady() {
        // If there is a valid connection, then we just send back to the EventLoop
        // Or next will be executed before the actual subscription.
        if (this.connection.isConnected()) {
            let to = setTimeout(() => {
                this.onReadySubject.next('shared-connection');
                clearTimeout(to);
            });
            // Else if there is a current attempt of connection we wait for the prior
            // process that started the connection flow.
        }
        else if (this.connecting) {
            let ti = setInterval(() => {
                if (this.connection.isConnected()) {
                    this.onReadySubject.next('shared-connection');
                    clearInterval(ti);
                }
            }, 500);
            // If there is not valid connection or attempt, then we start the connection flow
            // and make sure we notify all the onReady subscribers when done.
            // Also it will listen for desconnections so we unsubscribe and avoid both:
            // Memory leaks and duplicated triggered events.
        }
        else {
            this.connecting = true;
            this.connection.connect(this.auth.getToken());
            this.IO = new IO(this.connection);
            this.FireLoop = new FireLoop(this.connection, this.models);
            // Fire event for those subscribed 
            let s1 = this.connection.sharedObservables.sharedOnConnect.subscribe(() => {
                console.log('Real-Time connection has been established');
                this.connecting = false;
                this.onReadySubject.next('connected');
                let s2 = this.connection.sharedObservables.sharedOnDisconnect.subscribe(() => {
                    s1.unsubscribe();
                    s2.unsubscribe();
                });
            });
        }
        return this.sharedOnReady;
    }
};
RealTime.ctorParameters = () => [
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] }
];
RealTime = __decorate([
    Injectable(),
    __param(0, Inject(SocketConnection)),
    __param(1, Inject(SDKModels)),
    __param(2, Inject(LoopBackAuth))
], RealTime);

class CustomQueryEncoderHelper {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
let BaseLoopBackApi = class BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    request(method, url, routeParams = {}, urlParams = {}, postBody = {}, pubsub = false, customHeaders) {
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach((key) => {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                let arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            let event = (`[${method}]${url}`).replace(/\?/, '');
            let subject = new Subject();
            this.connection.on(event, (res) => subject.next(res));
            return subject.asObservable();
        }
        else {
            let httpParams = new HttpParams({ encoder: new CustomQueryEncoderHelper() });
            // Headers to be sent
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            // Authenticate request
            headers = this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            let body;
            let postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            let queryString = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (LoopBackConfig.isHeadersFilteringSet()) {
                    headers = headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    queryString = `?filter=${encodeURIComponent(JSON.stringify(urlParams.filter))}`;
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            if (urlParams.where) {
                if (LoopBackConfig.isHeadersWhereSet()) {
                    /**
                    CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
                    - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
                    - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
                    **/
                    headers = headers.append('where', JSON.stringify(urlParams.where));
                }
                else {
                    queryString = `?where=${encodeURIComponent(JSON.stringify(urlParams.where))}`;
                }
                delete urlParams.where;
            }
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            /* enhancement/configure-where-headers
                  this.searchParams.setJSON(urlParams);
                  let request: Request = new Request(
                    new RequestOptions({
                      headers        : headers,
                      method         : method,
                      url            : `${url}${queryString}`,
                      search         : Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                      body           : body ? JSON.stringify(body) : undefined,
                      withCredentials: LoopBackConfig.getRequestOptionsCredentials()
                    })
                  );
            TODO Fix Merge Conflict */
            Object.keys(urlParams).forEach(paramKey => {
                let paramValue = urlParams[paramKey];
                paramValue = typeof paramValue === 'object' ? JSON.stringify(paramValue) : paramValue;
                httpParams = httpParams.append(paramKey, paramValue);
            });
            let request = new HttpRequest(method, `${url}${queryString}`, body, {
                headers: headers,
                params: httpParams,
                withCredentials: LoopBackConfig.getRequestOptionsCredentials()
            });
            return this.http.request(request).pipe(filter(event => event instanceof HttpResponse), map((res) => res.body), catchError((e) => this.errorHandler.handleError(e)));
        }
    }
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    authenticate(url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers = headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
        return headers;
    }
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    create(data, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub oncreate many method
     */
    onCreate(data) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    createMany(data, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    onCreateMany(data) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    findById(id, filter = {}, customHeaders) {
        let _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, _urlParams, undefined, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    find(filter = {}, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .pipe(map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    exists(id, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id }, undefined, undefined, null, customHeaders);
    }
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    findOne(filter = {}, customHeaders) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    updateAll(where = {}, data, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders);
    }
    /**
     * @method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub onUpdateAll method
     */
    onUpdateAll(where = {}, data) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, true);
    }
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    deleteById(id, customHeaders) {
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onDeleteById method
     */
    onDeleteById(id) {
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    count(where = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    }
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    updateAttributes(id, data, customHeaders) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onUpdateAttributes method
     */
    onUpdateAttributes(id, data) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    upsert(data = {}, customHeaders) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsert method
     */
    onUpsert(data = {}) {
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    upsertPatch(data = {}, customHeaders) {
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertPatch method using patch http method
     */
    onUpsertPatch(data = {}) {
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    upsertWithWhere(where = {}, data = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertWithWhere method
     */
    onUpsertWithWhere(where = {}, data = {}) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    replaceOrCreate(data = {}, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceOrCreate method
     */
    onReplaceOrCreate(data = {}) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    replaceById(id, data = {}, customHeaders) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceById method
     */
    onReplaceById(id, data = {}) {
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, true)
            .pipe(map((data) => this.model.factory(data)));
    }
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    createChangeStream() {
        let subject = new Subject();
        if (typeof EventSource !== 'undefined') {
            let emit = (msg) => subject.next(JSON.parse(msg.data));
            var source = new EventSource([
                LoopBackConfig.getPath(),
                LoopBackConfig.getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    }
};
BaseLoopBackApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
BaseLoopBackApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], BaseLoopBackApi);

/**
 * Api services for the `DatChunk` model.
 */
let DatChunkApi = class DatChunkApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get the chunks related to the digital, with their statements.
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkDigital Primary key of the digital
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatChunk` object.)
     * </em>
     */
    ofDigital(pkProject, pkDigital, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatChunks/of-digital";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkDigital !== 'undefined' && pkDigital !== null)
            _urlParams.pkDigital = pkDigital;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatChunk`.
     */
    getModelName() {
        return "DatChunk";
    }
};
DatChunkApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DatChunkApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DatChunkApi);

/**
 * Api services for the `DatColumn` model.
 */
let DatColumnApi = class DatColumnApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get the columns related to the digital (table).
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkDigital Primary key of the digital
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatColumn` object.)
     * </em>
     */
    ofDigital(pkProject, pkDigital, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatColumns/of-digital";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkDigital !== 'undefined' && pkDigital !== null)
            _urlParams.pkDigital = pkDigital;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    getModelName() {
        return "DatColumn";
    }
};
DatColumnApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DatColumnApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DatColumnApi);

/**
 * Api services for the `DatDigital` model.
 */
let DatDigitalApi = class DatDigitalApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Creates or updates instances of DatDigital.
     *
     * @param {number} pkNamespace Namespace
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{DatDigital}` - Array DatDigital
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatDigital` object.)
     * </em>
     */
    bulkUpsert(pkNamespace, data, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatDigitals/bulk-upsert";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkNamespace !== 'undefined' && pkNamespace !== null)
            _urlParams.pkNamespace = pkNamespace;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deletes instances of DatDigital.
     *
     * @param {object} data Request data.
     *
     *  - `pks` – `{number}` - Array of Primary Key of DatDigitals
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatDigital` object.)
     * </em>
     */
    bulkDelete(pks, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatDigitals/delete-delete";
        let _routeParams = {};
        let _postBody = {
            pks: pks
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Finds the version of given digital. If no version specified, latest is returned.
     *
     * @param {number} pkEntity Primary Key of the digital object (pk_entity)
     *
     * @param {number} entityVersion Primary Key of the digital object (entity_version)
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatDigital` object.)
     * </em>
     */
    getVersion(pkEntity, entityVersion = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatDigitals/get-version";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        if (typeof entityVersion !== 'undefined' && entityVersion !== null)
            _urlParams.entityVersion = entityVersion;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get page of table
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkEntity Pk of the table digital.
     *
     * @param {object} data Request data.
     *
     *  - `options` – `{object}` - options
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatDigital` object.)
     * </em>
     */
    getTablePage(pkProject, pkEntity, options = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatDigitals/getTablePage";
        let _routeParams = {};
        let _postBody = {
            options: options
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatDigital`.
     */
    getModelName() {
        return "DatDigital";
    }
};
DatDigitalApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DatDigitalApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DatDigitalApi);

/**
 * Api services for the `DatNamespace` model.
 */
let DatNamespaceApi = class DatNamespaceApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Finds namespaces of a project.
     *
     * @param {number} pkProject Key of the Project for which the namespaces should be found.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatNamespace` object.)
     * </em>
     */
    byProject(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DatNamespaces/find-by-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatNamespace`.
     */
    getModelName() {
        return "DatNamespace";
    }
};
DatNamespaceApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DatNamespaceApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DatNamespaceApi);

/**
 * Api services for the `DatTextProperty` model.
 */
let DatTextPropertyApi = class DatTextPropertyApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatTextProperty`.
     */
    getModelName() {
        return "DatTextProperty";
    }
};
DatTextPropertyApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DatTextPropertyApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DatTextPropertyApi);

/**
 * Api services for the `DfhLabel` model.
 */
let DfhLabelApi = class DfhLabelApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get all dfh labels needed by the given project.
     *
     * @param {number} pkProject Project pk
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhLabel` object.)
     * </em>
     */
    ofProject(pkProject = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhLabels/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhLabel`.
     */
    getModelName() {
        return "DfhLabel";
    }
};
DfhLabelApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DfhLabelApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DfhLabelApi);

/**
 * Api services for the `DfhProfile` model.
 */
let DfhProfileApi = class DfhProfileApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get all profiles that are used by the given project.
     *
     * @param {number} pkProject Project pk
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    ofProject(pkProject = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Pulls profile data including classes and properties from OntoMe and updates profile data in geovistory.
     *
     * @param {number} pkProfile OntoMe profile that should be added
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    updateFromOntoMe(pkProfile, requestedLanguage = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/update-from-ontome";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Pulls profile data including classes and properties from OntoMe and adds profile to project.
     *
     * @param {number} pkProject Geovistory project to which the OntoMe profile should be added
     *
     * @param {number} pkProfile OntoMe profile that should be added
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    updateAndAddToProject(pkProject, pkProfile, requestedLanguage = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/update-from-ontome-and-add-to-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates an activation report for the given OntoMe profile and the given Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the activation report should be created
     *
     * @param {number} pkProfile OntoMe profile for which the activation report should be created
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    getActivationReport(pkProject, pkProfile, requestedLanguage = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/get-activation-report";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        if (typeof requestedLanguage !== 'undefined' && requestedLanguage !== null)
            _urlParams.requestedLanguage = requestedLanguage;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates an deactivation report for the given OntoMe profile and the given Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the deactivation report should be created
     *
     * @param {number} pkProfile OntoMe profile for which the deactivation report should be created
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    getDeactivationReport(pkProject, pkProfile, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/get-deactivation-report";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deavtivates an OntoMe profile for a Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the profile should be deactivated
     *
     * @param {number} pkProfile OntoMe profile to deactivate for the given Geovistory project
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    deactivateProfileForProject(pkProject, pkProfile, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/DfhProfiles/deactivate-ontome-profile-for-geovistory-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkProfile !== 'undefined' && pkProfile !== null)
            _urlParams.pkProfile = pkProfile;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    getModelName() {
        return "DfhProfile";
    }
};
DfhProfileApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
DfhProfileApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], DfhProfileApi);

/**
 * Api services for the `Email` model.
 */
let EmailApi = class EmailApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Email`.
     */
    getModelName() {
        return "Email";
    }
};
EmailApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
EmailApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], EmailApi);

/**
 * Api services for the `InfAppellation` model.
 */
let InfAppellationApi = class InfAppellationApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfAppellation`.
     */
    getModelName() {
        return "InfAppellation";
    }
};
InfAppellationApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfAppellationApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfAppellationApi);

/**
 * Api services for the `InfDimension` model.
 */
let InfDimensionApi = class InfDimensionApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfDimension`.
     */
    getModelName() {
        return "InfDimension";
    }
};
InfDimensionApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfDimensionApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfDimensionApi);

/**
 * Api services for the `InfLangString` model.
 */
let InfLangStringApi = class InfLangStringApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLangString`.
     */
    getModelName() {
        return "InfLangString";
    }
};
InfLangStringApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfLangStringApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfLangStringApi);

/**
 * Api services for the `InfLanguage` model.
 */
let InfLanguageApi = class InfLanguageApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Perform a ranked search on languages by search string.
     *
     * @param {string} queryString
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfLanguage` object.)
     * </em>
     */
    queryByString(queryString = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfLanguages/query-by-string";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof queryString !== 'undefined' && queryString !== null)
            _urlParams.queryString = queryString;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLanguage`.
     */
    getModelName() {
        return "InfLanguage";
    }
};
InfLanguageApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfLanguageApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfLanguageApi);

/**
 * Api services for the `InfPersistentItem` model.
 */
let InfPersistentItemApi = class InfPersistentItemApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find or create many information persistent items.
     *
     * @param {number} pk_project Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfPersistentItem}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    findOrCreateInfPersistentItems(pk_project, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPersistentItems/find-or-create-many";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfPersistentItem(instance))));
    }
    /**
     * Get only miminal properties of persistent item.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkEntity Pk of the entity.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    ownProperties(pkProject, pkEntity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPersistentItems/own-properties";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get a minimal nested object of all types in the project.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    typesOfProject(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPersistentItems/types-of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find types of typed class and project. E.g. get the types for the class 'histC8 Geographical Place' (pk_typed_class=363) used in project (pk_project=123)
     *
     * @param {number} pk_project Primary Key of Project
     *
     * @param {number} pk_typed_classes Primary Keyes of Typed Classes (e.g. pk of Geographical Place to get Geographical Place Types)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    typesOfClassesAndProject(pk_project, pk_typed_classes, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPersistentItems/types-of-classes-and-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        if (typeof pk_typed_classes !== 'undefined' && pk_typed_classes !== null)
            _urlParams.pk_typed_classes = pk_typed_classes;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find one type by pk_entity with appellations and text properties.
     *
     * @param {number} pk_project Primary Key of Project
     *
     * @param {number} pk_entity Primary Key of the type. Provide this if you want to query one specific type.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    typeNested(pk_project, pk_entity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPersistentItems/type-nested";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        if (typeof pk_entity !== 'undefined' && pk_entity !== null)
            _urlParams.pk_entity = pk_entity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPersistentItem`.
     */
    getModelName() {
        return "InfPersistentItem";
    }
};
InfPersistentItemApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfPersistentItemApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfPersistentItemApi);

/**
 * Api services for the `InfPlace` model.
 */
let InfPlaceApi = class InfPlaceApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find or create a InfPlace and update the project relation if needed.
     *
     * @param {number} projectId Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfPlace}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPlace` object.)
     * </em>
     */
    findOrCreatePlace(projectId, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfPlaces/findOrCreate";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof projectId !== 'undefined' && projectId !== null)
            _urlParams.projectId = projectId;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfPlace(instance))));
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPlace`.
     */
    getModelName() {
        return "InfPlace";
    }
};
InfPlaceApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfPlaceApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfPlaceApi);

/**
 * Api services for the `InfStatement` model.
 */
let InfStatementApi = class InfStatementApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get a flat object of entity previews, that are target of a list.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the entity previews, that are target of a list are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the entity previews, that are target of a list.
     *
     * @param {number} pkTargetClass Fk class of the target entity previews, that are target of a list.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned entity previews, that are target of a list.
     *
     * @param {number} offset offset of the segment of returned entity previews, that are target of a list.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    paginatedListTargetingEntityPreviews(pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/paginated-list-targeting-entity-previews";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkSourceEntity !== 'undefined' && pkSourceEntity !== null)
            _urlParams.pkSourceEntity = pkSourceEntity;
        if (typeof pkProperty !== 'undefined' && pkProperty !== null)
            _urlParams.pkProperty = pkProperty;
        if (typeof pkTargetClass !== 'undefined' && pkTargetClass !== null)
            _urlParams.pkTargetClass = pkTargetClass;
        if (typeof isOutgoing !== 'undefined' && isOutgoing !== null)
            _urlParams.isOutgoing = isOutgoing;
        if (typeof limit !== 'undefined' && limit !== null)
            _urlParams.limit = limit;
        if (typeof offset !== 'undefined' && offset !== null)
            _urlParams.offset = offset;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find or create information statement.
     *
     * @param {number} pk_project Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfStatement}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    findOrCreateInfStatements(pk_project, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/find-or-create-many";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfStatement(instance))));
    }
    /**
     * Get statements (with children) of given fkProperty and fkEntity from Repo that are not in project of given projectId.
     *
     * @param {number} entityPk Key of the persistent item (fk_object_info)
     *
     * @param {number} propertyPk Key of the property (fk_property)
     *
     * @param {number} pkProject Id of the the current project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    alternativesNotInProjectByEntityPk(entityPk, propertyPk, pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/alternatives-not-in-project-by-entity-pk";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof entityPk !== 'undefined' && entityPk !== null)
            _urlParams.entityPk = entityPk;
        if (typeof propertyPk !== 'undefined' && propertyPk !== null)
            _urlParams.propertyPk = propertyPk;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get statements (with children) of given propertyPk and teEntPk from Repo that are not in project of given projectId.
     *
     * @param {number} teEntPk Key of the temporal entity (fk_subject_info)
     *
     * @param {number} propertyPk Key of the property (fk_property)
     *
     * @param {number} pkProject Id of the the current project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    alternativesNotInProjectByTeEntPk(teEntPk, propertyPk, pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/alternatives-not-in-project-by-te-ent-pk";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof teEntPk !== 'undefined' && teEntPk !== null)
            _urlParams.teEntPk = teEntPk;
        if (typeof propertyPk !== 'undefined' && propertyPk !== null)
            _urlParams.propertyPk = propertyPk;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get an nested object of statement with everything needed to display the links made from an entity towards sources and digitals.
     *
     * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
     *
     * @param {number} pkProject Primary Key of the Project.
     *
     * @param {number} pkEntity Primary Key of the entity for which the sources links are needed.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    sourcesAndDigitalsOfEntity(ofProject, pkProject = {}, pkEntity = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/sources-and-digitals-of-entity";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof ofProject !== 'undefined' && ofProject !== null)
            _urlParams.ofProject = ofProject;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find statements by params.
     *
     * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
     *
     * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
     *
     * @param {number} pkEntity Primary Key of the statement (pk_entity)
     *
     * @param {number} pkInfoRange Foreign Key of the statement pointing to the range entity (fk_object_info)
     *
     * @param {number} pkInfoDomain Foreign Key of the statement pointing to the domain entity (fk_subject_info)
     *
     * @param {number} pkProperty Foreign Key of the statement pointing to the property (fk_property)
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    queryByParams(ofProject, pkProject = {}, pkEntity = {}, pkInfoRange = {}, pkInfoDomain = {}, pkProperty = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfStatements/find-by-params";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof ofProject !== 'undefined' && ofProject !== null)
            _urlParams.ofProject = ofProject;
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        if (typeof pkInfoRange !== 'undefined' && pkInfoRange !== null)
            _urlParams.pkInfoRange = pkInfoRange;
        if (typeof pkInfoDomain !== 'undefined' && pkInfoDomain !== null)
            _urlParams.pkInfoDomain = pkInfoDomain;
        if (typeof pkProperty !== 'undefined' && pkProperty !== null)
            _urlParams.pkProperty = pkProperty;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    getModelName() {
        return "InfStatement";
    }
};
InfStatementApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfStatementApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfStatementApi);

/**
 * Api services for the `InfTemporalEntity` model.
 */
let InfTemporalEntityApi = class InfTemporalEntityApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find or create many information temporal entities.
     *
     * @param {number} pk_project Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    findOrCreateInfTemporalEntities(pk_project, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/find-or-create-many";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfTemporalEntity(instance))));
    }
    /**
     * Get a flat object of temporal entities.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
     *
     * @param {number} pkTargetClass Fk class of the target temporal entities.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned temporal entities.
     *
     * @param {number} offset offset of the segment of returned temporal entities.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    alternativeTemporalEntityList(pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/paginated-list-alternatives";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkSourceEntity !== 'undefined' && pkSourceEntity !== null)
            _urlParams.pkSourceEntity = pkSourceEntity;
        if (typeof pkProperty !== 'undefined' && pkProperty !== null)
            _urlParams.pkProperty = pkProperty;
        if (typeof pkTargetClass !== 'undefined' && pkTargetClass !== null)
            _urlParams.pkTargetClass = pkTargetClass;
        if (typeof isOutgoing !== 'undefined' && isOutgoing !== null)
            _urlParams.isOutgoing = isOutgoing;
        if (typeof limit !== 'undefined' && limit !== null)
            _urlParams.limit = limit;
        if (typeof offset !== 'undefined' && offset !== null)
            _urlParams.offset = offset;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get a flat object of temporal entities.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
     *
     * @param {number} pkTargetClass Fk class of the target temporal entities.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned temporal entities.
     *
     * @param {number} offset offset of the segment of returned temporal entities.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    temporalEntityList(pkProject, pkSourceEntity, pkProperty, pkTargetClass, isOutgoing, limit, offset, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/paginated-list";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkSourceEntity !== 'undefined' && pkSourceEntity !== null)
            _urlParams.pkSourceEntity = pkSourceEntity;
        if (typeof pkProperty !== 'undefined' && pkProperty !== null)
            _urlParams.pkProperty = pkProperty;
        if (typeof pkTargetClass !== 'undefined' && pkTargetClass !== null)
            _urlParams.pkTargetClass = pkTargetClass;
        if (typeof isOutgoing !== 'undefined' && isOutgoing !== null)
            _urlParams.isOutgoing = isOutgoing;
        if (typeof limit !== 'undefined' && limit !== null)
            _urlParams.limit = limit;
        if (typeof offset !== 'undefined' && offset !== null)
            _urlParams.offset = offset;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get e schema object of own properties of the temporal entity in project version.
     *
     * @param {number} pkProject Pk project
     *
     * @param {number} pkEntity Primary Key of the temporal entity (pk_entity)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    ownProperties(pkProject, pkEntity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/own-properties";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find or create a temporal entity version.
     *
     * @param {number} pkProject Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    findOrCreateInfTemporalEntity(pkProject, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/findOrCreate";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfTemporalEntity(instance))));
    }
    /**
     * Relate a nested object of a InfTemporalEntity to the project.
     *
     * @param {number} pkProject Id of the project
     *
     * @param {boolean} isInProject Include or exclude from project.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    changeTeEntProjectRelation(pkProject, isInProject, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTemporalEntities/change-project-relation";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof isInProject !== 'undefined' && isInProject !== null)
            _urlParams.isInProject = isInProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTemporalEntity`.
     */
    getModelName() {
        return "InfTemporalEntity";
    }
};
InfTemporalEntityApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfTemporalEntityApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfTemporalEntityApi);

/**
 * Api services for the `InfTextProperty` model.
 */
let InfTextPropertyApi = class InfTextPropertyApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find or create information text properties.
     *
     * @param {number} pk_project Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTextProperty}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTextProperty` object.)
     * </em>
     */
    findOrCreateInfTextProperties(pk_project, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTextProperties/find-or-create-many";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfTextProperty(instance))));
    }
    /**
     * Find or create a InfTextProperty and update the project relation if needed.
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTextProperty}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTextProperty` object.)
     * </em>
     */
    findOrCreateInfTextProperty(pkProject, data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTextProperties/findOrCreate";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfTextProperty(instance))));
    }
    /**
     * Find all InfTextProperties that are not yet added to the given project.
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {number} pkEntity fk of the concerned entity
     *
     * @param {number} pkClassField fk of the class field
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTextProperty` object.)
     * </em>
     */
    findAlternativeTextProperties(pkProject, pkEntity, pkClassField, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/InfTextProperties/findAlternativeTextProperties";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        if (typeof pkClassField !== 'undefined' && pkClassField !== null)
            _urlParams.pkClassField = pkClassField;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new InfTextProperty(instance))));
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    getModelName() {
        return "InfTextProperty";
    }
};
InfTextPropertyApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfTextPropertyApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfTextPropertyApi);

/**
 * Api services for the `InfTimePrimitive` model.
 */
let InfTimePrimitiveApi = class InfTimePrimitiveApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTimePrimitive`.
     */
    getModelName() {
        return "InfTimePrimitive";
    }
};
InfTimePrimitiveApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
InfTimePrimitiveApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], InfTimePrimitiveApi);

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
let LoggerService = class LoggerService {
    log(...args) {
        if (LoopBackConfig.debuggable())
            console.log.apply(console, args);
    }
    info(...args) {
        if (LoopBackConfig.debuggable())
            console.info.apply(console, args);
    }
    error(...args) {
        if (LoopBackConfig.debuggable())
            console.error.apply(console, args);
    }
    count(arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    }
    group(arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    }
    groupEnd() {
        if (LoopBackConfig.debuggable())
            console.groupEnd();
    }
    profile(arg) {
        if (LoopBackConfig.debuggable())
            console.count(arg);
    }
    profileEnd() {
        if (LoopBackConfig.debuggable())
            console.profileEnd();
    }
    time(arg) {
        if (LoopBackConfig.debuggable())
            console.time(arg);
    }
    timeEnd(arg) {
        if (LoopBackConfig.debuggable())
            console.timeEnd(arg);
    }
};
LoggerService = __decorate([
    Injectable()
], LoggerService);

/**
 * Api services for the `ProClassFieldConfig` model.
 */
let ProClassFieldConfigApi = class ProClassFieldConfigApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    patchOrCreate(data = {}, customHeaders) {
        let _method = "PATCH";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProClassFieldConfigs";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Find ProClassFieldConfig of project
     *
     * @param {number} pkProject Pk of the project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    ofProject(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProClassFieldConfigs/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates or updates instances of ProClassFieldConfig.
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{ProClassFieldConfig}` - Array ProClassFieldConfig
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    bulkUpsert(pkProject, data, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProClassFieldConfigs/bulk-upsert";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deletes instances of ProClassFieldConfig.
     *
     * @param {object} data Request data.
     *
     *  - `pks` – `{number}` - Array of Primary Key of ProClassFieldConfigs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    bulkDelete(pks, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProClassFieldConfigs/bulk-delete";
        let _routeParams = {};
        let _postBody = {
            pks: pks
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProClassFieldConfig`.
     */
    getModelName() {
        return "ProClassFieldConfig";
    }
};
ProClassFieldConfigApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
ProClassFieldConfigApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], ProClassFieldConfigApi);

/**
 * Api services for the `ProDfhClassProjRel` model.
 */
let ProDfhClassProjRelApi = class ProDfhClassProjRelApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find ProDfhClassProjRel of project
     *
     * @param {number} pkProject Pk of the project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProDfhClassProjRel` object.)
     * </em>
     */
    ofProject(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProDfhClassProjRels/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates or updates instances of ProDfhClassProjRel.
     *
     * @param {number} pkProject Project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{ProDfhClassProjRel}` - Array ProDfhClassProjRel
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProDfhClassProjRel` object.)
     * </em>
     */
    bulkUpsert(pkProject, data, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProDfhClassProjRels/bulk-upsert";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhClassProjRel`.
     */
    getModelName() {
        return "ProDfhClassProjRel";
    }
};
ProDfhClassProjRelApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
ProDfhClassProjRelApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], ProDfhClassProjRelApi);

/**
 * Api services for the `ProDfhProfileProjRel` model.
 */
let ProDfhProfileProjRelApi = class ProDfhProfileProjRelApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find ProDfhProfileProjRel of project where enabled is true
     *
     * @param {number} pkProject Pk of the project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProDfhProfileProjRel` object.)
     * </em>
     */
    ofProject(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProDfhProfileProjRels/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates or updates instances of ProDfhProfileProjRel.
     *
     * @param {number} pkProject Project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{ProDfhProfileProjRel}` - Array ProDfhProfileProjRel
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProDfhProfileProjRel` object.)
     * </em>
     */
    bulkUpsert(pkProject, data, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProDfhProfileProjRels/bulk-upsert";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProDfhProfileProjRel`.
     */
    getModelName() {
        return "ProDfhProfileProjRel";
    }
};
ProDfhProfileProjRelApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
ProDfhProfileProjRelApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], ProDfhProfileProjRelApi);

/**
 * Api services for the `ProInfoProjRel` model.
 */
let ProInfoProjRelApi = class ProInfoProjRelApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProInfoProjRel` object.)
     * </em>
     */
    patchOrCreate(data = {}, customHeaders) {
        let _method = "PATCH";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProInfoProjRels";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Marks the statement as favorite for the given fk_project.
     *
     * @param {number} pkProject fk_project
     *
     * @param {number} pkStatement fk_entity
     *
     * @param {object} data Request data.
     *
     *  - `isOutgoing` – `{boolean}` - True, if the statement is outgoing, else false
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProInfoProjRel` object.)
     * </em>
     */
    markStatementAsFavorite(pkProject, pkStatement, isOutgoing, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProInfoProjRels/mark-statement-as-favorite";
        let _routeParams = {};
        let _postBody = {
            isOutgoing: isOutgoing
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkStatement !== 'undefined' && pkStatement !== null)
            _urlParams.pkStatement = pkStatement;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Updates the ProInfoProjRel found by fk_project and fk_entity.
     *
     * @param {number} pkProject fk_project
     *
     * @param {number} pkEntity fk_entity
     *
     * @param {object} data Request data.
     *
     *  - `eprAttributes` – `{ProInfoProjRel}` - Instance of ProInfoProjRel (fk_project and fk_entity will be ignored)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProInfoProjRel` object.)
     * </em>
     */
    updateEprAttributes(pkProject, pkEntity, eprAttributes, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProInfoProjRels/updateEprAttributes";
        let _routeParams = {};
        let _postBody = {
            eprAttributes: eprAttributes
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Updates the ProInfoProjRel of all found by fk_project and fk_entity.
     *
     * @param {number} pkProject fk_project
     *
     * @param {object} data Request data.
     *
     *  - `items` – `{ProInfoProjRel}` - Array of ProInfoProjRel (fk_project must be equal to pkProject)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProInfoProjRel` object.)
     * </em>
     */
    bulkUpdateEprAttributes(pkProject, items, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProInfoProjRels/bulk-update-attributes";
        let _routeParams = {};
        let _postBody = {
            items: items
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    getModelName() {
        return "ProInfoProjRel";
    }
};
ProInfoProjRelApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
ProInfoProjRelApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], ProInfoProjRelApi);

/**
 * Api services for the `ProProject` model.
 */
let ProProjectApi = class ProProjectApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get the projects of account.
     *
     * @param {number} accountId Id of the account
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProProject` object.)
     * </em>
     */
    ofAccount(accountId, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProProjects/of-account";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof accountId !== 'undefined' && accountId !== null)
            _urlParams.accountId = accountId;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Create a new project with a label and a description.
     *
     * @param {number} accountId Id of account to associate the persistent item with.
     *
     * @param {string} pkLanguage Default language of the project, language of the label and the text property.
     *
     * @param {string} label Label of the project.
     *
     * @param {string} textProperty Description of the project.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProProject` object.)
     * </em>
     */
    createWithLabelAndDescription(accountId, pkLanguage, label, textProperty = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProProjects/create-with-label-and-description";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof accountId !== 'undefined' && accountId !== null)
            _urlParams.accountId = accountId;
        if (typeof pkLanguage !== 'undefined' && pkLanguage !== null)
            _urlParams.pkLanguage = pkLanguage;
        if (typeof label !== 'undefined' && label !== null)
            _urlParams.label = label;
        if (typeof textProperty !== 'undefined' && textProperty !== null)
            _urlParams.textProperty = textProperty;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get basic information about the project (language, name)
     *
     * @param {number} pkProject Pk of project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProProject` object.)
     * </em>
     */
    getBasics(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProProjects/get-basics";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    getModelName() {
        return "ProProject";
    }
};
ProProjectApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
ProProjectApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], ProProjectApi);

/**
 * Api services for the `ProTextProperty` model.
 */
let ProTextPropertyApi = class ProTextPropertyApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get the text-properties of the project.
     *
     * @param {number} pkProject Pk of the project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProTextProperty` object.)
     * </em>
     */
    ofProject(pkProject, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProTextProperties/of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Inserts or updates items in the array of ProTextProperty. If pk_entity is given and existing, an update is done, else an insert
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `items` – `{ProTextProperty}` - Array of ProTextPropertys
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProTextProperty` object.)
     * </em>
     */
    bulkUpsert(pkProject, items, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProTextProperties/bulk-upsert";
        let _routeParams = {};
        let _postBody = {
            items: items
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Dletes items in the array of ProTextProperty. Checks for each item if fk_project matches given pkProject
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `items` – `{ProTextProperty}` - Array of ProTextPropertys
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProTextProperty` object.)
     * </em>
     */
    bulkDelete(pkProject, items, customHeaders) {
        let _method = "PUT";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/ProTextProperties/bulk-delete";
        let _routeParams = {};
        let _postBody = {
            items: items
        };
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    getModelName() {
        return "ProTextProperty";
    }
};
ProTextPropertyApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
ProTextPropertyApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], ProTextPropertyApi);

/**
 * Api services for the `PubAccount` model.
 */
let PubAccountApi = class PubAccountApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get Roles of the Account
     *
     * @param {number} id
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `PubAccount` object.)
     * </em>
     */
    getRoles(id, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/PubAccounts/:id/get-roles";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get a list of all projects associated with this account.
     *
     * @param {number} id
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `PubAccount` object.)
     * </em>
     */
    listProjects(id, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/PubAccounts/:id/list-projects";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get all accounts with their project pks and their roles
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `PubAccount` object.)
     * </em>
     */
    withRolesAndProjects(customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/PubAccounts/with-roles-and-projects";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Login a user with username/email and password.
     *
     * @param {string} include Related objects to include in the response. See the description of return value for more details.
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * The response body contains properties of the AccessToken created on login.
     * Depending on the value of `include` parameter, the body may contain additional properties:
     *
     *   - `user` - `U+007BPubAccountU+007D` - Data of the currently logged in user. (`include=user`)
     *
     *
     */
    login(credentials, include = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/PubAccounts/login";
        let _routeParams = {};
        let _postBody = {
            credentials: credentials
        };
        let _urlParams = {};
        if (typeof include !== 'undefined' && include !== null)
            _urlParams.include = include;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Logout a user with access token.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    logout(customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/PubAccounts/logout";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccount`.
     */
    getModelName() {
        return "PubAccount";
    }
};
PubAccountApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
PubAccountApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], PubAccountApi);

/**
 * Api services for the `PubAccountProjectRel` model.
 */
let PubAccountProjectRelApi = class PubAccountProjectRelApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccountProjectRel`.
     */
    getModelName() {
        return "PubAccountProjectRel";
    }
};
PubAccountProjectRelApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
PubAccountProjectRelApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], PubAccountProjectRelApi);

/**
 * Api services for the `SchemaObject` model.
 */
let SchemaObjectApi = class SchemaObjectApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Remove entity with outgoing statements and namings from project.
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkEntity Primary key of the entity
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SchemaObject` object.)
     * </em>
     */
    removeEntityFromProject(pkProject, pkEntity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SchemaObjects/remove-entity-from-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Add entity with outgoing statements and namings to project.
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkEntity Primary key of the entity
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SchemaObject` object.)
     * </em>
     */
    addEntityToProject(pkProject, pkEntity, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SchemaObjects/add-entity-to-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkEntity !== 'undefined' && pkEntity !== null)
            _urlParams.pkEntity = pkEntity;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Get a object containing apllations and definition of a type (project variant).
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkType Pk of the type.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SchemaObject` object.)
     * </em>
     */
    typeOfProject(pkProject, pkType, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SchemaObjects/type-of-project";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pkProject !== 'undefined' && pkProject !== null)
            _urlParams.pkProject = pkProject;
        if (typeof pkType !== 'undefined' && pkType !== null)
            _urlParams.pkType = pkType;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SchemaObject`.
     */
    getModelName() {
        return "SchemaObject";
    }
};
SchemaObjectApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SchemaObjectApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SchemaObjectApi);

/**
 * Api services for the `SysAppContext` model.
 */
let SysAppContextApi = class SysAppContextApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Get the App Configuration for classes.
     *
     * @param {number} pk_app_context pk_entity of app_context
     *
     * @param {number} pk_project pk_project of project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SysAppContext` object.)
     * </em>
     */
    appContext(pk_app_context = {}, pk_project = {}, customHeaders) {
        let _method = "GET";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SysAppContexts/app-context";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof pk_app_context !== 'undefined' && pk_app_context !== null)
            _urlParams.pk_app_context = pk_app_context;
        if (typeof pk_project !== 'undefined' && pk_project !== null)
            _urlParams.pk_project = pk_project;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysAppContext`.
     */
    getModelName() {
        return "SysAppContext";
    }
};
SysAppContextApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SysAppContextApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SysAppContextApi);

/**
 * Api services for the `SysClassField` model.
 */
let SysClassFieldApi = class SysClassFieldApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SysClassField` object.)
     * </em>
     */
    findComplex(filter = {}, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SysClassFields/findComplex";
        let _routeParams = {};
        let _postBody = {
            filter: filter
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result.pipe(map((instances) => instances.map((instance) => new SysClassField(instance))));
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassField`.
     */
    getModelName() {
        return "SysClassField";
    }
};
SysClassFieldApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SysClassFieldApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SysClassFieldApi);

// import { DfhProperty } from '../../models/DfhProperty';
/**
 * Api services for the `SysClassFieldPropertyRel` model.
 */
let SysClassFieldPropertyRelApi = class SysClassFieldPropertyRelApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassFieldPropertyRel`.
     */
    getModelName() {
        return "SysClassFieldPropertyRel";
    }
};
SysClassFieldPropertyRelApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SysClassFieldPropertyRelApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SysClassFieldPropertyRelApi);

/**
 * Api services for the `SysClassHasTypeProperty` model.
 */
let SysClassHasTypePropertyApi = class SysClassHasTypePropertyApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassHasTypeProperty`.
     */
    getModelName() {
        return "SysClassHasTypeProperty";
    }
};
SysClassHasTypePropertyApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SysClassHasTypePropertyApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SysClassHasTypePropertyApi);

/**
 * Api services for the `SysSystemRelevantClass` model.
 */
let SysSystemRelevantClassApi = class SysSystemRelevantClassApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Replace or create all items in the array.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{SysSystemRelevantClass}` - Array of SysSystemRelevantClass
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `SysSystemRelevantClass` object.)
     * </em>
     */
    bulkReplaceOrCreate(data, customHeaders) {
        let _method = "POST";
        let _url = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/SysSystemRelevantClasses/bulk-replace-or-create";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemRelevantClass`.
     */
    getModelName() {
        return "SysSystemRelevantClass";
    }
};
SysSystemRelevantClassApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SysSystemRelevantClassApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SysSystemRelevantClassApi);

/**
 * Api services for the `SysSystemType` model.
 */
let SysSystemTypeApi = class SysSystemTypeApi extends BaseLoopBackApi {
    constructor(http, connection, models, auth, errorHandler) {
        super(http, connection, models, auth, errorHandler);
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemType`.
     */
    getModelName() {
        return "SysSystemType";
    }
};
SysSystemTypeApi.ctorParameters = () => [
    { type: HttpClient, decorators: [{ type: Inject, args: [HttpClient,] }] },
    { type: SocketConnection, decorators: [{ type: Inject, args: [SocketConnection,] }] },
    { type: SDKModels, decorators: [{ type: Inject, args: [SDKModels,] }] },
    { type: LoopBackAuth, decorators: [{ type: Inject, args: [LoopBackAuth,] }] },
    { type: ErrorHandler, decorators: [{ type: Optional }, { type: Inject, args: [ErrorHandler,] }] }
];
SysSystemTypeApi = __decorate([
    Injectable(),
    __param(0, Inject(HttpClient)),
    __param(1, Inject(SocketConnection)),
    __param(2, Inject(SDKModels)),
    __param(3, Inject(LoopBackAuth)),
    __param(4, Optional()), __param(4, Inject(ErrorHandler))
], SysSystemTypeApi);

/* tslint:disable */
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketBrowser
* @license MIT
* @description
* This module handle socket connections for web browsers, it will be DI Swapped
* depending on the platform environment.
* This module will be generated when the -d ng2web flag is set
**/
class SocketBrowser {
    /**
     * @method connect
     * @param {string} url URL path to connect with the server.
     * @param {any} options Any socket.io v1 =< valid options
     * @return {any} Not currently a socket.io-client for web Typings implemented.
     * @description
     * This method will return a valid socket connection.
     **/
    connect(url, options) {
        return io(url, options);
    }
}

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
CookieBrowser = __decorate([
    Injectable()
], CookieBrowser);

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
StorageBrowser = __decorate([
    Injectable()
], StorageBrowser);

/* tslint:disable */

/* tslint:disable */

/* tslint:disable */

var SdkLb3Module_1;
/**
* @module SdkLb3Module
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
let SdkLb3Module = SdkLb3Module_1 = class SdkLb3Module {
    static forRoot(internalStorageProvider = {
        provide: InternalStorage,
        useClass: CookieBrowser
    }) {
        return {
            ngModule: SdkLb3Module_1,
            providers: [
                LoopBackAuth,
                LoggerService,
                SDKModels,
                RealTime,
                SchemaObjectApi,
                SysClassFieldPropertyRelApi,
                SysClassFieldApi,
                SysClassHasTypePropertyApi,
                SysSystemRelevantClassApi,
                PubAccountApi,
                EmailApi,
                ProProjectApi,
                PubAccountProjectRelApi,
                ProTextPropertyApi,
                ProInfoProjRelApi,
                DfhProfileApi,
                DfhLabelApi,
                DatChunkApi,
                DatColumnApi,
                DatTextPropertyApi,
                DatDigitalApi,
                SysAppContextApi,
                ProClassFieldConfigApi,
                ProDfhClassProjRelApi,
                ProDfhProfileProjRelApi,
                InfAppellationApi,
                InfLangStringApi,
                InfDimensionApi,
                InfTemporalEntityApi,
                InfStatementApi,
                InfLanguageApi,
                InfPersistentItemApi,
                InfTimePrimitiveApi,
                InfPlaceApi,
                DatNamespaceApi,
                InfTextPropertyApi,
                SysSystemTypeApi,
                internalStorageProvider,
                { provide: SDKStorage, useClass: StorageBrowser },
                { provide: SocketDriver, useClass: SocketBrowser }
            ]
        };
    }
};
SdkLb3Module = SdkLb3Module_1 = __decorate([
    NgModule({
        imports: [CommonModule, HttpClientModule],
        declarations: [],
        exports: [],
        providers: [
            ErrorHandler,
            SocketConnection
        ]
    })
], SdkLb3Module);

/**
 * Generated bundle index. Do not edit.
 */

export { AccessToken, BaseLoopBackApi, BaseStorage, CookieBrowser, DatChunk, DatChunkApi, DatColumn, DatColumnApi, DatDigital, DatDigitalApi, DatNamespace, DatNamespaceApi, DatTextProperty, DatTextPropertyApi, DfhLabel, DfhLabelApi, DfhProfile, DfhProfileApi, Email, EmailApi, ErrorHandler, FireLoopRef, InfAppellation, InfAppellationApi, InfDimension, InfDimensionApi, InfLangString, InfLangStringApi, InfLanguage, InfLanguageApi, InfPersistentItem, InfPersistentItemApi, InfPlace, InfPlaceApi, InfStatement, InfStatementApi, InfTemporalEntity, InfTemporalEntityApi, InfTextProperty, InfTextPropertyApi, InfTimePrimitive, InfTimePrimitiveApi, InternalStorage, LoggerService, LoopBackAuth, LoopBackConfig, ProClassFieldConfig, ProClassFieldConfigApi, ProDfhClassProjRel, ProDfhClassProjRelApi, ProDfhProfileProjRel, ProDfhProfileProjRelApi, ProInfoProjRel, ProInfoProjRelApi, ProProject, ProProjectApi, ProTextProperty, ProTextPropertyApi, PubAccount, PubAccountApi, PubAccountProjectRel, PubAccountProjectRelApi, RealTime, SDKModels, SDKStorage, SDKToken, SchemaObject, SchemaObjectApi, SdkLb3Module, StorageBrowser, SysAppContext, SysAppContextApi, SysClassField, SysClassFieldApi, SysClassFieldPropertyRel, SysClassFieldPropertyRelApi, SysClassHasTypeProperty, SysClassHasTypePropertyApi, SysSystemRelevantClass, SysSystemRelevantClassApi, SysSystemType, SysSystemTypeApi, SocketConnection as ɵa, SocketDriver as ɵb, SocketBrowser as ɵc };
//# sourceMappingURL=kleiolab-lib-sdk-lb3.js.map
