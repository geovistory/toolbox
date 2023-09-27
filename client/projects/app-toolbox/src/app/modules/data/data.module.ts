import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { AnnotationModule } from 'projects/app-toolbox/src/app/modules/annotation/annotation.module';
import { DigitalTableModule } from 'projects/app-toolbox/src/app/shared/components/digital-table/digital-table.module';
import { ClassDropdownModule } from '../../shared/components/class-dropdown/class-dropdown.module';
import { CommentMenuModule } from '../../shared/components/comment-menu/comment-menu.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { InfoDialogModule } from '../../shared/components/info-dialog/info-dialog.module';
import { TabBaseModule } from '../../shared/components/tab-layout/tab-layout.module';
import { ValuePreviewModule } from '../../shared/components/value-preview/value-preview.module';
import { CopyClipboardModule } from '../../shared/directives/copy-clipboard/copy-clipboard.module';
import { BaseModule } from '../base/base.module';
import { QuillModule } from '../quill';
import { ColumnMappingComponent } from './components/column-mapping/column-mapping.component';
import { CtrlEntityOrValueMatcherComponent } from './components/ctrl-entity-or-value-matcher.component/ctrl-entity-or-value-matcher.component';
import { FactoidMappingBodyComponent } from './components/factoids/factoid-mapping-body/factoid-mapping-body.component';
import { FactoidMappingHeaderComponent } from './components/factoids/factoid-mapping-header/factoid-mapping-header.component';
import { FactoidMappingComponent } from './components/factoids/factoid-mapping/factoid-mapping.component';
import { FactoidMappingsDialogComponent } from './components/factoids/factoid-mappings-dialog/factoid-mappings-dialog.component';
import { FactoidPropertyDisplayComponent } from './components/factoids/factoid-property-display/factoid-property-display.component';
import { FactoidPropertyMappingComponent } from './components/factoids/factoid-property-mapping/factoid-property-mapping.component';
import { ImporterComponent } from './components/importer/importer.component';
import { TableConfigDialogComponent } from './components/table-config-dialog/table-config-dialog.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { TableEditorComponent } from './components/table-editor/table-editor.component';
import { TextDetail2Component } from './components/text-detail2/text-detail2.component';
import { ViewFieldHasTableValueComponent } from './components/view-field-has-table-value/view-field-has-table-value.component';

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
    MaterialModule,
    DigitalTableModule,
    NgxFileDropModule,
    BaseModule,
    DragDropModule,
    CopyClipboardModule,
    InfoDialogModule,
    CommentMenuModule,
    ClassDropdownModule,
    ValuePreviewModule,
    TabBaseModule
  ],
  providers: [],
  declarations: [TextDetail2Component, TableEditorComponent, ViewFieldHasTableValueComponent, TableDetailComponent, ImporterComponent, TableConfigDialogComponent, FactoidPropertyDisplayComponent, ColumnMappingComponent, CtrlEntityOrValueMatcherComponent, FactoidPropertyMappingComponent, FactoidMappingHeaderComponent, FactoidMappingBodyComponent, FactoidMappingComponent, FactoidMappingsDialogComponent,],
  exports: [TextDetail2Component, TableEditorComponent, TableDetailComponent, TableConfigDialogComponent, FactoidPropertyDisplayComponent, ColumnMappingComponent, CtrlEntityOrValueMatcherComponent, FactoidPropertyMappingComponent, FactoidMappingHeaderComponent, FactoidMappingBodyComponent, FactoidMappingComponent, FactoidMappingsDialogComponent,],
})
export class DataModule { }
