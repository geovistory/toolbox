import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models/model';
import { TabCellSlice } from '../models/tab.models';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { tabRoot } from '../reducer-configs/tab.config';


@Injectable()
export class TabActions {

  cell = new SchemaActionsFactory<TabCellSlice, TabCell>(this.ngRedux).createCrudActions(tabRoot, 'cell')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
