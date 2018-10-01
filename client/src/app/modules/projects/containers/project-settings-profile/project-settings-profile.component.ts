import { NgRedux } from '@angular-redux/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActiveProjectService, IAppState, ProjectDetail } from 'app/core';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'gv-project-settings-profile',
  templateUrl: './project-settings-profile.component.html',
  styleUrls: ['./project-settings-profile.component.scss']
})
export class ProjectSettingsProfileComponent implements OnDestroy {

  destroy$ = new Subject<boolean>();

  project: ProjectDetail;
  projectLabel: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.ngRedux.select<ProjectDetail>('activeProject').takeUntil(this.destroy$).subscribe(p => this.project = p)
    this.ngRedux.select<string>(['activeProject', 'labels', '0', 'label']).takeUntil(this.destroy$).subscribe(p => this.projectLabel = p)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }


}

