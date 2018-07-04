import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from 'app/core';
import { addMiddleware, removeMiddleware } from 'redux-dynamic-middlewares';
import { Observable } from 'rxjs';

import { ClassDetail } from '../../admin.models';
import { ClassAPIActions } from './api/class.actions';
import { ClassAPIEpics } from './api/class.epics';
import { classReducer } from './api/class.reducer';
import { ActivatedRoute } from '@angular/router';

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

  getBasePath = () => ['admin', 'classDetail'];

  localStore: ObservableStore<ClassDetail>

  reduxMiddleware;

  @select() items$: Observable<any>;

  constructor(
    private epics: ClassAPIEpics,
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super()

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), classReducer)

    this.reduxMiddleware = this.epics.createEpic(this.localStore)
    addMiddleware(this.reduxMiddleware)

    const pkClass = this.activatedRoute.snapshot.params['id'];
    this.loadClassDetails(pkClass)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    removeMiddleware(this.reduxMiddleware)
  }
}
