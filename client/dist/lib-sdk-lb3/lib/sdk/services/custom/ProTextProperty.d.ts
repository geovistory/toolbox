import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `ProTextProperty` model.
 */
export declare class ProTextPropertyApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
    ofProject(pkProject: any, customHeaders?: Function): Observable<any>;
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
    bulkUpsert(pkProject: any, items: any, customHeaders?: Function): Observable<any>;
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
    bulkDelete(pkProject: any, items: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    getModelName(): string;
}
