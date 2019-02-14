import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ActiveProjectService } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { QueryList } from './api/query-list.models';
import { QueryListAPIEpics } from './api/query-list.epics';
import { QueryListAPIActions } from './api/query-list.actions';
import { queryListReducer } from './api/query-list.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: queryListReducer
})
@Component({
  selector: 'gv-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css']
})
export class QueryListComponent extends QueryListAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<QueryList>;

  // path to the substore
  basePath = ['queries'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: QueryListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  open() {
    this.p.addTab({
      active: true,
      component: 'query-detail',
      icon: 'query',
      pathSegment: 'queryDetails'
    })
  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, queryListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
