import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DfhProfileApi, ActiveProjectService } from 'app/core';
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
    private dfhProfileApi: DfhProfileApi,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
  }

  activate() {
    this.activating = true
    this.dfhProfileApi.updateAndAddToProject(this.data.pkProject, this.data.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        succes => {
          this.activating = false
          this.activated = true

          this.p.dfh$.profile.loadOfProject(this.data.pkProject);
          this.p.dfh$.klass.loadOfProject(this.data.pkProject);
          this.p.dfh$.property.loadOfProject(this.data.pkProject);
          this.p.dfh$.label.loadOfProject(this.data.pkProject);
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
