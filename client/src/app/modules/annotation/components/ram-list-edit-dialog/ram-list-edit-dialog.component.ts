import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfRole, EntityPreview } from 'app/core';
import { FieldDefinition, ListDefinition } from 'app/modules/base/new-components/properties-tree/properties-tree.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
export interface RamListEditDialogData {

  // the root statement of the dialog
  statement: InfRole;

}
@Component({
  selector: 'gv-ram-list-edit-dialog',
  templateUrl: './ram-list-edit-dialog.component.html',
  styleUrls: ['./ram-list-edit-dialog.component.scss']
})
export class RamListEditDialogComponent implements OnInit {

  fieldDefinition: FieldDefinition;
  constructor(
    public dialogRef: MatDialogRef<RamListEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RamListEditDialogData,
  ) {

    const listDef: ListDefinition = {
      listType: 'text-property',
      label: '[Label]',
      ontoInfoUrl: '[ontoInfoUrl]',
      ontoInfoLabel: '[ontoInfoLabel]',
      pkProperty: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,
      isOutgoing: true,
      isIdentityDefining: false,
      sourceClass: undefined,
      targetMaxQuantity: -1,
      targetClass: 657,
      targetClassLabel: 'Reference',
      fkClassField: undefined
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

  ngOnInit() {
  }

}
