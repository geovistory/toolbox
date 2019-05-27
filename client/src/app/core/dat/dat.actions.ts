import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, DatDigital } from 'app/core';
import { StandardActionsFactory } from 'app/core/store/actions';
import { datRoot } from './dat.config';
import { DigitalSlice } from './dat.models';


@Injectable()
export class DatActions {
  digital = new StandardActionsFactory<DigitalSlice, DatDigital>(this.ngRedux).createCrudActions(datRoot, 'digital')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
