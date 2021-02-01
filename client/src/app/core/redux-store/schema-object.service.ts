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
import { EntityPreviewSocket } from '../sockets/sockets.module';
import { TabActions } from '../tab/tab.actions';
import { DfhActions } from '../dfh/dfh.actions';


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
    public tabActions: TabActions,
    public dfhActions: DfhActions,
    public notifications: NotificationsAPIActions,
    private entityPreviewSocket: EntityPreviewSocket
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
        if (actions) {
          Object.keys(object[schema]).forEach(model => {
            actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
          });
        }
      });
      this.extendEntityPreviewStream(object, pkProject);
    }
  }

  /**
   * Adds the entity previews to the streamed entity previews (for ws communication)
   * @param object
   * @param pkProject
   */
  private extendEntityPreviewStream(object: GvSchemaObject, pkProject: number) {
    if (object && object.war && object.war.entity_preview && object.war.entity_preview.length) {
      this.entityPreviewSocket.emit('extendStream', {
        pkProject,
        pks: object.war.entity_preview.map(p => p.pk_entity)
      });
    }
  }
}
