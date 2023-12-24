import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field, FieldBase } from '@kleiolab/lib-redux';
import { GvFieldPageScope, InfStatement } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ViewFieldComponent } from '../../../../components/data/view-field/view-field.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EntityPreviewComponent } from '../../../../shared/components/entity-preview/entity-preview.component';
export interface RamListEditDialogData {

  // the root statement of the dialog
  statement: InfStatement;
  scope: GvFieldPageScope
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
    standalone: true,
    imports: [
        MatDialogModule,
        EntityPreviewComponent,
        MatIconModule,
        MatDividerModule,
        ViewFieldComponent,
        MatButtonModule,
    ],
})
export class RamListEditDialogComponent implements OnInit {

  readmode$ = new BehaviorSubject(false);
  showOntoInfo$ = new BehaviorSubject(false)
  field: Field
  constructor(
    public dialogRef: MatDialogRef<RamListEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListEditDialogData,
  ) {
    this.field = fieldAtReferencePoP
  }

  ngOnInit() {
  }

}

