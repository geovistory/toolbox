import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { PropertiesTreeService } from 'projects/app-toolbox/src/app/modules/base/components/properties-tree/properties-tree.service';
import { Subfield } from "@kleiolab/lib-queries";
import { Field } from "@kleiolab/lib-queries";
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DfhConfig } from "@kleiolab/lib-config";
import { first, takeUntil } from 'rxjs/operators';
import { fieldAtReferencePoP } from '../ram-list-edit-dialog/ram-list-edit-dialog.component';
export interface RamListRemoveDialogData {

  // the root statement of the dialog
  statement: InfStatement;

  propertyLabel: string;

  propertyHasReferences: boolean
}
@Component({
  selector: 'gv-ram-list-remove-dialog',
  templateUrl: './ram-list-remove-dialog.component.html',
  styleUrls: ['./ram-list-remove-dialog.component.scss']
})
export class RamListRemoveDialogComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  fieldDefinition: Field;
  readonly$ = new BehaviorSubject(true);
  showOntoInfo$ = new BehaviorSubject(false)
  constructor(
    public t: PropertiesTreeService,
    public p: ActiveProjectService,
    public dialogRef: MatDialogRef<RamListRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListRemoveDialogData,
  ) {

    this.fieldDefinition = fieldAtReferencePoP


  }

  onRemove() {
    combineLatest(
      this.p.inf$.statement$.by_subject_and_property$({
        fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
        fk_subject_info: this.data.statement.pk_entity
      }),
      this.p.pkProject$
    ).pipe(first()).subscribe(([references, pkProject]) => {

      this.p.inf.statement.remove([this.data.statement, ...references], pkProject).resolved$
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
