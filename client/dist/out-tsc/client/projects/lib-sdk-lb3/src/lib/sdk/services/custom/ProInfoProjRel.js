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
ProInfoProjRelApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], ProInfoProjRelApi);
export { ProInfoProjRelApi };
//# sourceMappingURL=ProInfoProjRel.js.map