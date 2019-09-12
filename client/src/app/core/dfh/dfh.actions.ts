
import {filter} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StandardActionsFactory, ActionResultObservable, SucceedActionMeta, LoadActionMeta } from 'app/core/store/actions';
import { DfhClass, DfhLabel, DfhPropertyProfileView } from '../sdk';
import { DfhClassSlice } from './dfh.models';
import { NgRedux } from '@angular-redux/store';
import { IAppState, U } from 'app/core';
import { dfhRoot } from './dfh.config';
import { FluxStandardAction } from '../../../../node_modules/flux-standard-action';
import { DfhPropertyView } from '../sdk/models/DfhPropertyView';



export class DfhClassActionFactory extends StandardActionsFactory<Payload, DfhClass> {

  // Suffixes of load action types
  static readonly CLASSES_OF_PROJECT_PROFILE = 'CLASSES_OF_PROJECT_PROFILE';

  loadClassesOfProjectProfiles: (pkProject) => ActionResultObservable<DfhClass>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DfhClassActionFactory {
    Object.assign(this, this.createCrudActions(dfhRoot, 'klass'))

    this.loadClassesOfProjectProfiles = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhClassActionFactory.CLASSES_OF_PROJECT_PROFILE,
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

export class DfhLabelActionFactory extends StandardActionsFactory<Payload, DfhLabel> {

  // Suffixes of load action types
  static readonly LABELS_OF_CLASSES = 'LABELS_OF_CLASSES';
  static readonly LABELS_OF_PROPERTIES = 'LABELS_OF_PROPERTIES';

  loadLabelesOfClasses: (pkProject) => ActionResultObservable<DfhLabel>;
  loadLabelesOfProperties: (pkProject) => ActionResultObservable<DfhLabel>;

  constructor(public ngRedux: NgRedux<IAppState>) { super(ngRedux) }

  createActions(): DfhLabelActionFactory {
    Object.assign(this, this.createCrudActions(dfhRoot, 'label'))

    this.loadLabelesOfClasses = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.LABELS_OF_CLASSES,
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
    this.loadLabelesOfProperties = (pkProject: number) => {
      const addPending = U.uuid()
      const action: FluxStandardAction<Payload, LoadActionMeta> = {
        type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DfhLabelActionFactory.LABELS_OF_PROPERTIES,
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


  label = new DfhLabelActionFactory(this.ngRedux).createActions();
  klass = new DfhClassActionFactory(this.ngRedux).createActions();
  property_profile_view = new StandardActionsFactory<Payload, DfhPropertyProfileView>(this.ngRedux).createCrudActions(dfhRoot, 'property_profile_view');
  property_view = new StandardActionsFactory<Payload, DfhPropertyView>(this.ngRedux).createCrudActions(dfhRoot, 'property_view');

  constructor(public ngRedux: NgRedux<IAppState>) { }

}
