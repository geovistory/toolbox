import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogCreateData {
  title: string
  okBtnText: string

  name?: string
  description?: string
}

export interface DialogCreateResult {
  name?: string
  description?: string
}
@Component({
  selector: 'gv-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss']
})
export class DialogCreateComponent {

  formGroup: FormGroup
  constructor(public dialogRef: MatDialogRef<DialogCreateComponent, DialogCreateResult>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateData) {
    const name = data ? data.name : null;
    const description = data ? data.description : null;
    this.formGroup = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value)
    } else {
      this.formGroup.markAllAsTouched()
    }
  }
}
