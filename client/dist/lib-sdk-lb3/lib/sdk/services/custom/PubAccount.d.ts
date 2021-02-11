import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `PubAccount` model.
 */
export declare class PubAccountApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
    getRoles(id: any, customHeaders?: Function): Observable<any>;
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
    listProjects(id: any, customHeaders?: Function): Observable<any>;
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
    withRolesAndProjects(customHeaders?: Function): Observable<any>;
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
    login(credentials: any, include?: any, customHeaders?: Function): Observable<any>;
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
    logout(customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `PubAccount`.
     */
    getModelName(): string;
}
