import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription, Observable, Subject } from 'rxjs';
import { ActiveProjectService, Project, IAppState, ProjectDetail } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { filter, map } from 'rxjs/operators';

type ProjectEditPanelState = 's0' | 's50' | 's100';

@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  informationState$: Observable<ProjectEditPanelState>;
  sourcesState$: Observable<ProjectEditPanelState>;
  queryParams;
  projectLabel$: Observable<string>;

  // queryParamsSubsciption: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activeProjectService: ActiveProjectService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private location: Location
  ) {

    this.projectLabel$ = this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']);

    this.informationState$ = activatedRoute.queryParams.pipe(
      map(params => this.calculatePanelState('i', params))
    )

    this.sourcesState$ = activatedRoute.queryParams.pipe(
      map(params => this.calculatePanelState('s', params))
    )

    activatedRoute.queryParams.takeUntil(this.destroy$).subscribe(queryParams => {

      const i = queryParams['i']; // gets url part ?i='s100'
      const s = queryParams['s']; // gets url part ?i='s100'
      if (this.howManyPanelsAreOn(queryParams) === 0) {
        this.updateUrlQueryParams({ 'i': 'on', 's': 'on' })
      } else {

        if (!i) this.updateUrlQueryParams({ 'i': 'off' })
        if (!s) this.updateUrlQueryParams({ 's': 'off' })
      }

    });

  }

  private calculatePanelState(queryParam: string, params): ProjectEditPanelState {
    if (params[queryParam] === 'off') return 's0';
    if (this.howManyPanelsAreOn(params) >= 2) return 's50';
    else return 's100';
  }
  private howManyPanelsAreOn(params): number {
    return [params.i, params.s].filter(p => p === 'on').length
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


 
  updateUrlQueryParams(newParams) {
 
    // Generate the URL:
    let urlTree = this.router.parseUrl(this.router.url);
    urlTree = {
      ...urlTree,
      queryParams: {
        ...urlTree.queryParams,
        ...newParams
      }
    }
    // Change the URL:
    this.router.navigateByUrl(this.router.serializeUrl(urlTree))
    // this.location.go(url);

  }
}
