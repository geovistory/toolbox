import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
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
    private dfhProfileApi: DfhProfileApi,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
  }

  deactivate() {
    this.deactivating = true
    this.dfhProfileApi.deactivateProfileForProject(this.data.pkProject, this.data.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        succes => {
          this.deactivating = false
          this.deactivated = true

          this.p.pro$.dfh_class_proj_rel.loadOfProject(this.data.pkProject);
          this.p.pro$.dfh_profile_proj_rel.loadOfProject(this.data.pkProject);
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
