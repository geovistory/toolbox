import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { map } from 'rxjs/operators';
import { InfPlace } from '../../models/InfPlace';
import { SocketConnection } from '../../sockets/socket.connections';
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
InfPlaceApi = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(HttpClient)),
    tslib_1.__param(1, Inject(SocketConnection)),
    tslib_1.__param(2, Inject(SDKModels)),
    tslib_1.__param(3, Inject(LoopBackAuth)),
    tslib_1.__param(4, Optional()), tslib_1.__param(4, Inject(ErrorHandler))
], InfPlaceApi);
export { InfPlaceApi };
//# sourceMappingURL=InfPlace.js.map