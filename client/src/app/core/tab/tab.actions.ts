import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from 'app/core';
import { StandardActionsFactory } from 'app/core/redux-store/actions';
import { TabCell } from '../sdk-lb4';
import { tabRoot } from './tab.config';
import { TabCellSlice } from './tab.models';


@Injectable()
export class TabActions {

  cell = new StandardActionsFactory<TabCellSlice, TabCell>(this.ngRedux).createCrudActions(tabRoot, 'cell')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
