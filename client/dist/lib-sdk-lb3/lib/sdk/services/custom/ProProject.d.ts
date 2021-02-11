import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `ProProject` model.
 */
export declare class ProProjectApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
    ofAccount(accountId: any, customHeaders?: Function): Observable<any>;
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
    createWithLabelAndDescription(accountId: any, pkLanguage: any, label: any, textProperty?: any, customHeaders?: Function): Observable<any>;
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
    getBasics(pkProject: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    getModelName(): string;
}
