import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field, FieldBase } from '@kleiolab/lib-queries';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { BehaviorSubject } from 'rxjs';
export interface RamListEditDialogData {

  // the root statement of the dialog
  statement: InfStatement;

  propertyLabel: string

}
const fieldBase: FieldBase = {
  label: 'at reference',
  ontoInfoUrl: '[ontoInfoUrl]',
  ontoInfoLabel: '[ontoInfoLabel]',
  property: {
    fkPropertyOfProperty: DfhConfig.P_O_P_GEOV_HAS_REFERENCE
  },
  isOutgoing: true,
  identityDefiningForSource: false,
  identityDefiningForTarget: false,
  sourceClass: undefined,
  sourceClassLabel: undefined,
  targetMaxQuantity: -1,
  targetMinQuantity: undefined,
  sourceMaxQuantity: undefined,
  sourceMinQuantity: undefined,
  isHasTypeField: false,
  isTimeSpanShortCutField: false
}

/**
 * Field at reference, property of property
 * that indicates where something was written
 */
export const fieldAtReferencePoP: Field = {
  ...fieldBase,
  targetClasses: [657],
  display: {},
  allSubfieldsRemovedFromAllProfiles: false,
  targets: {
    657: {
      viewType: { langString: 'true' },
      formControlType: { langString: 'true' },
      targetClass: 657,
      targetClassLabel: 'Reference',
      removedFromAllProfiles: false,
    }
  },
  fieldConfig: undefined,
  isSpecialField: false

}

@Component({
  selector: 'gv-ram-list-edit-dialog',
  templateUrl: './ram-list-edit-dialog.component.html',
  styleUrls: ['./ram-list-edit-dialog.component.scss'],

})
export class RamListEditDialogComponent implements OnInit {

  readonly$ = new BehaviorSubject(false);
  showOntoInfo$ = new BehaviorSubject(false)
  treeControl = new NestedTreeControl<Field>(node => ([]))
  dataSource = new MatTreeNestedDataSource<Field>()
  constructor(
    public dialogRef: MatDialogRef<RamListEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListEditDialogData,
  ) {

    this.dataSource.data = [fieldAtReferencePoP];
    this.treeControl.expand(fieldAtReferencePoP)

  }

  ngOnInit() {
  }

}

