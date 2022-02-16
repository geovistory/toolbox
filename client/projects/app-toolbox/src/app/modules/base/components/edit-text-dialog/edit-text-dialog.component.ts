import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewFieldHasValueVersionComponent } from '../view-field-has-value-version/view-field-has-value-version.component';
export interface EditTextDialogData {
  classLabel: string;
  source: GvFieldSourceEntity
  field: Field
  scope: GvFieldPageScope
  editing$: BehaviorSubject<boolean>
  readmode$: Observable<boolean>
  showOntoInfo$: Observable<boolean>
}
@Component({
  selector: 'gv-edit-text-dialog',
  templateUrl: './edit-text-dialog.component.html',
  styleUrls: ['./edit-text-dialog.component.scss']
})
export class EditTextDialogComponent {

  @ViewChild(ViewFieldHasValueVersionComponent) editor: ViewFieldHasValueVersionComponent
  constructor(
    public dialogRef: MatDialogRef<EditTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTextDialogData,
  ) { }

  async save() {
    await this.editor.onSave()
    this.dialogRef.close()
  }
  cancel() {
    this.dialogRef.close()
  }

}
