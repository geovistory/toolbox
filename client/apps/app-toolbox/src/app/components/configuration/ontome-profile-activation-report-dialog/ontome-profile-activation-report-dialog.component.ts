import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { OntoMeControllerService } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OntomeProfileActivationReportComponent } from '../ontome-profile-activation-report/ontome-profile-activation-report.component';
import { NgIf } from '@angular/common';
export interface OntomeProfileActivationReportDialogData {
  pkProject: number
  profileId: number
  profileLabel: string
}

@Component({
    selector: 'gv-ontome-profile-activation-report-dialog',
    templateUrl: './ontome-profile-activation-report-dialog.component.html',
    styleUrls: ['./ontome-profile-activation-report-dialog.component.scss'],
    standalone: true,
    imports: [NgIf, MatDialogModule, OntomeProfileActivationReportComponent, MatProgressSpinnerModule, MatButtonModule]
})
export class OntomeProfileActivationReportDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  activating = false;
  activated = false
  error = false

  constructor(public dialogRef: MatDialogRef<OntomeProfileActivationReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OntomeProfileActivationReportDialogData,
    private ontomeService: OntoMeControllerService,
    private state: StateFacade
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

          this.state.data.loadDfhProfilesOfProject(this.data.pkProject);
          this.state.data.loadDfhPropertiesOfProject(this.data.pkProject);
          this.state.data.loadDfhClassesOfProject(this.data.pkProject);
          this.state.data.loadDfhLabelsOfProject(this.data.pkProject);
          this.state.data.loadProjectClassRelations(this.data.pkProject);
          this.state.data.loadProjectProfileRelations(this.data.pkProject);
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
