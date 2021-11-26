
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../root/models/model';
import { DfhClassSlice } from '../models/dfh.models';
import { dfhRoot } from '../reducer-configs/dfh.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';



type Payload = DfhClassSlice;

@Injectable({
  providedIn: 'root'
})
export class DfhActions {


  profile = new SchemaActionsFactory(this.ngRedux, dfhRoot, 'profile');
  klass = new SchemaActionsFactory(this.ngRedux, dfhRoot, 'klass');
  property = new SchemaActionsFactory(this.ngRedux, dfhRoot, 'property');
  label = new SchemaActionsFactory(this.ngRedux, dfhRoot, 'label');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
