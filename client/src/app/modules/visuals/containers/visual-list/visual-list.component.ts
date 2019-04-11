import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, ComVisual, IAppState, latestEntityVersions } from 'app/core';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'gv-visual-list',
  templateUrl: './visual-list.component.html',
  styleUrls: ['./visual-list.component.css']
})
export class VisualListComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  items$: Observable<ComVisual[]>;
  loading$: Observable<boolean>;

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService
  ) {
    this.items$ = p.comVisualVersionsByPk$.pipe(
      latestEntityVersions()
    );
    this.loading$ = p.comVisualLoading$;
  }


  search() {
    this.p.loadVisuals();
  }


  open(pkEntity?: number) {
    this.p.addTab({
      active: true,
      component: 'visual-detail',
      icon: 'visual',
      pathSegment: 'visualDetails',
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
