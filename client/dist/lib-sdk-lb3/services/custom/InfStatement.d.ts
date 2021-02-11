import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { InfStatement } from '../../models/InfStatement';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `InfStatement` model.
 */
export declare class InfStatementApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
    /**
     * Get a flat object of entity previews, that are target of a list.
     *
     * @param {number} pkProject Pk of the project.
     *
     * @param {number} pkSourceEntity Pk of the source entity to which the entity previews, that are target of a list are related.
     *
     * @param {number} pkProperty Pk of the property leading from source entity to the entity previews, that are target of a list.
     *
     * @param {number} pkTargetClass Fk class of the target entity previews, that are target of a list.
     *
     * @param {boolean} isOutgoing If true, the source entity is domain, else range.
     *
     * @param {number} limit number of returned entity previews, that are target of a list.
     *
     * @param {number} offset offset of the segment of returned entity previews, that are target of a list.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    paginatedListTargetingEntityPreviews(pkProject: any, pkSourceEntity: any, pkProperty: any, pkTargetClass: any, isOutgoing: any, limit: any, offset: any, customHeaders?: Function): Observable<any>;
    /**
     * Find or create information statement.
     *
     * @param {number} pk_project Id of the project
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{InfStatement}` - data
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    findOrCreateInfStatements(pk_project: any, data: any, customHeaders?: Function): Observable<InfStatement[]>;
    /**
     * Get statements (with children) of given fkProperty and fkEntity from Repo that are not in project of given projectId.
     *
     * @param {number} entityPk Key of the persistent item (fk_object_info)
     *
     * @param {number} propertyPk Key of the property (fk_property)
     *
     * @param {number} pkProject Id of the the current project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    alternativesNotInProjectByEntityPk(entityPk: any, propertyPk: any, pkProject: any, customHeaders?: Function): Observable<any>;
    /**
     * Get statements (with children) of given propertyPk and teEntPk from Repo that are not in project of given projectId.
     *
     * @param {number} teEntPk Key of the temporal entity (fk_subject_info)
     *
     * @param {number} propertyPk Key of the property (fk_property)
     *
     * @param {number} pkProject Id of the the current project
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    alternativesNotInProjectByTeEntPk(teEntPk: any, propertyPk: any, pkProject: any, customHeaders?: Function): Observable<any>;
    /**
     * Get an nested object of statement with everything needed to display the links made from an entity towards sources and digitals.
     *
     * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
     *
     * @param {number} pkProject Primary Key of the Project.
     *
     * @param {number} pkEntity Primary Key of the entity for which the sources links are needed.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    sourcesAndDigitalsOfEntity(ofProject: any, pkProject?: any, pkEntity?: any, customHeaders?: Function): Observable<any>;
    /**
     * Find statements by params.
     *
     * @param {boolean} ofProject if true, finds project version. if false, finds repo version.
     *
     * @param {number} pkProject Primary Key of the Project. If provided and ofProject=false, makes a left join with project
     *
     * @param {number} pkEntity Primary Key of the statement (pk_entity)
     *
     * @param {number} pkInfoRange Foreign Key of the statement pointing to the range entity (fk_object_info)
     *
     * @param {number} pkInfoDomain Foreign Key of the statement pointing to the domain entity (fk_subject_info)
     *
     * @param {number} pkProperty Foreign Key of the statement pointing to the property (fk_property)
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `InfStatement` object.)
     * </em>
     */
    queryByParams(ofProject: any, pkProject?: any, pkEntity?: any, pkInfoRange?: any, pkInfoDomain?: any, pkProperty?: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfStatement`.
     */
    getModelName(): string;
}
