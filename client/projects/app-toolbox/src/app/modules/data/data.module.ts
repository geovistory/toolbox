import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { AnnotationModule } from 'projects/app-toolbox/src/app/modules/annotation/annotation.module';
import { DigitalTableModule } from 'projects/app-toolbox/src/app/shared/components/digital-table/digital-table.module';
import { CoverModule } from 'projects/app-toolbox/src/app/shared/directives/cover/cover.module';
import { CommentMenuModule } from '../../shared/components/comment-menu/comment-menu.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { InfoDialogModule } from '../../shared/components/info-dialog/info-dialog.module';
import { CopyClipboardModule } from '../../shared/directives/copy-clipboard/copy-clipboard.module';
import { BaseModule } from '../base/base.module';
import { QuillModule } from '../quill';
import { ColumnMappingComponent } from './components/column-mapping/column-mapping.component';
import { CtrlEntityOrValueMatcherComponent } from './components/ctrl-entity-or-value-matcher.component/ctrl-entity-or-value-matcher.component';
import { FactoidPropertyDisplayComponent } from './components/factoids/factoid-property-display/factoid-property-display.component';
import { FactoidPropertyMappingComponent } from './components/factoids/factoid-property-mapping/factoid-property-mapping.component';
import { ImporterComponent } from './components/importer/importer.component';
import { TableConfigDialogComponent } from './components/table-config-dialog/table-config-dialog.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { TextDetailComponent } from './components/text-detail/text-detail.component';
import { VersionPickerComponent } from './components/version-picker/version-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    AnnotationModule,
    CoverModule,
    MaterialModule,
    DigitalTableModule,
    NgxFileDropModule,
    BaseModule,
    DragDropModule,
    CopyClipboardModule,
    InfoDialogModule,
    CommentMenuModule,
  ],
  providers: [],
  declarations: [TextDetailComponent, VersionPickerComponent, TableDetailComponent, ImporterComponent, TableConfigDialogComponent, FactoidPropertyDisplayComponent, ColumnMappingComponent, CtrlEntityOrValueMatcherComponent, FactoidPropertyMappingComponent],
  exports: [TextDetailComponent, VersionPickerComponent, TableDetailComponent, TableConfigDialogComponent, FactoidPropertyDisplayComponent, ColumnMappingComponent, CtrlEntityOrValueMatcherComponent, FactoidPropertyMappingComponent],
})
export class DataModule { }
