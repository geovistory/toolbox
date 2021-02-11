import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `DatColumn` model.
 */
export declare class DatColumnApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
    /**
     * Get the columns related to the digital (table).
     *
     * @param {number} pkProject Primary key of the project
     *
     * @param {number} pkDigital Primary key of the digital
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DatColumn` object.)
     * </em>
     */
    ofDigital(pkProject: any, pkDigital: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    getModelName(): string;
}
