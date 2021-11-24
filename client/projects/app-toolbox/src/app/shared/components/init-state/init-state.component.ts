import { NgRedux, ObservableStore } from '@angular-redux/store';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAppState, SchemaService, SET_APP_STATE } from '@kleiolab/lib-redux';
import { GvPaginationObject, GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { combineLatest, Observable, of, Subject, timer } from 'rxjs';
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

  // /**
  //  * Inputs for root slices of the store
  //  */
  // @Input() activeProject: any;

  /**
   * If a number is set, load the project including crm from api
   */
  @Input() projectFromApi: number;

  /**
   * Input for the subStore slice used by the current sandboxState
   */
  @Input() sandboxState: any;
  @Input() initState: IAppState

  @Input() schemaObjects: GvPositiveSchemaObject[]
  @Input() paginationObjects: GvPaginationObject[]

  @Output() ok = new EventEmitter();

  initialized: boolean;
  localStore: ObservableStore<any>;

  waitForAll: Observable<any>[] = [];

  constructor(
    private ngRedux: NgRedux<any>,
    public p: ActiveProjectService,
    private schemaService: SchemaService
  ) { }

  ngOnInit() {

    // /**
    //  * Init root slices of the store using the rootReducer of StoreModule
    //  */
    // if (this.activeProject) {
    //   this.ngRedux.dispatch({
    //     type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
    //     payload: this.activeProject
    //   })
    // }


    /**
     * Init fractal store
     */
    // this.localStore = this.ngRedux.configureSubStore(['sandboxState'], sandboxStateReducer)

    // if (this.sandboxState) {
    //   this.localStore.dispatch({
    //     type: INIT_SANDBOX_STATE,
    //     payload: this.sandboxState
    //   } as FluxStandardAction<any>)

    //   // const sandboxStateInit = new Subject<boolean>();

    //   // this.waitForAll.push(sandboxStateInit)

    //   // this.localStore.select('').pipe(
    //   //   // first(c => (!!c && c != {})),
    //   //   takeUntil(this.destroy$)
    //   // ).subscribe(ok => {
    //   //   sandboxStateInit.next(true)
    //   // })
    // }

    if (this.initState) {
      this.ngRedux.dispatch({
        type: SET_APP_STATE,
        payload: this.initState
      })
    }
    /**
     * Init project with api call
     */
    if (this.projectFromApi) {
      this.p.initProject(this.projectFromApi);
      this.p.initProjectConfigData(this.projectFromApi);
      const configLoaded = new Subject<boolean>();
      this.waitForAll.push(configLoaded)

      this.ngRedux.select(['activeProject', 'configDataInitialized']).pipe(
        first(c => !!c),
        takeUntil(this.destroy$)
      ).subscribe(ok => {
        configLoaded.next(true)
      })
    }

    this.waitForAll.push(timer(100))

    if (this.schemaObjects) {
      this.schemaObjects.forEach(item => {
        this.schemaService.storeSchemaObjectGv(item, 0)
      })
    }
    if (this.paginationObjects) {
      this.paginationObjects.forEach(item => {
        this.schemaService.schemaActions.loadGvPaginationObject(of(item))
      })
    }
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
