import { Injectable } from '@angular/core';
import { SchemaObjectApi } from '@kleiolab/lib-sdk-lb3';
import { GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject } from 'rxjs';
import { SchemaObject } from '../../root/models/model';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { DfhActions } from '../actions/dfh.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SysActions } from '../actions/sys.actions';
import { TabActions } from '../actions/tab.actions';
import { WarActions } from '../actions/war.actions';

@Injectable({
  providedIn: 'root'
})
/**
 * Class to put schema objects into store
 */
export class SchemaService {

  schemaObjectStored$ = new Subject<GvSchemaObject>()

  constructor(
    public api: SchemaObjectApi,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public warActions: WarActions,
    public tabActions: TabActions,
    public dfhActions: DfhActions,
    public sysActions: SysActions,
    public notifications: NotificationsAPIActions,
  ) { }


  /**
   * watches an Observable<SchemaObject>
   * on success stores the parts of the object at right place of store
   * on error emits error message
   *
   * @param apiCall$
   * @param pkProject primary key of project or 'ofRepo', if repo versions
   */
  store(apiCall$: Observable<SchemaObject>, pkProject: number | 'ofRepo'): Observable<SchemaObject> {


    const s$ = new Subject<SchemaObject>()
    apiCall$.subscribe(
      result => {
        this.storeSchemaObject(result, pkProject === 'ofRepo' ? null : pkProject)
        s$.next(result)
      },
      error => {
        this.notifications.addToast({
          type: 'error',
          options: { title: error.message }
        })
        s$.error(error)
      }
    )
    return s$
  }

  /**
   * watches an Observable<SchemaObject>
   * on success stores the parts of the object at right place of store
   * on error emits error message
   *
   * @param apiCall$
   * @param pkProject primary key of project or 'ofRepo', if repo versions
   */
  storeGv(apiCall$: Observable<GvSchemaObject>, pkProject: number | 'ofRepo'): Observable<GvSchemaObject> {

    const s$ = new Subject<GvSchemaObject>()
    apiCall$.subscribe(
      result => {
        this.storeSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject)
        s$.next(result)
      },
      error => {
        this.notifications.addToast({
          type: 'error',
          options: { title: error.message }
        })
        s$.error(error)
      }
    )
    return s$
  }

  /**
   *
   * @param object
   * @param pkProject primary key of project or null, if repo versions
   */
  storeSchemaObject(object: SchemaObject, pkProject: number | null) {
    if (object && Object.keys(object).length > 0) {
      Object.keys(object).forEach(schema => {
        let actions;
        if (schema === 'inf') actions = this.infActions;
        else if (schema === 'pro') actions = this.proActions;
        else if (schema === 'dat') actions = this.datActions;
        else if (schema === 'war') actions = this.warActions;
        if (actions) {
          Object.keys(object[schema]).forEach(model => {
            actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
          });
        }
      });
    }
  }

  /**
   *
   * @param object
   * @param pkProject primary key of project or null, if repo versions
   */
  storeSchemaObjectGv(object: GvSchemaObject, pkProject: number | null) {
    if (object && Object.keys(object).length > 0) {
      Object.keys(object).forEach(schema => {
        let actions;
        if (schema === 'inf') actions = this.infActions;
        else if (schema === 'pro') actions = this.proActions;
        else if (schema === 'dat') actions = this.datActions;
        else if (schema === 'war') actions = this.warActions;
        else if (schema === 'tab') actions = this.tabActions;
        else if (schema === 'dfh') actions = this.dfhActions;
        else if (schema === 'sys') actions = this.sysActions;
        if (actions) {
          Object.keys(object[schema]).forEach(model => {
            actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
          });
        }
      });
      this.schemaObjectStored$.next(object)
    }
  }

}
