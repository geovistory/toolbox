import { Component, OnDestroy, Input, OnInit, HostBinding } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ActiveProjectService, ComQuery } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { QueryList, ComQueryList } from './api/query-list.models';
import { QueryListAPIEpics } from './api/query-list.epics';
import { QueryListAPIActions } from './api/query-list.actions';
import { queryListReducer } from './api/query-list.reducer';
import { first } from 'rxjs/operators';

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

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<QueryList>;

  // path to the substore
  basePath = ['queries'];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<ComQueryList>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: QueryListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  search() {
    this.p.pkProject$.pipe(first(pk => !!pk)).subscribe(pkProjekt => {

      // TODO make this infinit scroll like
      this.load(pkProjekt, 100, 0)
    })
  }

  open(pkEntity?: number) {

    this.p.addTab({
      active: true,
      component: 'query-detail',
      icon: 'query',
      pathSegment: 'queryDetails',
      data: { pkEntity }
    })
  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, queryListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.search();
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
