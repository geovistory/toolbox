import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `ProInfoProjRel` model.
 */
export declare class ProInfoProjRelApi extends BaseLoopBackApi {
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
     * This usually means the response is a `ProInfoProjRel` object.)
     * </em>
     */
    patchOrCreate(data?: any, customHeaders?: Function): Observable<any>;
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
    markStatementAsFavorite(pkProject: any, pkStatement: any, isOutgoing: any, customHeaders?: Function): Observable<any>;
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
    updateEprAttributes(pkProject: any, pkEntity: any, eprAttributes: any, customHeaders?: Function): Observable<any>;
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
    bulkUpdateEprAttributes(pkProject: any, items: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    getModelName(): string;
}
