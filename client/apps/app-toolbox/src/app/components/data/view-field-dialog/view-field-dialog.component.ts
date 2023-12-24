import { ChangeDetectionStrategy, Component, Inject, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { EditModeService } from '../../../modules/base/services/edit-mode.service';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';

export interface ViewFieldDialogData {
  title: string
  field: Field
  source: GvFieldSourceEntity
  scope: GvFieldPageScope
  showOntoInfo$: Observable<boolean>
  readonly: boolean
}
@Component({
  selector: 'gv-view-field-dialog',
  templateUrl: './view-field-dialog.component.html',
  styleUrls: ['./view-field-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditModeService],
  standalone: true,
  imports: [MatDialogModule, forwardRef(() => ViewFieldBodyComponent), MatButtonModule]
})
export class ViewFieldDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewFieldDialogData,
    public editMode: EditModeService
  ) {
    editMode.setValue(data.readonly ? false : true)
  }

}
