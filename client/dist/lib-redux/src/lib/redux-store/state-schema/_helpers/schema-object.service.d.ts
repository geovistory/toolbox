import { SchemaObjectApi } from '@kleiolab/lib-sdk-lb3';
import { GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { SchemaObject } from '../../root/models/model';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { DatActions, DfhActions, InfActions, ProActions, SysActions, TabActions, WarActions } from '../actions';
export declare class SchemaObjectService {
    api: SchemaObjectApi;
    infActions: InfActions;
    proActions: ProActions;
    datActions: DatActions;
    warActions: WarActions;
    tabActions: TabActions;
    dfhActions: DfhActions;
    sysActions: SysActions;
    notifications: NotificationsAPIActions;
    constructor(api: SchemaObjectApi, infActions: InfActions, proActions: ProActions, datActions: DatActions, warActions: WarActions, tabActions: TabActions, dfhActions: DfhActions, sysActions: SysActions, notifications: NotificationsAPIActions);
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    store(apiCall$: Observable<SchemaObject>, pkProject: number | 'ofRepo'): Observable<SchemaObject>;
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    storeGv(apiCall$: Observable<GvSchemaObject>, pkProject: number | 'ofRepo'): Observable<GvSchemaObject>;
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    storeSchemaObject(object: SchemaObject, pkProject: number | null): void;
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    storeSchemaObjectGv(object: GvSchemaObject, pkProject: number | null): void;
}
