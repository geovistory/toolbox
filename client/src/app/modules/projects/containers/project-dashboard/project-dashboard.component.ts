import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Project, ProjectApi, ActiveProjectService, InfPersistentItemApi, IAppState, ProjectDetail } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { Subject } from 'rxjs';

@Component({
  selector: 'gv-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  project: ProjectDetail;
  id: number;

  // Statistics
  dataUnitsCount: number;

  // Tour logic
  activeSlideId: string;
  steps = {
    'step1': false,
    'step2': false,
    'step3': false,
    'step4': false,
    'step5': false
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private activeProjectService: ActiveProjectService,
    private ngRedux: NgRedux<IAppState>,
    private persistentItemVersionApi: InfPersistentItemApi,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.id = activatedRoute.snapshot.parent.params['id'];

    this.activeProjectService.initProject(this.id);

    this.ngRedux.select<ProjectDetail>('activeProject')
      .takeUntil(this.destroy$).subscribe(p => this.project = p)

  }

  ngOnInit() {
    this.startLoading();

    this.persistentItemVersionApi.searchInProject(this.id, '', 1, 1)
      .subscribe(
        (response) => {
          this.dataUnitsCount = parseInt(response.totalCount, 10);
          this.completeLoading();
        },
        error => {
          this.resetLoading()
        }
      );

  }

  ngOnDestroy(): void {

  }

  activateStep(stepId: string) {
    // deactivate all
    for (const key in this.steps) {
      if (this.steps[key]) this.steps[key] = false;
    }

    // activate step
    if (this.steps.hasOwnProperty(stepId)) {
      this.steps[stepId] = true;
      this.activeSlideId = stepId;
    }
  }
  stopTour() {
    this.activateStep('');
    this.activeSlideId = undefined;
  }

  onSlide(event) {
    this.activateStep(event.current);
  }



  /**
   * Loading Bar Logic
   */

  startLoading() {
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.slimLoadingBarService.reset();
  }
}
