import { NgRedux } from '@angular-redux/store';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, ComQueryByPk, IAppState, U, ProQuery, latestEntityVersions } from 'app/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'gv-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit, OnDestroy {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  loading$: Observable<boolean>;
  items$: Observable<ProQuery[]>;

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService
  ) {

    this.items$ = p.comQueryVersionsByPk$.pipe(
      latestEntityVersions()
    );
    this.loading$ = p.comQueryLoading$;
  }


  search() {
    this.p.loadQueries();
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
    this.search();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
