import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { SocketConnection } from '../../sockets/socket.connections';
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
ProProjectApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], ProProjectApi);
export { ProProjectApi };
//# sourceMappingURL=ProProject.js.map