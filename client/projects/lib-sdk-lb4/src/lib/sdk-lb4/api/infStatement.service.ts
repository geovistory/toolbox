/**
 * geovistory
 * Geovistory – Platform for Digital History
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { InfStatement } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class InfStatementService {

    protected basePath = 'http://0.0.0.0:3000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Get statements (with children) of given fkProperty and fkEntity from Repo that are not in project of given projectId.
     * @param entityPk Key of the persistent item (fk_object_info)
     * @param propertyPk Key of the property (fk_property)
     * @param pkProject Id of the the current project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public infStatementAlternativesNotInProjectByEntityPk(entityPk: number, propertyPk: number, pkProject: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<InfStatement>>;
    public infStatementAlternativesNotInProjectByEntityPk(entityPk: number, propertyPk: number, pkProject: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<InfStatement>>>;
    public infStatementAlternativesNotInProjectByEntityPk(entityPk: number, propertyPk: number, pkProject: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<InfStatement>>>;
    public infStatementAlternativesNotInProjectByEntityPk(entityPk: number, propertyPk: number, pkProject: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (entityPk === null || entityPk === undefined) {
            throw new Error('Required parameter entityPk was null or undefined when calling infStatementAlternativesNotInProjectByEntityPk.');
        }
        if (propertyPk === null || propertyPk === undefined) {
            throw new Error('Required parameter propertyPk was null or undefined when calling infStatementAlternativesNotInProjectByEntityPk.');
        }
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling infStatementAlternativesNotInProjectByEntityPk.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (entityPk !== undefined && entityPk !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>entityPk, 'entityPk');
        }
        if (propertyPk !== undefined && propertyPk !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>propertyPk, 'propertyPk');
        }
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (accesstoken) required
        credential = this.configuration.lookupCredential('accesstoken');
        if (credential) {
            headers = headers.set('authorization', credential);
        }

        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'application/xml',
                'text/xml',
                'application/javascript',
                'text/javascript'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<InfStatement>>(`${this.configuration.basePath}/lb3-api/InfStatements/alternatives-not-in-project-by-entity-pk`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get statements (with children) of given propertyPk and teEntPk from Repo that are not in project of given projectId.
     * @param teEntPk Key of the temporal entity (fk_subject_info)
     * @param propertyPk Key of the property (fk_property)
     * @param pkProject Id of the the current project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public infStatementAlternativesNotInProjectByTeEntPk(teEntPk: number, propertyPk: number, pkProject: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<InfStatement>>;
    public infStatementAlternativesNotInProjectByTeEntPk(teEntPk: number, propertyPk: number, pkProject: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<InfStatement>>>;
    public infStatementAlternativesNotInProjectByTeEntPk(teEntPk: number, propertyPk: number, pkProject: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<InfStatement>>>;
    public infStatementAlternativesNotInProjectByTeEntPk(teEntPk: number, propertyPk: number, pkProject: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (teEntPk === null || teEntPk === undefined) {
            throw new Error('Required parameter teEntPk was null or undefined when calling infStatementAlternativesNotInProjectByTeEntPk.');
        }
        if (propertyPk === null || propertyPk === undefined) {
            throw new Error('Required parameter propertyPk was null or undefined when calling infStatementAlternativesNotInProjectByTeEntPk.');
        }
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling infStatementAlternativesNotInProjectByTeEntPk.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (teEntPk !== undefined && teEntPk !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>teEntPk, 'teEntPk');
        }
        if (propertyPk !== undefined && propertyPk !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>propertyPk, 'propertyPk');
        }
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (accesstoken) required
        credential = this.configuration.lookupCredential('accesstoken');
        if (credential) {
            headers = headers.set('authorization', credential);
        }

        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'application/xml',
                'text/xml',
                'application/javascript',
                'text/javascript'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<InfStatement>>(`${this.configuration.basePath}/lb3-api/InfStatements/alternatives-not-in-project-by-te-ent-pk`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find or create information statement.
     * @param pkProject Id of the project
     * @param infStatement data
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public infStatementFindOrCreateInfStatements(pkProject: number, infStatement: Array<InfStatement>, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<InfStatement>>;
    public infStatementFindOrCreateInfStatements(pkProject: number, infStatement: Array<InfStatement>, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<InfStatement>>>;
    public infStatementFindOrCreateInfStatements(pkProject: number, infStatement: Array<InfStatement>, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<InfStatement>>>;
    public infStatementFindOrCreateInfStatements(pkProject: number, infStatement: Array<InfStatement>, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling infStatementFindOrCreateInfStatements.');
        }
        if (infStatement === null || infStatement === undefined) {
            throw new Error('Required parameter infStatement was null or undefined when calling infStatementFindOrCreateInfStatements.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pk_project');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (accesstoken) required
        credential = this.configuration.lookupCredential('accesstoken');
        if (credential) {
            headers = headers.set('authorization', credential);
        }

        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'application/xml',
                'text/xml',
                'application/javascript',
                'text/javascript'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<Array<InfStatement>>(`${this.configuration.basePath}/lb3-api/InfStatements/find-or-create-many`,
            infStatement,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a flat object of entity previews, that are target of a list.
     * @param pkProject Pk of the project.
     * @param pkSourceEntity Pk of the source entity to which the entity previews, that are target of a list are related.
     * @param pkProperty Pk of the property leading from source entity to the entity previews, that are target of a list.
     * @param pkTargetClass Fk class of the target entity previews, that are target of a list.
     * @param isOutgoing If true, the source entity is domain, else range.
     * @param limit number of returned entity previews, that are target of a list.
     * @param offset offset of the segment of returned entity previews, that are target of a list.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public infStatementPaginatedListTargetingEntityPreviews(pkProject: number, pkSourceEntity: number, pkProperty: number, pkTargetClass: number, isOutgoing: boolean, limit: number, offset: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<object>;
    public infStatementPaginatedListTargetingEntityPreviews(pkProject: number, pkSourceEntity: number, pkProperty: number, pkTargetClass: number, isOutgoing: boolean, limit: number, offset: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<object>>;
    public infStatementPaginatedListTargetingEntityPreviews(pkProject: number, pkSourceEntity: number, pkProperty: number, pkTargetClass: number, isOutgoing: boolean, limit: number, offset: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<object>>;
    public infStatementPaginatedListTargetingEntityPreviews(pkProject: number, pkSourceEntity: number, pkProperty: number, pkTargetClass: number, isOutgoing: boolean, limit: number, offset: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }
        if (pkSourceEntity === null || pkSourceEntity === undefined) {
            throw new Error('Required parameter pkSourceEntity was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }
        if (pkProperty === null || pkProperty === undefined) {
            throw new Error('Required parameter pkProperty was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }
        if (pkTargetClass === null || pkTargetClass === undefined) {
            throw new Error('Required parameter pkTargetClass was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }
        if (isOutgoing === null || isOutgoing === undefined) {
            throw new Error('Required parameter isOutgoing was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }
        if (limit === null || limit === undefined) {
            throw new Error('Required parameter limit was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }
        if (offset === null || offset === undefined) {
            throw new Error('Required parameter offset was null or undefined when calling infStatementPaginatedListTargetingEntityPreviews.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkSourceEntity !== undefined && pkSourceEntity !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkSourceEntity, 'pkSourceEntity');
        }
        if (pkProperty !== undefined && pkProperty !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProperty, 'pkProperty');
        }
        if (pkTargetClass !== undefined && pkTargetClass !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkTargetClass, 'pkTargetClass');
        }
        if (isOutgoing !== undefined && isOutgoing !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>isOutgoing, 'isOutgoing');
        }
        if (limit !== undefined && limit !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>limit, 'limit');
        }
        if (offset !== undefined && offset !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>offset, 'offset');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (accesstoken) required
        credential = this.configuration.lookupCredential('accesstoken');
        if (credential) {
            headers = headers.set('authorization', credential);
        }

        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'application/xml',
                'text/xml',
                'application/javascript',
                'text/javascript'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<object>(`${this.configuration.basePath}/lb3-api/InfStatements/paginated-list-targeting-entity-previews`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Find statements by params.
     * @param ofProject if true, finds project version. if false, finds repo version.
     * @param pkProject Primary Key of the Project. If provided and ofProject&#x3D;false, makes a left join with project
     * @param pkEntity Primary Key of the statement (pk_entity)
     * @param pkInfoRange Foreign Key of the statement pointing to the range entity (fk_object_info)
     * @param pkInfoDomain Foreign Key of the statement pointing to the domain entity (fk_subject_info)
     * @param pkProperty Foreign Key of the statement pointing to the property (fk_property)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public infStatementQueryByParams(ofProject: boolean, pkProject?: number, pkEntity?: number, pkInfoRange?: number, pkInfoDomain?: number, pkProperty?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<InfStatement>>;
    public infStatementQueryByParams(ofProject: boolean, pkProject?: number, pkEntity?: number, pkInfoRange?: number, pkInfoDomain?: number, pkProperty?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<InfStatement>>>;
    public infStatementQueryByParams(ofProject: boolean, pkProject?: number, pkEntity?: number, pkInfoRange?: number, pkInfoDomain?: number, pkProperty?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<InfStatement>>>;
    public infStatementQueryByParams(ofProject: boolean, pkProject?: number, pkEntity?: number, pkInfoRange?: number, pkInfoDomain?: number, pkProperty?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (ofProject === null || ofProject === undefined) {
            throw new Error('Required parameter ofProject was null or undefined when calling infStatementQueryByParams.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (ofProject !== undefined && ofProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>ofProject, 'ofProject');
        }
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkEntity !== undefined && pkEntity !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkEntity, 'pkEntity');
        }
        if (pkInfoRange !== undefined && pkInfoRange !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkInfoRange, 'pkInfoRange');
        }
        if (pkInfoDomain !== undefined && pkInfoDomain !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkInfoDomain, 'pkInfoDomain');
        }
        if (pkProperty !== undefined && pkProperty !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProperty, 'pkProperty');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (accesstoken) required
        credential = this.configuration.lookupCredential('accesstoken');
        if (credential) {
            headers = headers.set('authorization', credential);
        }

        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'application/xml',
                'text/xml',
                'application/javascript',
                'text/javascript'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<InfStatement>>(`${this.configuration.basePath}/lb3-api/InfStatements/find-by-params`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get an nested object of statement with everything needed to display the links made from an entity towards sources and digitals.
     * @param ofProject if true, finds project version. if false, finds repo version.
     * @param pkProject Primary Key of the Project.
     * @param pkEntity Primary Key of the entity for which the sources links are needed.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public infStatementSourcesAndDigitalsOfEntity(ofProject: boolean, pkProject?: number, pkEntity?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<object>>;
    public infStatementSourcesAndDigitalsOfEntity(ofProject: boolean, pkProject?: number, pkEntity?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<object>>>;
    public infStatementSourcesAndDigitalsOfEntity(ofProject: boolean, pkProject?: number, pkEntity?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<object>>>;
    public infStatementSourcesAndDigitalsOfEntity(ofProject: boolean, pkProject?: number, pkEntity?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (ofProject === null || ofProject === undefined) {
            throw new Error('Required parameter ofProject was null or undefined when calling infStatementSourcesAndDigitalsOfEntity.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (ofProject !== undefined && ofProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>ofProject, 'ofProject');
        }
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkEntity !== undefined && pkEntity !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkEntity, 'pkEntity');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (accesstoken) required
        credential = this.configuration.lookupCredential('accesstoken');
        if (credential) {
            headers = headers.set('authorization', credential);
        }

        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json',
                'application/xml',
                'text/xml',
                'application/javascript',
                'text/javascript'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<object>>(`${this.configuration.basePath}/lb3-api/InfStatements/sources-and-digitals-of-entity`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}