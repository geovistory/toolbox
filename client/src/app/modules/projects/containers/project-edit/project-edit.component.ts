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
  projectId: number;
  project: ProjectDetail;

  // queryParamsSubsciption: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activeProjectService: ActiveProjectService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private location: Location
  ) {
    this.ngRedux.select<ProjectDetail>('activeProject').subscribe((project) => {
      this.project = project;
    })

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

      // // if information state is s100, set sources state to s0
      // if (this.informationState === 's100') this.informationGoToState100();

      // // if sources state is s100, set information state  to s0
      // if (this.sourcesState === 's100') this.sourcesGoToState100();

      // // if there is some error, set information state to s50
      // if (this.sourcesState === undefined) this.sourcesGoToState50();


    });
    this.projectId = activatedRoute.snapshot.parent.params['id'];

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
    this.activeProjectService.initProject(this.projectId)
    // trigger the activation of the project
    this.activeProjectService.initProjectCrm(this.projectId);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  // sourcesGoToState0() {
  //   // this.informationState = 's100';
  //   this.updateUrlQueryParams({ i: 's100', s: 's0' });
  // }
  // sourcesGoToState50() {
  //   // this.informationState = 's50';
  //   this.updateUrlQueryParams({ i: 's50', s: 's50' });
  // }
  // sourcesGoToState100() {
  //   // this.informationState = 's0';
  //   this.updateUrlQueryParams({ i: 's0', s: 's100' });
  // }
  // informationGoToState0() {
  //   // this.sourcesState = 's100';
  //   this.updateUrlQueryParams({ i: 's0', s: 's100' });
  // }
  // informationGoToState50() {
  //   // this.sourcesState = 's50';
  //   this.updateUrlQueryParams({ i: 's50', s: 's50' });
  // }
  // informationGoToState100() {
  //   // this.sourcesState = 's0';
  //   this.updateUrlQueryParams({ i: 's100', s: 's0' });
  // }
  updateUrlQueryParams(newParams) {
    // Object.assign is used as apparently
    // you cannot add properties to snapshot query params
    // const currentParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

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
