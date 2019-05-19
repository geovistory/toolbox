import { Injectable } from '@angular/core';
import { StandardActionsFactory } from 'app/core/store/actions';
import { DfhClass, DfhLabel } from '../sdk';
import { ClassSlice } from './dfh.models';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/core';




type Payload = ClassSlice;

@Injectable()
export class DfhActions {

  label: StandardActionsFactory<Payload, DfhLabel>;
  klass: StandardActionsFactory<Payload, DfhClass>;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.label = new StandardActionsFactory<Payload, DfhLabel>(ngRedux, 'dfh', 'label').createActions();
    this.klass = new StandardActionsFactory<Payload, DfhClass>(ngRedux, 'dfh', 'class').createActions();
  }

}
