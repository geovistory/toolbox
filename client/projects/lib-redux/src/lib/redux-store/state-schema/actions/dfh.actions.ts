
import { Injectable } from '@angular/core';
import { DfhClass, DfhLabel, DfhProfile, DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../root/models/model';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { DfhClassSlice } from '../models/dfh.models';
import { dfhRoot } from '../reducer-configs/dfh.config';



type Payload = DfhClassSlice;

@Injectable({
  providedIn: 'root'
})
export class DfhActions {

  profile: SchemaActionsFactory<DfhProfile>;
  klass: SchemaActionsFactory<DfhClass>;
  property: SchemaActionsFactory<DfhProperty>;
  label: SchemaActionsFactory<DfhLabel>;

  constructor(public store: Store<IAppState>) {
    this.profile = new SchemaActionsFactory(this.store, dfhRoot, 'profile');
    this.klass = new SchemaActionsFactory(this.store, dfhRoot, 'klass');
    this.property = new SchemaActionsFactory(this.store, dfhRoot, 'property');
    this.label = new SchemaActionsFactory(this.store, dfhRoot, 'label');
  }

}
