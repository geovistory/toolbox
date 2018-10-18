import { DevToolsExtension, NgRedux, ObservableStore } from '@angular-redux/store';
import { Component, Input, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActiveProjectActions, ActiveProjectService } from 'app/core/active-project';
import { INIT_SANDBOX_STATE, sandboxStateReducer } from 'app/core/store/reducers';
import { FluxStandardAction } from 'flux-standard-action';
import { Subject, timer, Observable, combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'gv-init-state',
  templateUrl: './init-state.component.html',
  styleUrls: ['./init-state.component.scss']
})
export class InitStateComponent implements OnInit, AfterViewInit, OnDestroy {

  static readonly INIT_STATE = 'InitState::INIT_STATE';

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  /**
   * Inputs for root slices of the store
   */
  @Input() activeProject: any;

  /**
   * If a number is set, load the project including crm from api
   */
  @Input() projectFromApi: number;

  /**
   * Input for the subStore slice used by the current sandboxState
   */
  @Input() sandboxState: any;

  @Output() ok = new EventEmitter();

  initialized: boolean;
  localStore: ObservableStore<any>;

  waitForAll: Observable<any>[] = [];

  constructor(
    private ngRedux: NgRedux<any>,
    private activeProjectService: ActiveProjectService
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

    if (this.sandboxState) {
      this.localStore.dispatch({
        type: INIT_SANDBOX_STATE,
        payload: this.sandboxState
      } as FluxStandardAction<any>)

      // const sandboxStateInit = new Subject<boolean>();

      // this.waitForAll.push(sandboxStateInit)

      // this.localStore.select('').pipe(
      //   // first(c => (!!c && c != {})),
      //   takeUntil(this.destroy$)
      // ).subscribe(ok => {
      //   sandboxStateInit.next(true)
      // })
    }

    /**
     * Init project with api call
     */
    if (this.projectFromApi) {
      this.activeProjectService.initProject(this.projectFromApi);
      this.activeProjectService.initProjectCrm(this.projectFromApi);
      const crmLoaded = new Subject<boolean>();
      this.waitForAll.push(crmLoaded)

      this.ngRedux.select(['activeProject', 'crm', 'classes']).pipe(
        first(c => !!c),
        takeUntil(this.destroy$)
      ).subscribe(ok => {
        crmLoaded.next(true)
      })
    }

    this.waitForAll.push(timer(100))

  }

  ngAfterViewInit() {

    combineLatest(this.waitForAll).subscribe(ok => {
      this.initialized = true;
      this.ok.emit()
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
