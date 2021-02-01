import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfStatement, EntityPreview } from 'app/core';
import { Field, Subfield } from 'app/modules/base/components/properties-tree/properties-tree.models';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { PropertiesTreeService } from 'app/modules/base/components/properties-tree/properties-tree.service';
import { BehaviorSubject } from 'rxjs';
export interface RamListEditDialogData {

  // the root statement of the dialog
  statement: InfStatement;

  propertyLabel: string

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

    const listDef: Subfield = {
      listType: 'langString',
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
      targetClass: 657,
      targetClassLabel: 'Reference',
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

  ngOnInit() {
  }

}
