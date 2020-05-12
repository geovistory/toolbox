import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { InfStatement, ActiveProjectService } from 'app/core';
import { PropertiesTreeService } from 'app/modules/base/components/properties-tree/properties-tree.service';
import { FieldDefinition, ListDefinition } from 'app/modules/base/components/properties-tree/properties-tree.models';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { first, takeUntil } from 'rxjs/operators';
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

  fieldDefinition: FieldDefinition;
  readonly$ = new BehaviorSubject(true);
  showOntoInfo$ = new BehaviorSubject(false)
  constructor(
    public t: PropertiesTreeService,
    public p: ActiveProjectService,
    public dialogRef: MatDialogRef<RamListRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListRemoveDialogData,
  ) {

    const listDef: ListDefinition = {
      listType: 'lang-string',
      label: 'at reference',
      ontoInfoUrl: '[ontoInfoUrl]',
      ontoInfoLabel: '[ontoInfoLabel]',
      property: {
        pkPropertyOfProperty: DfhConfig.P_O_P_GEOV_HAS_REFERENCE
      },
      isOutgoing: true,
      identityDefiningForSource: false,
      identityDefiningForTarget: false,
      sourceClass: undefined,
      sourceClassLabel: undefined,
      sourceMinQuantity: undefined,
      sourceMaxQuantity: undefined,
      targetClass: 657,
      targetClassLabel: 'Reference',
      targetMinQuantity: undefined,
      targetMaxQuantity: -1,
      fkClassField: undefined,
      removedFromAllProfiles: false
    }
    this.fieldDefinition = {
      ...listDef,
      targetClasses: [657],
      listDefinitions: [
        listDef
      ],
      fieldConfig: undefined
    }


  }

  onRemove() {
    combineLatest(
      this.p.inf$.statement$.by_subject_and_property$({
        fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
        fk_temporal_entity: this.data.statement.pk_entity
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
