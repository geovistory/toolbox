import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { InfTextProperty } from '../../models/InfTextProperty';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfTextProperty` model.
 */
export declare class InfTextPropertyApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
    findOrCreateInfTextProperties(pk_project: any, data: any, customHeaders?: Function): Observable<InfTextProperty[]>;
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
    findOrCreateInfTextProperty(pkProject: any, data: any, customHeaders?: Function): Observable<InfTextProperty[]>;
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
    findAlternativeTextProperties(pkProject: any, pkEntity: any, pkClassField: any, customHeaders?: Function): Observable<InfTextProperty[]>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    getModelName(): string;
}
