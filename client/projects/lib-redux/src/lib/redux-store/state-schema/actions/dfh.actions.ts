
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhLabel, DfhProfile } from '@kleiolab/lib-sdk-lb3';
import { DfhClass, DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { FluxStandardAction } from 'flux-standard-action';
import { ActionResultObservable, LoadActionMeta, SchemaActionsFactory, SucceedActionMeta } from '../_helpers/schema-actions-factory';
import { filter } from 'rxjs/operators';
import { IAppState } from '../../root/models';
import { DfhClassSlice } from '../models';
import { dfhRoot } from '../reducer-configs';


export class DfhProfileActionFactory extends SchemaActionsFactory<Payload, DfhProfile> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<DfhProfile>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DfhProfileActionFactory {
    Object.assign(this, this.createCrudActions(dfhRoot, 'profile'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhProfileActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DfhProfile>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}


export class DfhClassActionFactory extends SchemaActionsFactory<Payload, DfhClass> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<DfhClass>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DfhClassActionFactory {
    Object.assign(this, this.createCrudActions(dfhRoot, 'klass'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhClassActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DfhClass>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}


export class DfhPropertyActionFactory extends SchemaActionsFactory<Payload, DfhProperty> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<DfhProperty>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DfhPropertyActionFactory {
    Object.assign(this, this.createCrudActions(dfhRoot, 'property'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhPropertyActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DfhProperty>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }

    return this;
  }
}

export class DfhLabelActionFactory extends SchemaActionsFactory<Payload, DfhLabel> {

  // Suffixes of load action types
  static readonly OF_PROJECT = 'OF_PROJECT';

  loadOfProject: (pkProject) => ActionResultObservable<DfhLabel>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DfhLabelActionFactory {
    Object.assign(this, this.createCrudActions(dfhRoot, 'label'))

    this.loadOfProject = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.OF_PROJECT,
        meta: {
          addPending,
          pk: pkProject
        },
        payload: null,
      };
      this.ngRedux.dispatch(action)
      return {
        pending$: this.ngRedux.select<boolean>(['pending', addPending]),
        resolved$: this.ngRedux.select<SucceedActionMeta<DfhLabel>>(['resolved', addPending]).pipe(filter(x => !!x)),
        key: addPending
      };
    }


    return this;
  }
}


type Payload = DfhClassSlice;

@Injectable()
export class DfhActions {


  profile = new DfhProfileActionFactory(this.ngRedux).createActions();
  klass = new DfhClassActionFactory(this.ngRedux).createActions();
  property = new DfhPropertyActionFactory(this.ngRedux).createActions();
  label = new DfhLabelActionFactory(this.ngRedux).createActions();

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
