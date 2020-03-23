import { Injectable } from '@angular/core';
import { DatActions } from '../dat/dat.actions';
import { InfActions } from '../inf/inf.actions';
import { ProActions } from '../pro/pro.actions';
import { SchemaObject } from './model';

@Injectable()
/**
 * Class to put schema objects into store
 */
export class SchemaObjectService {

  constructor(public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions, ) { }

  storeSchemaObject(schemas: SchemaObject, pkProject) {
    if (schemas && Object.keys(schemas).length > 0) {
      Object.keys(schemas).forEach(schema => {
        let actions;
        if (schema === 'inf') actions = this.infActions;
        else if (schema === 'pro') actions = this.proActions;
        else if (schema === 'dat') actions = this.datActions;
        if (actions) {
          Object.keys(schemas[schema]).forEach(model => {
            actions[model].loadSucceeded(schemas[schema][model], undefined, pkProject);
          });
        }
      });
    }
  }

}
