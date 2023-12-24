import { NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, InfStatement } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { EntityPreviewComponent } from '../../../../shared/components/entity-preview/entity-preview.component';
import { ViewFieldComponent } from '../../../../components/data/view-field/view-field.component';
import { fieldAtReferencePoP } from '../ram-list-edit-dialog/ram-list-edit-dialog.component';
export interface RamListRemoveDialogData {

  // the root statement of the dialog
  statement: InfStatement;

  scope: GvFieldPageScope
  propertyLabel: string;

  propertyHasReferences: boolean
}
@Component({
  selector: 'gv-ram-list-remove-dialog',
  templateUrl: './ram-list-remove-dialog.component.html',
  styleUrls: ['./ram-list-remove-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, NgIf, EntityPreviewComponent, MatIconModule, MatDividerModule, ViewFieldComponent, MatButtonModule]
})
export class RamListRemoveDialogComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  field: Field;
  readmode$ = new BehaviorSubject(true);
  showOntoInfo$ = new BehaviorSubject(false)
  constructor(
    public p: ActiveProjectService,
    private state: StateFacade,
    public dialogRef: MatDialogRef<RamListRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListRemoveDialogData,
  ) {

    this.field = fieldAtReferencePoP


  }

  onRemove() {
    combineLatest(
      this.state.data.inf.statement.getMany.by_subject_and_property$({
        fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
        fk_subject_info: this.data.statement.pk_entity
      }),
      this.state.pkProject$
    ).pipe(first()).subscribe(([references, pkProject]) => {

      this.state.data.removeInfEntitiesFromProject([this.data.statement.pk_entity, ...references.map(r => r.pk_entity)], pkProject)
        .pipe(takeUntil(this.destroy$)).subscribe(
          res => {
            if (res) this.dialogRef.close()
          }
        )
    })
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
