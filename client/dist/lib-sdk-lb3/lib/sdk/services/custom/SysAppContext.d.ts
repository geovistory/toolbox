import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `SysAppContext` model.
 */
export declare class SysAppContextApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
    appContext(pk_app_context?: any, pk_project?: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysAppContext`.
     */
    getModelName(): string;
}
