import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillEditComponent } from './quill-edit/quill-edit.component';
import { QuillService } from './quill.service';
import { DomChangeModule } from '../../shared';
import { QuillViewComponent } from './quill-view/quill-view.component';

@NgModule({
  imports: [
    CommonModule,
    DomChangeModule
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
