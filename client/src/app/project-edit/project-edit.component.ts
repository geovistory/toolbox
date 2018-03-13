import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ActiveProjectService } from '../shared/services/active-project.service';
import { Project } from '../shared/sdk/models/Project';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  informationState: string;
  sourcesState: string;
  queryParams;
  projectId: number;
  project: Project;

  queryParamsSubsciption: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activeProjectService: ActiveProjectService,
    private router: Router,
    private location: Location
  ) {
    this.activeProjectService.onProjectChange().subscribe((project: Project) => {
      this.project = project;
    })
    this.queryParamsSubsciption = activatedRoute.queryParams.subscribe(queryParams => {

      this.informationState = queryParams['i']; // gets url part ?i='s100'
      this.sourcesState = queryParams['s']; // gets url part ?i='s100'

      //if information state is s100, set sources state to s0
      if (this.informationState === 's100') this.informationGoToState100();

      //if sources state is s100, set information state  to s0
      if (this.sourcesState === 's100') this.sourcesGoToState100();

      //if there is some error, set information state to s50
      if (this.sourcesState === undefined) this.sourcesGoToState50();


    });
    this.projectId = activatedRoute.snapshot.parent.params['id'];

  }

  ngOnInit() {
    this.activeProjectService.setActiveProject(this.projectId)
  }

  ngOnDestroy() {
    // this.queryParamsSubsciption.unsubscribe();
  }


  sourcesGoToState0() {
    this.informationState = 's100';
    this.updateUrlQueryParams({ i: 's100', s: 's0' });
  }
  sourcesGoToState50() {
    this.informationState = 's50';
    this.updateUrlQueryParams({ i: 's50', s: 's50' });
  }
  sourcesGoToState100() {
    this.informationState = 's0';
    this.updateUrlQueryParams({ i: 's0', s: 's100' });
  }
  informationGoToState0() {
    this.sourcesState = 's100';
    this.updateUrlQueryParams({ i: 's0', s: 's100' });
  }
  informationGoToState50() {
    this.sourcesState = 's50';
    this.updateUrlQueryParams({ i: 's50', s: 's50' });
  }
  informationGoToState100() {
    this.sourcesState = 's0';
    this.updateUrlQueryParams({ i: 's100', s: 's0' });
  }
  updateUrlQueryParams(newParams) {
    // Object.assign is used as apparently
    // you cannot add properties to snapshot query params
    const currentParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

    // Generate the URL:
    let url = this.router.createUrlTree([], { queryParams: Object.assign(currentParams, newParams) }).toString();

    // Change the URL without navigate:
    this.location.go(url);

  }
}
