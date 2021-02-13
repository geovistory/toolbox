import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
let DialogCreateComponent = class DialogCreateComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        const name = data ? data.name : null;
        const description = data ? data.description : null;
        this.formGroup = new FormGroup({
            name: new FormControl(name, Validators.required),
            description: new FormControl(description)
        });
    }
    onNoClick() {
        this.dialogRef.close();
    }
    onSaveClick() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value);
        }
        else {
            this.formGroup.markAllAsTouched();
        }
    }
};
DialogCreateComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-dialog-create',
        templateUrl: './dialog-create.component.html',
        styleUrls: ['./dialog-create.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], DialogCreateComponent);
export { DialogCreateComponent };
//# sourceMappingURL=dialog-create.component.js.map