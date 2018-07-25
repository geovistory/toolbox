import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { provideReduxForms } from '@angular-redux/form';
import dynamicMiddlewares from 'redux-dynamic-middlewares'


export const rootReducer = (lastState, action) => {
  return lastState;
};



@Component({
  selector: 'gv-init-state',
  templateUrl: './init-state.component.html',
  styleUrls: ['./init-state.component.scss']
})
export class InitStateComponent implements OnInit {

  @Input() initState: any;

  initialized: boolean;

  constructor(
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension,
  ) { }

  ngOnInit() {
    this.ngRedux.configureStore(
      // RootReducer
      rootReducer,
      // Initial state
      this.initState,
      // Middleware
      [
        dynamicMiddlewares
      ],
      // Enhancers
      this.devTools.isEnabled() ? [this.devTools.enhancer()] : []
    );

    // Enable syncing of Angular form state with our Redux store.
    provideReduxForms(this.ngRedux);

    this.initialized = true;
  }

}
