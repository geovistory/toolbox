import { DevToolsExtension, NgRedux, ObservableStore } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { ActiveProjectActions } from 'app/core/active-project';
import { INIT_SANDBOX_STATE, sandboxStateReducer } from 'app/core/store/reducers';
import { FluxStandardAction } from 'flux-standard-action';



@Component({
  selector: 'gv-init-state',
  templateUrl: './init-state.component.html',
  styleUrls: ['./init-state.component.scss']
})
export class InitStateComponent implements OnInit {

  static readonly INIT_STATE = 'InitState::INIT_STATE';

  /**
   * Inputs for root slices of the store
   */
  @Input() activeProject: any;

  /**
   * Input for the subStore slice used by the current sandboxState
   */
  @Input() sandboxState: any;

  initialized: boolean;
  localStore: ObservableStore<any>;

  constructor(
    private ngRedux: NgRedux<any>,
    private activeProjectActions: ActiveProjectActions,
    private devTools: DevToolsExtension,
  ) { }

  ngOnInit() {
    /**
     * Init root slices of the store using the rootReducer of StoreModule
     */
    if (this.activeProject) {
      this.ngRedux.dispatch({
       type: ActiveProjectActions.ACTIVE_PROJECT_UPDATED,
       payload: this.activeProject
      })
    }


    /**
     * Init fractal store
     */
    this.localStore = this.ngRedux.configureSubStore(['sandboxState'], sandboxStateReducer)
    this.localStore.dispatch({
      type: INIT_SANDBOX_STATE,
      payload: this.sandboxState
    } as FluxStandardAction<any>)


  }

}
