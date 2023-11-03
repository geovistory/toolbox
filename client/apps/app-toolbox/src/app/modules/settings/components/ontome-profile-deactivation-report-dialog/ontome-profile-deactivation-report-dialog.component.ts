import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { OntoMeControllerService } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export interface OntomeProfileDeactivationReportDialogData {
  pkProject: number
  profileId: number
  profileLabel: string
}
@Component({
  selector: 'gv-ontome-profile-deactivation-report-dialog',
  templateUrl: './ontome-profile-deactivation-report-dialog.component.html',
  styleUrls: ['./ontome-profile-deactivation-report-dialog.component.scss']
})
export class OntomeProfileDeactivationReportDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  deactivating = false;
  deactivated = false
  error = false

  constructor(public dialogRef: MatDialogRef<OntomeProfileDeactivationReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OntomeProfileDeactivationReportDialogData,
    private ontomeService: OntoMeControllerService,
    private state: StateFacade
  ) { }

  ngOnInit() {
  }

  deactivate() {
    this.deactivating = true
    this.ontomeService.ontoMeControllerDeactivateProfileForProject(this.data.pkProject, this.data.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        succes => {
          this.deactivating = false
          this.deactivated = true

          this.state.data.loadProjectClassRelations(this.data.pkProject);
          this.state.data.loadProjectProfileRelations(this.data.pkProject);
        },
        error => {
          this.deactivating = false
          this.error = true
        }
      )

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
