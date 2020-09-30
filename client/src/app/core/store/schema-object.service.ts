import { Injectable } from '@angular/core';
import { DatActions } from '../dat/dat.actions';
import { InfActions } from '../inf/inf.actions';
import { ProActions } from '../pro/pro.actions';
import { SchemaObject } from './model';
import { SchemaObjectApi } from '../sdk';
import { Observable, Subject } from 'rxjs';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { WarActions } from '../war/war.actions';
import { GvSchemaObject } from '../sdk-lb4';


@Injectable()
/**
 * Class to put schema objects into store
 */
export class SchemaObjectService {

  constructor(
    public api: SchemaObjectApi,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public warActions: WarActions,
    public notifications: NotificationsAPIActions
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
        if (actions) {
          Object.keys(object[schema]).forEach(model => {
            actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
          });
        }
      });
    }
  }

}
