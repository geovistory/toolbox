import { Injectable } from '@angular/core';
import { DatClassColumnMapping, DatColumn, DatDigital, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../root/models/model';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { datRoot } from '../reducer-configs/dat.config';


@Injectable({
  providedIn: 'root'
})
export class DatActions {

  digital: SchemaActionsFactory<DatDigital>;

  chunk: SchemaActionsFactory<DatNamespace>;

  column: SchemaActionsFactory<DatColumn>;

  class_column_mapping: SchemaActionsFactory<DatClassColumnMapping>;

  namespace: SchemaActionsFactory<DatNamespace>;

  text_property: SchemaActionsFactory<DatTextProperty>;

  constructor(private store: Store<IAppState>) {
    this.digital = new SchemaActionsFactory(this.store, datRoot, 'digital')

    this.chunk = new SchemaActionsFactory<DatNamespace>(this.store, datRoot, 'chunk')

    this.column = new SchemaActionsFactory<DatColumn>(this.store, datRoot, 'column')

    this.class_column_mapping = new SchemaActionsFactory<DatClassColumnMapping>(this.store, datRoot, 'class_column_mapping')

    this.namespace = new SchemaActionsFactory<DatNamespace>(this.store, datRoot, 'namespace')

    this.text_property = new SchemaActionsFactory<DatTextProperty>(this.store, datRoot, 'text_property')
  }

}
