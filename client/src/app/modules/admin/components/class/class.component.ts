import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComConfig, IAppState } from 'app/core';
import { Observable, Subject } from 'rxjs';
import { RootEpics } from '../../../../core/store/epics';
import { ClassDetail, Container } from '../../admin.models';
import { ClassAPIActions } from './api/class.actions';
import { ClassAPIEpics } from './api/class.epics';
import { classReducer } from './api/class.reducer';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classReducer
})
@Component({
  selector: 'gv-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent extends ClassAPIActions implements OnInit, OnDestroy {

  public readonly PK_UI_CONTEXT_ADD = ComConfig.PK_UI_CONTEXT_ADD;
  public readonly PK_UI_CONTEXT_DATAUNITS_EDITABLE = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
  public readonly PK_UI_CONTEXT_DATAUNITS_CREATE = ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

  public readonly PK_UI_CONTEXT_SOURCES_EDITABLE = ComConfig.PK_UI_CONTEXT_SOURCES_EDITABLE;
  public readonly PK_UI_CONTEXT_SOURCES_CREATE = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;
  public readonly PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE = ComConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE;
  public readonly PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE = ComConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE;


  localStore: ObservableStore<ClassDetail>

  reduxMiddleware;

  @select() class$: Observable<any>;
  @select() containerDisabled$: Observable<Container>;

  // emits when subscriptions to epic should be stopped
  until$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private rootEpics: RootEpics,
    private epics: ClassAPIEpics,
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super()

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), classReducer)

    this.rootEpics.addEpic(this.epics.createEpic(this.localStore, this.until$))

    const pkClass = this.activatedRoute.snapshot.params['pk_class'];
    this.loadClassDetails(pkClass, ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE)
  }

  getBasePath = () => ['admin', 'classDetail'];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.until$.next(true)
    this.until$.unsubscribe();
  }
}
