import { Injectable } from '@angular/core';
import { GvNegativeSchemaObject, GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { Observable, Subject } from 'rxjs';
import { SchemaActionsFactory, SucceedActionMeta } from '../../public-api';
import { SchemaObject } from '../../root/models/model';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatFacade } from '../dat/dat.facade';
import { InfFacade } from '../inf/inf.facade';
import { ProFacade } from '../pro/pro.facade';
import { WarFacade } from '../war/war.facade';
import { GvSchemaActions } from './schema.actions';

@Injectable({
  providedIn: 'root'
})
/**
 * Class to put schema objects into store
 */
export class SchemaService {

  schemaObjectStored$ = new Subject<GvPositiveSchemaObject>()

  constructor(
    private infFacade: InfFacade,
    private proFacade: ProFacade,
    private datFacade: DatFacade,
    private warFacade: WarFacade,
    private schemaActions: GvSchemaActions,
    private notifications: NotificationsAPIActions,
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
  storeGv(apiCall$: Observable<GvPositiveSchemaObject>, pkProject: number | 'ofRepo'): Observable<GvPositiveSchemaObject> {

    const s$ = new Subject<GvPositiveSchemaObject>()
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
 * watches an Observable<SchemaObject>
 * on success stores the parts of the object at right place of store
 * on error emits error message
 *
 * @param apiCall$
 * @param pkProject primary key of project or 'ofRepo', if repo versions
 */
  deleteGv(apiCall$: Observable<GvNegativeSchemaObject>, pkProject: number | 'ofRepo'): Observable<GvNegativeSchemaObject> {

    const s$ = new Subject<GvNegativeSchemaObject>()
    apiCall$.subscribe(
      result => {
        this.deleteSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject)
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
   * watches an Observable<GvSchemaModifier>
   * on success stores the parts of the object at right place of store
   * on error emits error message
   *
   * @param apiCall$
   * @param pkProject primary key of project or 'ofRepo', if repo versions
   */
  modifyGvSchema(apiCall$: Observable<GvSchemaModifier>, pkProject: number | 'ofRepo'): Observable<GvSchemaModifier> {

    const s$ = new Subject<GvSchemaModifier>();
    apiCall$.subscribe(
      result => {
        this.storeSchemaObjectGv(result.positive, pkProject === 'ofRepo' ? null : pkProject);
        this.deleteSchemaObjectGv(result.negative, pkProject === 'ofRepo' ? null : pkProject);
        s$.next(result);
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
        if (schema === 'inf') actions = this.infFacade;
        else if (schema === 'pro') actions = this.proFacade;
        else if (schema === 'dat') actions = this.datFacade;
        else if (schema === 'war') actions = this.warFacade;
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
  storeSchemaObjectGv(object: GvPositiveSchemaObject, pkProject: number | null) {

    this.schemaActions.storeGvSchemaModifier({ positive: object })

    this.schemaObjectStored$.next(object)
  }

  /**
 *
 * @param object
 * @param pkProject primary key of project or null, if repo versions
 */
  getStoreSchemaObjectGvAction(object: GvPositiveSchemaObject) {
    this.schemaObjectStored$.next(object)
    return this.schemaActions.storeGvSchemaModifierAction({ positive: object })
  }


  /**
   *
   * @param object
   * @param pkProject primary key of project or null, if repo versions
   */
  deleteSchemaObjectGv(object: GvNegativeSchemaObject, pkProject: number | null) {
    if (object && Object.keys(object).length > 0) {
      Object.keys(object).forEach(schema => {
        let actions;
        if (schema === 'dat') actions = this.datFacade;
        if (schema === 'inf') actions = this.infFacade;
        if (schema === 'pro') actions = this.proFacade;
        if (actions) {
          Object.keys(object[schema]).forEach(model => {
            const m: SchemaActionsFactory<any> = actions[model]
            m.deleteSucceeded(object[schema][model], undefined, pkProject);
          });
        }
      });
    }
  }

  /**
   * Returns an array of actions for model delete actions
   * @param object
   * @param pkProject primary key of project or null, if repo versions
   */
  getDeleteSchemaObjectGvActions(object: GvNegativeSchemaObject, pkProject: number | null):
    FluxStandardAction<any, SucceedActionMeta<any>>[] {
    const deleteActions: FluxStandardAction<any, SucceedActionMeta<any>>[] = []
    if (object && Object.keys(object).length > 0) {
      Object.keys(object).forEach(schema => {
        let actions;
        if (schema === 'dat') actions = this.datFacade;
        if (schema === 'inf') actions = this.infFacade;
        if (schema === 'pro') actions = this.proFacade;
        if (actions) {
          Object.keys(object[schema]).forEach(model => {
            const m: SchemaActionsFactory<any> = actions[model]
            deleteActions.push(m.deleteSucceededAction(object[schema][model], undefined, pkProject))
          });
        }
      });
    }
    return deleteActions
  }


}
