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

import { DfhProfile } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class DfhProfileService {

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
     * Deavtivates an OntoMe profile for a Geovistory project.
     * @param pkProject Geovistory project for which the profile should be deactivated
     * @param pkProfile OntoMe profile to deactivate for the given Geovistory project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dfhProfileDeactivateProfileForProject(pkProject: number, pkProfile: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<object>>;
    public dfhProfileDeactivateProfileForProject(pkProject: number, pkProfile: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<object>>>;
    public dfhProfileDeactivateProfileForProject(pkProject: number, pkProfile: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<object>>>;
    public dfhProfileDeactivateProfileForProject(pkProject: number, pkProfile: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileDeactivateProfileForProject.');
        }
        if (pkProfile === null || pkProfile === undefined) {
            throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileDeactivateProfileForProject.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkProfile !== undefined && pkProfile !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProfile, 'pkProfile');
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

        return this.httpClient.post<Array<object>>(`${this.configuration.basePath}/lb3-api/DfhProfiles/deactivate-ontome-profile-for-geovistory-project`,
            null,
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
     * Creates an activation report for the given OntoMe profile and the given Geovistory project.
     * @param pkProject Geovistory project for which the activation report should be created
     * @param pkProfile OntoMe profile for which the activation report should be created
     * @param requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is \&#39;en\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dfhProfileGetActivationReport(pkProject: number, pkProfile: number, requestedLanguage?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<object>>;
    public dfhProfileGetActivationReport(pkProject: number, pkProfile: number, requestedLanguage?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<object>>>;
    public dfhProfileGetActivationReport(pkProject: number, pkProfile: number, requestedLanguage?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<object>>>;
    public dfhProfileGetActivationReport(pkProject: number, pkProfile: number, requestedLanguage?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileGetActivationReport.');
        }
        if (pkProfile === null || pkProfile === undefined) {
            throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileGetActivationReport.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkProfile !== undefined && pkProfile !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProfile, 'pkProfile');
        }
        if (requestedLanguage !== undefined && requestedLanguage !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>requestedLanguage, 'requestedLanguage');
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

        return this.httpClient.post<Array<object>>(`${this.configuration.basePath}/lb3-api/DfhProfiles/get-activation-report`,
            null,
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
     * Creates an deactivation report for the given OntoMe profile and the given Geovistory project.
     * @param pkProject Geovistory project for which the deactivation report should be created
     * @param pkProfile OntoMe profile for which the deactivation report should be created
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dfhProfileGetDeactivationReport(pkProject: number, pkProfile: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<object>>;
    public dfhProfileGetDeactivationReport(pkProject: number, pkProfile: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<object>>>;
    public dfhProfileGetDeactivationReport(pkProject: number, pkProfile: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<object>>>;
    public dfhProfileGetDeactivationReport(pkProject: number, pkProfile: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileGetDeactivationReport.');
        }
        if (pkProfile === null || pkProfile === undefined) {
            throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileGetDeactivationReport.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkProfile !== undefined && pkProfile !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProfile, 'pkProfile');
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

        return this.httpClient.post<Array<object>>(`${this.configuration.basePath}/lb3-api/DfhProfiles/get-deactivation-report`,
            null,
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
     * Get all profiles that are used by the given project.
     * @param pkProject Project pk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dfhProfileOfProject(pkProject?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<DfhProfile>>;
    public dfhProfileOfProject(pkProject?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<DfhProfile>>>;
    public dfhProfileOfProject(pkProject?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<DfhProfile>>>;
    public dfhProfileOfProject(pkProject?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {

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


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<DfhProfile>>(`${this.configuration.basePath}/lb3-api/DfhProfiles/of-project`,
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
     * Pulls profile data including classes and properties from OntoMe and adds profile to project.
     * @param pkProject Geovistory project to which the OntoMe profile should be added
     * @param pkProfile OntoMe profile that should be added
     * @param requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is \&#39;en\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dfhProfileUpdateAndAddToProject(pkProject: number, pkProfile: number, requestedLanguage?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<object>>;
    public dfhProfileUpdateAndAddToProject(pkProject: number, pkProfile: number, requestedLanguage?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<object>>>;
    public dfhProfileUpdateAndAddToProject(pkProject: number, pkProfile: number, requestedLanguage?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<object>>>;
    public dfhProfileUpdateAndAddToProject(pkProject: number, pkProfile: number, requestedLanguage?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProject === null || pkProject === undefined) {
            throw new Error('Required parameter pkProject was null or undefined when calling dfhProfileUpdateAndAddToProject.');
        }
        if (pkProfile === null || pkProfile === undefined) {
            throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileUpdateAndAddToProject.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProject !== undefined && pkProject !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProject, 'pkProject');
        }
        if (pkProfile !== undefined && pkProfile !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProfile, 'pkProfile');
        }
        if (requestedLanguage !== undefined && requestedLanguage !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>requestedLanguage, 'requestedLanguage');
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

        return this.httpClient.post<Array<object>>(`${this.configuration.basePath}/lb3-api/DfhProfiles/update-from-ontome-and-add-to-project`,
            null,
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
     * Pulls profile data including classes and properties from OntoMe and updates profile data in geovistory.
     * @param pkProfile OntoMe profile that should be added
     * @param requestedLanguage Language ISO Code for the preferred language of labels and descriptions to be loaded. Default language is \&#39;en\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dfhProfileUpdateFromOntoMe(pkProfile: number, requestedLanguage?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<Array<object>>;
    public dfhProfileUpdateFromOntoMe(pkProfile: number, requestedLanguage?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpResponse<Array<object>>>;
    public dfhProfileUpdateFromOntoMe(pkProfile: number, requestedLanguage?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<HttpEvent<Array<object>>>;
    public dfhProfileUpdateFromOntoMe(pkProfile: number, requestedLanguage?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json' | 'application/xml' | 'text/xml' | 'application/javascript' | 'text/javascript'}): Observable<any> {
        if (pkProfile === null || pkProfile === undefined) {
            throw new Error('Required parameter pkProfile was null or undefined when calling dfhProfileUpdateFromOntoMe.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pkProfile !== undefined && pkProfile !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>pkProfile, 'pkProfile');
        }
        if (requestedLanguage !== undefined && requestedLanguage !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>requestedLanguage, 'requestedLanguage');
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

        return this.httpClient.post<Array<object>>(`${this.configuration.basePath}/lb3-api/DfhProfiles/update-from-ontome`,
            null,
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