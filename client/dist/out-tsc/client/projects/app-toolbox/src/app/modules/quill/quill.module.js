import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditComponent } from './quill-edit/quill-edit.component';
import { QuillService } from './quill.service';
import { DomChangeModule } from '../../shared';
import { QuillViewComponent } from './quill-view/quill-view.component';
import { ProgressDialogModule } from '../../shared/components/progress-dialog/progress-dialog.module';
import { MatDialogModule } from '@angular/material';
let QuillModule = class QuillModule {
};
QuillModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            DomChangeModule,
            MatDialogModule,
            ProgressDialogModule,
        ],
        providers: [
            QuillService
        ],
        declarations: [
            QuillEditComponent,
            QuillViewComponent
        ],
        exports: [
            QuillEditComponent,
            QuillViewComponent
        ]
    })
], QuillModule);
export { QuillModule };
//# sourceMappingURL=quill.module.js.map