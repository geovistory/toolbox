import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    styleUrls: ['./dialog-create.component.scss'],
    standalone: true,
    imports: [MatDialogModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule]
})
export class DialogCreateComponent {

  formGroup: UntypedFormGroup
  constructor(public dialogRef: MatDialogRef<DialogCreateComponent, DialogCreateResult>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateData) {
    const name = data ? data.name : null;
    const description = data ? data.description : null;
    this.formGroup = new UntypedFormGroup({
      name: new UntypedFormControl(name, Validators.required),
      description: new UntypedFormControl(description)
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
