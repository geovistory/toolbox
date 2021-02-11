import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfPersistentItem` model.
 */
export declare class InfPersistentItemApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
    /**
     * Find or create many information persistent items.
     *
     * @param {number} pk_project Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfPersistentItem}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    findOrCreateInfPersistentItems(pk_project: any, data: any, customHeaders?: Function): Observable<InfPersistentItem[]>;
    /**
     * Get only miminal properties of persistent item.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkEntity Pk of the entity.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    ownProperties(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any>;
    /**
     * Get a minimal nested object of all types in the project.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    typesOfProject(pkProject: any, customHeaders?: Function): Observable<any>;
    /**
     * Find types of typed class and project. E.g. get the types for the class 'histC8 Geographical Place' (pk_typed_class=363) used in project (pk_project=123)
     *
     * @param {number} pk_project Primary Key of Project
     *
     * @param {number} pk_typed_classes Primary Keyes of Typed Classes (e.g. pk of Geographical Place to get Geographical Place Types)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    typesOfClassesAndProject(pk_project: any, pk_typed_classes: any, customHeaders?: Function): Observable<any>;
    /**
     * Find one type by pk_entity with appellations and text properties.
     *
     * @param {number} pk_project Primary Key of Project
     *
     * @param {number} pk_entity Primary Key of the type. Provide this if you want to query one specific type.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfPersistentItem` object.)
     * </em>
     */
    typeNested(pk_project: any, pk_entity: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPersistentItem`.
     */
    getModelName(): string;
}
