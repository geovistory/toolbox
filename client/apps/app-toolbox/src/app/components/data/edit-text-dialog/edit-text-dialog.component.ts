import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditModeService } from '../../../services/edit-mode.service';
import { ViewFieldHasValueVersionComponent } from '../view-field-has-value-version/view-field-has-value-version.component';
export interface EditTextDialogData {
  classLabel: string;
  source: GvFieldSourceEntity
  field: Field
  scope: GvFieldPageScope
  editing$: BehaviorSubject<boolean>
  editMode: boolean
  showOntoInfo$: Observable<boolean>
}
@Component({
  selector: 'gv-edit-text-dialog',
  templateUrl: './edit-text-dialog.component.html',
  styleUrls: ['./edit-text-dialog.component.scss'],
  providers: [EditModeService],
  standalone: true,
  imports: [MatDialogModule, ViewFieldHasValueVersionComponent, NgIf, MatButtonModule, AsyncPipe]
})
export class EditTextDialogComponent {

  @ViewChild(ViewFieldHasValueVersionComponent) editor: ViewFieldHasValueVersionComponent
  constructor(
    public dialogRef: MatDialogRef<EditTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTextDialogData,
    public editMode: EditModeService
  ) {
    editMode.setValue(data.editMode)
  }

  async save() {
    await this.editor.onSave()
    this.dialogRef.close()
  }
  cancel() {
    this.dialogRef.close()
  }

}
