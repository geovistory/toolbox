
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../root/models/model';
import { proRoot } from '../reducer-configs/pro.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';


@Injectable({
  providedIn: 'root'
})
export class ProActions {
  analysis = new SchemaActionsFactory(this.ngRedux, proRoot, 'analysis')
  table_config = new SchemaActionsFactory(this.ngRedux, proRoot, 'table_config');
  text_property = new SchemaActionsFactory(this.ngRedux, proRoot, 'text_property')
  constructor(public ngRedux: NgRedux<IAppState>) { }
}
