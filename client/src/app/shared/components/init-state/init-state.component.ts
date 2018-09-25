import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, DevToolsExtension, ObservableStore } from '@angular-redux/store';
import { provideReduxForms } from '@angular-redux/form';
import dynamicMiddlewares from 'redux-dynamic-middlewares'
import { RootEpics } from '../../../core/store/epics';
import { FluxStandardAction } from 'flux-standard-action';


export const rootReducer = (lastState, action: FluxStandardAction<any>) => {
  if (action.type === InitStateComponent.INIT_STATE) {
    lastState = action.payload;
  }
  return lastState;
};



@Component({
  selector: 'gv-init-state',
  templateUrl: './init-state.component.html',
  styleUrls: ['./init-state.component.scss']
})
export class InitStateComponent implements OnInit {

  static readonly INIT_STATE = 'InitState::INIT_STATE';

  @Input() initState: any;

  initialized: boolean;
  localStore: ObservableStore<any>;

  constructor(
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension,
  ) { }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore([], rootReducer)
    this.localStore.dispatch({
      type: InitStateComponent.INIT_STATE,
      payload: this.initState
    } as FluxStandardAction<any>)

    // this.ngRedux.configureStore(
    //   // RootReducer
    //   rootReducer,
    //   // Initial state
    //   this.initState,
    //   // Middleware
    //   [
    //     dynamicMiddlewares
    //   ],
    //   // Enhancers
    //   this.devTools.isEnabled() ? [this.devTools.enhancer()] : []
    // );

    // // Enable syncing of Angular form state with our Redux store.
    // provideReduxForms(this.ngRedux);

    // this.initialized = true;
  }

}
