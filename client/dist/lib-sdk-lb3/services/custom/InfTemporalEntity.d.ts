import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfTemporalEntity` model.
 */
export declare class InfTemporalEntityApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
    /**
     * Find or create many information temporal entities.
     *
     * @param {number} pk_project Pk of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    findOrCreateInfTemporalEntities(pk_project: any, data: any, customHeaders?: Function): Observable<InfTemporalEntity[]>;
    /**
     * Get a flat object of temporal entities.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
     *
     * @param {number} pkTargetClass Fk class of the target temporal entities.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned temporal entities.
     *
     * @param {number} offset offset of the segment of returned temporal entities.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    alternativeTemporalEntityList(pkProject: any, pkSourceEntity: any, pkProperty: any, pkTargetClass: any, isOutgoing: any, limit: any, offset: any, customHeaders?: Function): Observable<any>;
    /**
     * Get a flat object of temporal entities.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the temporal entities are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the temporal entities.
     *
     * @param {number} pkTargetClass Fk class of the target temporal entities.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned temporal entities.
     *
     * @param {number} offset offset of the segment of returned temporal entities.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    temporalEntityList(pkProject: any, pkSourceEntity: any, pkProperty: any, pkTargetClass: any, isOutgoing: any, limit: any, offset: any, customHeaders?: Function): Observable<any>;
    /**
     * Get e schema object of own properties of the temporal entity in project version.
     *
     * @param {number} pkProject Pk project
     *
     * @param {number} pkEntity Primary Key of the temporal entity (pk_entity)
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    ownProperties(pkProject: any, pkEntity: any, customHeaders?: Function): Observable<any>;
    /**
     * Find or create a temporal entity version.
     *
     * @param {number} pkProject Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    findOrCreateInfTemporalEntity(pkProject: any, data: any, customHeaders?: Function): Observable<InfTemporalEntity[]>;
    /**
     * Relate a nested object of a InfTemporalEntity to the project.
     *
     * @param {number} pkProject Id of the project
     *
     * @param {boolean} isInProject Include or exclude from project.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfTemporalEntity}` - data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfTemporalEntity` object.)
     * </em>
     */
    changeTeEntProjectRelation(pkProject: any, isInProject: any, data: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTemporalEntity`.
     */
    getModelName(): string;
}
