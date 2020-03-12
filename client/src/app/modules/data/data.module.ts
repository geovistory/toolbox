import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextDetailComponent } from './components/text-detail/text-detail.component';
import { QuillModule } from '../quill';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { VersionPickerComponent } from './components/version-picker/version-picker.component';
import { FormsModule } from '@angular/forms';
import { AnnotationModule } from 'app/modules/annotation/annotation.module';
import { AngularSplitModule } from 'app/core/split/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    AnnotationModule
  ],
  providers: [],
  declarations: [TextDetailComponent, VersionPickerComponent],
  exports: [TextDetailComponent, VersionPickerComponent]
})
export class DataModule { }
