import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatClassColumnMapping, DatColumn, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models/model';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';


@Injectable({
  providedIn: 'root'
})
export class DatActions {

  digital = new SchemaActionsFactory(this.ngRedux, datRoot, 'digital')

  chunk = new SchemaActionsFactory<DatNamespace>(this.ngRedux, datRoot, 'chunk')

  column = new SchemaActionsFactory<DatColumn>(this.ngRedux, datRoot, 'column')

  class_column_mapping = new SchemaActionsFactory<DatClassColumnMapping>(this.ngRedux, datRoot, 'class_column_mapping')

  namespace = new SchemaActionsFactory<DatNamespace>(this.ngRedux, datRoot, 'namespace')

  text_property = new SchemaActionsFactory<DatTextProperty>(this.ngRedux, datRoot, 'text_property')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
