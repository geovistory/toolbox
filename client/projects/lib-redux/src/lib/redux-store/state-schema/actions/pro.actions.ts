
import { Injectable } from '@angular/core';
import { ProAnalysis, ProTableConfig, ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../root/models/model';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { proRoot } from '../reducer-configs/pro.config';


@Injectable({
  providedIn: 'root'
})
export class ProActions {
  analysis: SchemaActionsFactory<ProAnalysis>;
  table_config: SchemaActionsFactory<ProTableConfig>;
  text_property: SchemaActionsFactory<ProTextProperty>;

  constructor(public store: Store<IAppState>) {
    this.analysis = new SchemaActionsFactory(this.store, proRoot, 'analysis')
    this.table_config = new SchemaActionsFactory(this.store, proRoot, 'table_config');
    this.text_property = new SchemaActionsFactory(this.store, proRoot, 'text_property')
  }
}
