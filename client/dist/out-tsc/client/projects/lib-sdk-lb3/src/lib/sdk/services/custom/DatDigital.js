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
DatDigitalApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], DatDigitalApi);
export { DatDigitalApi };
//# sourceMappingURL=DatDigital.js.map