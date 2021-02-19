import { NgRedux } from '@angular-redux/store';
import { GvLoadSubfieldPageReq, GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable } from 'rxjs';
import { IAppState } from '../../root/models/model';
import { LoadActionMeta } from '../_helpers/schema-actions-factory';
export declare type GvSchemaObjectAction = FluxStandardAction<Observable<GvSchemaObject>, LoadActionMeta>;
interface GvPaginationObjectActionMeta extends LoadActionMeta {
    req: GvLoadSubfieldPageReq;
}
export declare type GvPaginationObjectAction = FluxStandardAction<null, GvPaginationObjectActionMeta>;
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
    loadGvPaginationObject(req: GvLoadSubfieldPageReq): void;
}
export {};
