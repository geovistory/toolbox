import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, DatDigital } from 'app/core';
import { StandardActionsFactory } from 'app/core/store/actions';
import { datRoot } from './dat.config';
import { DigitalSlice, NamespaceSlice } from './dat.models';
import { DatNamespace } from '../sdk';


@Injectable()
export class DatActions {
  digital = new StandardActionsFactory<DigitalSlice, DatDigital>(this.ngRedux).createCrudActions(datRoot, 'digital')
  namespace = new StandardActionsFactory<NamespaceSlice, DatNamespace>(this.ngRedux).createCrudActions(datRoot, 'namespace')

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
