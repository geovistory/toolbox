import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditComponent } from './quill-edit/quill-edit.component';
import { QuillService } from './quill.service';
import { DomChangeModule } from '../../shared';
import { QuillViewComponent } from './quill-view/quill-view.component';
import { ProgressDialogModule } from '../../shared/components/progress-dialog/progress-dialog.module';
import { MatDialogModule } from '../../../../node_modules/@angular/material';

@NgModule({
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
export class QuillModule { }
