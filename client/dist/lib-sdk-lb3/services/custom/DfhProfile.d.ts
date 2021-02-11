import { HttpClient } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackAuth } from '../core/auth.service';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { SocketConnection } from '../../sockets/socket.connections';
/**
 * Api services for the `DfhProfile` model.
 */
export declare class DfhProfileApi extends BaseLoopBackApi {
    protected http: HttpClient;
    protected connection: SocketConnection;
    protected models: SDKModels;
    protected auth: LoopBackAuth;
    protected errorHandler: ErrorHandler;
    constructor(http: HttpClient, connection: SocketConnection, models: SDKModels, auth: LoopBackAuth, errorHandler: ErrorHandler);
    /**
     * Get all profiles that are used by the given project.
     *
     * @param {number} pkProject Project pk
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    ofProject(pkProject?: any, customHeaders?: Function): Observable<any>;
    /**
     * Pulls profile data including classes and properties from OntoMe and updates profile data in geovistory.
     *
     * @param {number} pkProfile OntoMe profile that should be added
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    updateFromOntoMe(pkProfile: any, requestedLanguage?: any, customHeaders?: Function): Observable<any>;
    /**
     * Pulls profile data including classes and properties from OntoMe and adds profile to project.
     *
     * @param {number} pkProject Geovistory project to which the OntoMe profile should be added
     *
     * @param {number} pkProfile OntoMe profile that should be added
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    updateAndAddToProject(pkProject: any, pkProfile: any, requestedLanguage?: any, customHeaders?: Function): Observable<any>;
    /**
     * Creates an activation report for the given OntoMe profile and the given Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the activation report should be created
     *
     * @param {number} pkProfile OntoMe profile for which the activation report should be created
     *
     * @param {string} requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is 'en'.
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    getActivationReport(pkProject: any, pkProfile: any, requestedLanguage?: any, customHeaders?: Function): Observable<any>;
    /**
     * Creates an deactivation report for the given OntoMe profile and the given Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the deactivation report should be created
     *
     * @param {number} pkProfile OntoMe profile for which the deactivation report should be created
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    getDeactivationReport(pkProject: any, pkProfile: any, customHeaders?: Function): Observable<any>;
    /**
     * Deavtivates an OntoMe profile for a Geovistory project.
     *
     * @param {number} pkProject Geovistory project for which the profile should be deactivated
     *
     * @param {number} pkProfile OntoMe profile to deactivate for the given Geovistory project
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
     * This usually means the response is a `DfhProfile` object.)
     * </em>
     */
    deactivateProfileForProject(pkProject: any, pkProfile: any, customHeaders?: Function): Observable<any>;
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    getModelName(): string;
}
