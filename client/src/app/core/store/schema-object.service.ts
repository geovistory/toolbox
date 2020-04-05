import { Injectable } from '@angular/core';
import { DatActions } from '../dat/dat.actions';
import { InfActions } from '../inf/inf.actions';
import { ProActions } from '../pro/pro.actions';
import { SchemaObject } from './model';
import { SchemaObjectApi } from '../sdk';
import { Observable } from 'rxjs';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { WarActions } from '../war/war.actions';


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
   */
  store(apiCall$: Observable<SchemaObject>, pkProject) {
    return new Observable((resolver) => {
      apiCall$.subscribe(
        result => {
          this.storeSchemaObject(result, pkProject)
          resolver.next()
        },
        error => {
          this.notifications.addToast({
            type: 'error',
            options: { title: error.message }
          })
          resolver.error()
        }
      )
    })
  }


  storeSchemaObject(schemas: SchemaObject, pkProject) {
    if (schemas && Object.keys(schemas).length > 0) {
      Object.keys(schemas).forEach(schema => {
        let actions;
        if (schema === 'inf') actions = this.infActions;
        else if (schema === 'pro') actions = this.proActions;
        else if (schema === 'dat') actions = this.datActions;
        else if (schema === 'war') actions = this.warActions;
        if (actions) {
          Object.keys(schemas[schema]).forEach(model => {
            actions[model].loadSucceeded(schemas[schema][model], undefined, pkProject);
          });
        }
      });
    }
  }

}
