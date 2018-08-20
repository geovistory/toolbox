import { NgRedux, ObservableStore, select, WithSubStore, select$ } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState, U, ComConfig } from 'app/core';
import { addMiddleware, removeMiddleware } from 'redux-dynamic-middlewares';
import { Observable, Subject } from 'rxjs';

import { ClassDetail, Container, Widget } from '../../admin.models';
import { ClassAPIActions } from './api/class.actions';
import { ClassAPIEpics } from './api/class.epics';
import { classReducer } from './api/class.reducer';
import { ActivatedRoute } from '@angular/router';
import { RootEpics } from '../../../../core/store/epics';

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

  public readonly PK_UI_CONTEXT_EDITABLE = ComConfig.PK_UI_CONTEXT_EDITABLE;
  public readonly PK_UI_CONTEXT_CREATE = ComConfig.PK_UI_CONTEXT_CREATE;


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
    this.loadClassDetails(pkClass, ComConfig.PK_UI_CONTEXT_EDITABLE)
  }

  getBasePath = () => ['admin', 'classDetail'];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.until$.next(true)
    this.until$.unsubscribe();
  }
}
