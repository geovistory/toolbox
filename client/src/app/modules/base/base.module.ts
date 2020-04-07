import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material/material.module';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { OntoInfoModule } from 'app/shared/components/onto-info/onto-info.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { QuillOpsToStrModule } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { TruncateModule } from 'app/shared/pipes/truncate/truncate.module';
import { QuillModule } from '../quill';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { ChooseClassDialogComponent } from './components/choose-class-dialog/choose-class-dialog.component';
import { ClassesAndTypesSelectComponent } from './components/classes-and-types-select/classes-and-types-select.component';
import { CtrlAppellationComponent } from './components/ctrl-appellation/ctrl-appellation.component';
import { CtrlEntityComponent } from './components/ctrl-entity/ctrl-entity.component';
import { CtrlLanguageComponent } from './components/ctrl-language/ctrl-language.component';
import { CtrlPlaceComponent } from './components/ctrl-place/ctrl-place.component';
import { CtrlTextPropertyComponent } from './components/ctrl-text-property/ctrl-text-property.component';
import { CtrlTimePrimitiveComponent } from './components/ctrl-time-primitive/ctrl-time-primitive.component';
import { CtrlTimeSpanDialogComponent } from './components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { CtrlTimeSpanComponent } from './components/ctrl-time-span/ctrl-time-span.component';
import { ExistenceTimeHelpComponent } from './components/ctrl-time-span/existence-time-help/existence-time-help.component';
import { CtrlTypeComponent } from './components/ctrl-type/ctrl-type.component';
import { FieldComponent } from './components/field/field.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormCreateEntityComponent } from './components/form-create-entity/form-create-entity.component';
import { FormCreateRoleComponent } from './components/form-create-role/form-create-role.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { LeafItemAddListComponent } from './components/leaf-item-add-list/leaf-item-add-list.component';
import { LeafItemListComponent } from './components/leaf-item-list/leaf-item-list.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { PropertiesTreeDialogComponent } from './components/properties-tree-dialog/properties-tree-dialog.component';
import { PropertiesTreeComponent } from './components/properties-tree/properties-tree.component';
import { PropertiesTreeService } from './components/properties-tree/properties-tree.service';
import { TemporalEntityAddListComponent } from './components/temporal-entity-add-list/temporal-entity-add-list.component';
import { TemporalEntityListComponent } from './components/temporal-entity-list/temporal-entity-list.component';
import { TimeSpanListComponent } from './components/time-span-list/time-span-list.component';
import { TypeItemComponent } from './components/type-item/type-item.component';
import { InformationBasicPipesService } from './services/information-basic-pipes.service';
import { InformationPipesService } from './services/information-pipes.service';
import { PaginationService } from './services/pagination.service';
import { TimeSpanService } from './services/time-span.service';
import { CtrlLangStringComponent } from './components/ctrl-lang-string/ctrl-lang-string.component';

const components = [
  PropertiesTreeComponent,
  PropertiesTreeDialogComponent,
  AddRoleComponent,
  ListHeaderComponent,
  FieldComponent,
  TemporalEntityListComponent,
  TemporalEntityAddListComponent,
  TimeSpanListComponent,
  LeafItemListComponent,
  LeafItemAddListComponent,
  TypeItemComponent,
  CtrlAppellationComponent,
  CtrlLanguageComponent,
  CtrlPlaceComponent,
  CtrlEntityComponent,
  CtrlTextPropertyComponent,
  CtrlLangStringComponent,
  CtrlTimeSpanComponent,
  CtrlTimeSpanDialogComponent,
  CtrlTimePrimitiveComponent,
  CtrlTypeComponent,
  FormCreateRoleComponent,
  FormCreateEntityComponent,
  FormGroupComponent,
  FormArrayComponent,
  FormControlComponent,
  ClassesAndTypesSelectComponent,
  ChooseClassDialogComponent,
  ExistenceTimeHelpComponent,
]

const baseModules = [
  CommonModule,
  ReactiveFormsModule,
  MaterialModule,
  EntityPreviewModule,
  OntoInfoModule,
  QuillModule,
  ControlMessagesModule,
  PassiveLinkModule,
  TimePrimitivePipeModule,
  TimeSpanPipeModule,
  KeysModule,
  TruncateModule,
  QuillOpsToStrModule
]

@NgModule({
  imports: baseModules,
  declarations: components,
  providers: [
    PaginationService,
    InformationPipesService,
    InformationBasicPipesService,
    TimeSpanService,
    PropertiesTreeService,
  ],
  exports: [
    ...components,
    ...baseModules
  ],
  entryComponents: [
    ChooseClassDialogComponent,
    CtrlTimeSpanDialogComponent,
    PropertiesTreeDialogComponent
  ]
})
export class BaseModule { }
