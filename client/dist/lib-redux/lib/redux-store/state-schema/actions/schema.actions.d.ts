import { NgRedux } from '@angular-redux/store';
import { GvPaginationObject, GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { IAppState } from '../../root/models/model';
import { LoadActionMeta } from '../_helpers/schema-actions-factory';
import { LoadPaginatedStatementListMeta } from './inf.actions';
export declare type GvSchemaObjectAction = FluxStandardAction<Observable<GvSchemaObject>, LoadActionMeta>;
export declare type GvPaginationObjectAction = FluxStandardAction<Observable<GvPaginationObject>, LoadPaginatedStatementListMeta>;
/**
 * Class for actions that handle the loading of schema objects,
 * negative schema objects ect.
 */
export declare class GvSchemaActions {
    private ngRedux;
    static readonly GV_SCHEMA_OBJECT_LOAD = "GV_SCHEMA_OBJECT::LOAD";
    static readonly GV_PAGINATION_OBJECT_LOAD = "GV_PAGINATION_OBJECT::LOAD";
    constructor(ngRedux: NgRedux<IAppState>);
    /**
     * Action for loading GvSchemaObject into the store
     * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
     *                we'll end up with two subscriptions and thus two api calls
     */
    loadGvSchemaObject(apiCall$: Observable<GvSchemaObject>): void;
    /**
   * Action for loading GvPaginationObject into the store
   * @param apiCall$ Pass in the api call. Don't subscribe to the call, since otherwise
   *                we'll end up with two subscriptions and thus two api calls
   */
    loadGvPaginationObject(apiCall$: Observable<GvPaginationObject>, meta: Omit<LoadPaginatedStatementListMeta, 'addPending'>): void;
}
