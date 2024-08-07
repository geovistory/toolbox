import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { OntoMeControllerService } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
export interface OntomeProfileUpdateDialogData {
  profileId: number
  profileLabel: string
}
@Component({
    selector: 'gv-ontome-profile-update-dialog',
    templateUrl: './ontome-profile-update-dialog.component.html',
    styleUrls: ['./ontome-profile-update-dialog.component.scss'],
    standalone: true,
    imports: [NgIf, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatButtonModule]
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
    private state: StateFacade
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
          this.state.data.loadDfhProfilesOfProject(this.state.pkProject);
          this.state.data.loadDfhPropertiesOfProject(this.state.pkProject);
          this.state.data.loadDfhClassesOfProject(this.state.pkProject);
          this.state.data.loadDfhLabelsOfProject(this.state.pkProject);
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
