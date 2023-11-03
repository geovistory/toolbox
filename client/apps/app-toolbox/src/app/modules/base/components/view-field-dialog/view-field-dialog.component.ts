import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { EditModeService } from '../../services/edit-mode.service';

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
  providers: [EditModeService]
})
export class ViewFieldDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewFieldDialogData,
    public editMode: EditModeService
  ) {
    editMode.setValue(data.readonly ? false : true)
  }

  ngOnInit() {

  }

}
