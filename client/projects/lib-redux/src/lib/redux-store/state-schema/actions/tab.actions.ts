import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models/model';
import { tabRoot } from '../reducer-configs/tab.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';


@Injectable({
  providedIn: 'root'
})
export class TabActions {

  cell = new SchemaActionsFactory<TabCell>(this.ngRedux, tabRoot, 'cell')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
