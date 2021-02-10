import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { StandardActionsFactory } from 'projects/toolbox/src/app/core/redux-store/actions';
import { TabCell } from '../sdk-lb4';
import { tabRoot } from './tab.config';
import { TabCellSlice } from './tab.models';
import { IAppState } from '../redux-store/model';


@Injectable()
export class TabActions {

  cell = new StandardActionsFactory<TabCellSlice, TabCell>(this.ngRedux).createCrudActions(tabRoot, 'cell')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
