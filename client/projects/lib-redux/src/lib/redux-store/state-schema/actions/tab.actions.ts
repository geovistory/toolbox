import { Injectable } from '@angular/core';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../root/models/model';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { tabRoot } from '../reducer-configs/tab.config';


@Injectable({
  providedIn: 'root'
})
export class TabActions {

  cell: SchemaActionsFactory<TabCell>;

  constructor(public store: Store<IAppState>) {
    this.cell = new SchemaActionsFactory<TabCell>(this.store, tabRoot, 'cell')
  }

}
