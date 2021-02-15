import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from "@kleiolab/lib-redux";
import { TabCell } from "@kleiolab/lib-sdk-lb4";
import { tabRoot } from './tab.config';
import { TabCellSlice } from './tab.models';
import { IAppState } from "@kleiolab/lib-redux";


@Injectable()
export class TabActions {

  cell = new SchemaActionsFactory<TabCellSlice, TabCell>(this.ngRedux).createCrudActions(tabRoot, 'cell')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
