import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassListAPIActions } from './api/class-list.actions';
import { WithSubStore, NgRedux, ObservableStore, select } from '@angular-redux/store';
import { classListReducer } from './api/class-list.reducer';
import { IAppState } from '../../../../core';
import { addMiddleware, removeMiddleware } from 'redux-dynamic-middlewares'
import { ClassListAPIEpics } from './api/class-list.epics';
import { ClassList } from '../../admin.models';
import { Observable } from 'rxjs';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classListReducer
})
@Component({
  selector: 'gv-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent extends ClassListAPIActions implements OnInit, OnDestroy {

  getBasePath = () => ['admin', 'classList'];

  localStore: ObservableStore<ClassList>

  reduxMiddleware;

  @select() items$:Observable<any>;

  constructor(
    private epics: ClassListAPIEpics,
    private ngRedux: NgRedux<IAppState>
  ) {
    super()

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), classListReducer)

    this.reduxMiddleware = this.epics.createEpic(this.localStore)
    addMiddleware(this.reduxMiddleware)

    this.loadClasses()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    removeMiddleware(this.reduxMiddleware)
  }

}
