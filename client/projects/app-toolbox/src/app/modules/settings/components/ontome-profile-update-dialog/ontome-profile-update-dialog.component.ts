import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OntoMeControllerService } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
export interface OntomeProfileUpdateDialogData {
  profileId: number
  profileLabel: string
}
@Component({
  selector: 'gv-ontome-profile-update-dialog',
  templateUrl: './ontome-profile-update-dialog.component.html',
  styleUrls: ['./ontome-profile-update-dialog.component.scss']
})
export class OntomeProfileUpdateDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  updating = false;
  updated = false
  error = false

  language: string;

  constructor(public dialogRef: MatDialogRef<OntomeProfileUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OntomeProfileUpdateDialogData,
    private ontomeService: OntoMeControllerService,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
  }

  update() {
    this.updating = true
    this.ontomeService.ontoMeControllerUpdateProfileFromOntome(this.data.profileId, this.language)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        succes => {
          this.updating = false
          this.updated = true
          this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            this.p.dfh$.profile.loadOfProject(pkProject);
            this.p.dfh$.klass.loadOfProject(pkProject);
            this.p.dfh$.property.loadOfProject(pkProject);
            this.p.dfh$.label.loadOfProject(pkProject);
          })

        },
        error => {
          this.updating = false
          this.error = true
        }
      )

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
