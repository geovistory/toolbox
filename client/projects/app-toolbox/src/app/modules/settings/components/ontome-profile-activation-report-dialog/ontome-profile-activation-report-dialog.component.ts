import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { OntoMeControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export interface OntomeProfileActivationReportDialogData {
  pkProject: number
  profileId: number
  profileLabel: string
}

@Component({
  selector: 'gv-ontome-profile-activation-report-dialog',
  templateUrl: './ontome-profile-activation-report-dialog.component.html',
  styleUrls: ['./ontome-profile-activation-report-dialog.component.scss']
})
export class OntomeProfileActivationReportDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  activating = false;
  activated = false
  error = false

  constructor(public dialogRef: MatDialogRef<OntomeProfileActivationReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OntomeProfileActivationReportDialogData,
    private ontomeService: OntoMeControllerService,
    private dataService: ReduxMainService,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
  }

  activate() {
    this.activating = true
    this.ontomeService.ontoMeControllerUpdateAndAddToProject(this.data.pkProject, this.data.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        succes => {
          this.activating = false
          this.activated = true

          this.dataService.loadDfhProfilesOfProject(this.data.pkProject);
          this.dataService.loadDfhPropertiesOfProject(this.data.pkProject);
          this.dataService.loadDfhClassesOfProject(this.data.pkProject);
          this.dataService.loadDfhLabelsOfProject(this.data.pkProject);
          this.p.pro$.dfh_class_proj_rel.loadOfProject(this.data.pkProject);
          this.p.pro$.dfh_profile_proj_rel.loadOfProject(this.data.pkProject);
        },
        error => {
          this.activating = false
          this.error = true
        }
      )

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
