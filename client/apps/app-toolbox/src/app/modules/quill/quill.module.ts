import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProgressDialogModule } from '../../shared/components/progress-dialog/progress-dialog.module';
import { QuillEditComponent } from './quill-edit/quill-edit.component';
import { QuillViewComponent } from './quill-view/quill-view.component';
import { QuillService } from './quill.service';

@NgModule({
    imports: [
    CommonModule,
    MatDialogModule,
    ProgressDialogModule,
    MatDividerModule,
    MatTooltipModule,
    QuillEditComponent,
    QuillViewComponent
],
    providers: [
        QuillService
    ],
    exports: [
        QuillEditComponent,
        QuillViewComponent
    ]
})
export class QuillModule { }
