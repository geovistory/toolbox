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

import { ProInfoProjRel } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class ProInfoProjRelService {

    protected basePath = 'http://127.0.0.1:3000';
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
     * Updates the ProInfoProjRel of all found by fk_project and fk_entity.
     * @param pkProject fk_project
     * @param proInfoProjRel Array of ProInfoProjRel (fk_project must be equal to pkProject)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public proInfoProjRelBulkUpdateEprAttributes(pkProject: number, proInfoProjRel: Array<ProInfoProjRel>, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<ProInfoProjRel>;
    public proInfoProjRelBulkUpdateEprAttributes(pkProject: number, proInfoProjRel: Array<ProInfoProjRel>, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<ProInfoProjRel>>;
    public proInfoProjRelBulkUpdateEprAttributes(pkProject: number, proInfoProjRel: Array<ProInfoProjRel>, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<ProInfoProjRel>>;
    public proInfoProjRelBulkUpdateEprAttributes(pkProject: number, proInfoProjRel: Array<ProInfoProjRel>, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling proInfoProjRelBulkUpdateEprAttributes.');
        }
        if (proInfoProjRel === null || proInfoProjRel === undefined) {
            throw new Error('Required parameter proInfoProjRel was null or undefined when calling proInfoProjRelBulkUpdateEprAttributes.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }

        let headers = this.defaultHeaders;

        // authentication (accesstoken) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["accesstoken"] || this.configuration.apiKeys["authorization"];
            if (key) {
                headers = headers.set('authorization', key);
            }
        }

        // authentication (jwt) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.put<ProInfoProjRel>(`${this.configuration.basePath}/lb3-api/ProInfoProjRels/bulk-update-attributes`,
            proInfoProjRel,
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
     * Find all instances of the model matched by filter from the data source.
     * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string (&#x60;{\&quot;where\&quot;:{\&quot;something\&quot;:\&quot;value\&quot;}}&#x60;).  See https://loopback.io/doc/en/lb3/Querying-data.html#using-stringified-json-in-rest-queries for more details.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public proInfoProjRelFind(filter?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<ProInfoProjRel>>;
    public proInfoProjRelFind(filter?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<ProInfoProjRel>>>;
    public proInfoProjRelFind(filter?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<ProInfoProjRel>>>;
    public proInfoProjRelFind(filter?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (filter !== undefined && filter !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>filter, 'filter');
        }

        let headers = this.defaultHeaders;

        // authentication (accesstoken) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["accesstoken"] || this.configuration.apiKeys["authorization"];
            if (key) {
                headers = headers.set('authorization', key);
            }
        }

        // authentication (jwt) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.get<Array<ProInfoProjRel>>(`${this.configuration.basePath}/lb3-api/ProInfoProjRels`,
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
     * Marks the statement as favorite for the given fk_project.
     * @param pkProject fk_project
     * @param pkStatement fk_entity
     * @param body True, if the statement is outgoing, else false
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public proInfoProjRelMarkStatementAsFavorite(pkProject: number, pkStatement: number, body: boolean, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<ProInfoProjRel>;
    public proInfoProjRelMarkStatementAsFavorite(pkProject: number, pkStatement: number, body: boolean, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<ProInfoProjRel>>;
    public proInfoProjRelMarkStatementAsFavorite(pkProject: number, pkStatement: number, body: boolean, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<ProInfoProjRel>>;
    public proInfoProjRelMarkStatementAsFavorite(pkProject: number, pkStatement: number, body: boolean, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling proInfoProjRelMarkStatementAsFavorite.');
        }
        if (pkStatement === null || pkStatement === undefined) {
            throw new Error('Required parameter pkStatement was null or undefined when calling proInfoProjRelMarkStatementAsFavorite.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling proInfoProjRelMarkStatementAsFavorite.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkStatement !== undefined && pkStatement !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkStatement, 'pkStatement');
        }

        let headers = this.defaultHeaders;

        // authentication (accesstoken) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["accesstoken"] || this.configuration.apiKeys["authorization"];
            if (key) {
                headers = headers.set('authorization', key);
            }
        }

        // authentication (jwt) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.put<ProInfoProjRel>(`${this.configuration.basePath}/lb3-api/ProInfoProjRels/mark-statement-as-favorite`,
            body,
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
     * Patch an existing model instance or insert a new one into the data source.
     * @param proInfoProjRel Model instance data
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public proInfoProjRelPatchOrCreate(proInfoProjRel?: ProInfoProjRel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<ProInfoProjRel>;
    public proInfoProjRelPatchOrCreate(proInfoProjRel?: ProInfoProjRel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<ProInfoProjRel>>;
    public proInfoProjRelPatchOrCreate(proInfoProjRel?: ProInfoProjRel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<ProInfoProjRel>>;
    public proInfoProjRelPatchOrCreate(proInfoProjRel?: ProInfoProjRel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (accesstoken) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["accesstoken"] || this.configuration.apiKeys["authorization"];
            if (key) {
                headers = headers.set('authorization', key);
            }
        }

        // authentication (jwt) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.patch<ProInfoProjRel>(`${this.configuration.basePath}/lb3-api/ProInfoProjRels`,
            proInfoProjRel,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates the ProInfoProjRel found by fk_project and fk_entity.
     * @param pkProject fk_project
     * @param pkEntity fk_entity
     * @param proInfoProjRel Instance of ProInfoProjRel (fk_project and fk_entity will be ignored)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public proInfoProjRelUpdateEprAttributes(pkProject: number, pkEntity: number, proInfoProjRel: ProInfoProjRel, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<ProInfoProjRel>;
    public proInfoProjRelUpdateEprAttributes(pkProject: number, pkEntity: number, proInfoProjRel: ProInfoProjRel, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<ProInfoProjRel>>;
    public proInfoProjRelUpdateEprAttributes(pkProject: number, pkEntity: number, proInfoProjRel: ProInfoProjRel, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<ProInfoProjRel>>;
    public proInfoProjRelUpdateEprAttributes(pkProject: number, pkEntity: number, proInfoProjRel: ProInfoProjRel, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling proInfoProjRelUpdateEprAttributes.');
        }
        if (pkEntity === null || pkEntity === undefined) {
            throw new Error('Required parameter pkEntity was null or undefined when calling proInfoProjRelUpdateEprAttributes.');
        }
        if (proInfoProjRel === null || proInfoProjRel === undefined) {
            throw new Error('Required parameter proInfoProjRel was null or undefined when calling proInfoProjRelUpdateEprAttributes.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkEntity !== undefined && pkEntity !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkEntity, 'pkEntity');
        }

        let headers = this.defaultHeaders;

        // authentication (accesstoken) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["accesstoken"] || this.configuration.apiKeys["authorization"];
            if (key) {
                headers = headers.set('authorization', key);
            }
        }

        // authentication (jwt) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.put<ProInfoProjRel>(`${this.configuration.basePath}/lb3-api/ProInfoProjRels/updateEprAttributes`,
            proInfoProjRel,
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