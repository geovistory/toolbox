import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfStatement } from "app/core/sdk";
import { Field, FieldBase, Subfield } from 'app/modules/base/components/properties-tree/properties-tree.models';
import { PropertiesTreeService } from 'app/modules/base/components/properties-tree/properties-tree.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
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
    pkPropertyOfProperty: DfhConfig.P_O_P_GEOV_HAS_REFERENCE
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
  isHasTypeField: false
}
const listDef: Subfield = {
  ...fieldBase,
  listType: { langString: 'true' },
  targetClass: 657,
  targetClassLabel: 'Reference',
  removedFromAllProfiles: false,
}

/**
 * Field at reference, property of property
 * that indicates where something was written
 */
export const fieldAtReferencePoP: Field = {
  ...fieldBase,
  targetClasses: [657],
  placeOfDisplay: {},
  allSubfieldsRemovedFromAllProfiles: false,
  listDefinitions: [
    listDef
  ],
  fieldConfig: undefined,
  isSpecialField: false

}

@Component({
  selector: 'gv-ram-list-edit-dialog',
  templateUrl: './ram-list-edit-dialog.component.html',
  styleUrls: ['./ram-list-edit-dialog.component.scss'],
  providers: [
    PropertiesTreeService
  ]
})
export class RamListEditDialogComponent implements OnInit {

  fieldDefinition: Field;
  readonly$ = new BehaviorSubject(false);
  showOntoInfo$ = new BehaviorSubject(false)
  constructor(
    public t: PropertiesTreeService,
    public dialogRef: MatDialogRef<RamListEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListEditDialogData,
  ) {


    this.fieldDefinition = fieldAtReferencePoP

  }

  ngOnInit() {
  }

}

