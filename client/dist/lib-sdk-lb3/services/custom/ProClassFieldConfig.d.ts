import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `ProClassFieldConfig` model.
 */
export declare class ProClassFieldConfigApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
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
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    patchOrCreate(data?: any, customHeaders?: Function): Observable<any>;
    /**
     * Find ProClassFieldConfig of project
     *
     * @param {number} pkProject Pk of the project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    ofProject(pkProject: any, customHeaders?: Function): Observable<any>;
    /**
     * Creates or updates instances of ProClassFieldConfig.
     *
     * @param {number} pkProject Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{ProClassFieldConfig}` - Array ProClassFieldConfig
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    bulkUpsert(pkProject: any, data: any, customHeaders?: Function): Observable<any>;
    /**
     * Deletes instances of ProClassFieldConfig.
     *
     * @param {object} data Request data.
     *
     *  - `pks` – `{number}` - Array of Primary Key of ProClassFieldConfigs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ProClassFieldConfig` object.)
     * </em>
     */
    bulkDelete(pks: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProClassFieldConfig`.
     */
    getModelName(): string;
}
