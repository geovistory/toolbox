import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter } from '../../models/BaseModels';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SysClassField } from '../../models/SysClassField';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `SysClassField` model.
 */
export declare class SysClassFieldApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
    findComplex(filter?: LoopBackFilter, customHeaders?: Function): Observable<SysClassField[]>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassField`.
     */
    getModelName(): string;
}
