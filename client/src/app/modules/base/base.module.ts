import { AddRoleComponent } from './new-components/add-role/add-role.component';
import { ChooseClassDialogComponent } from './new-components/choose-class-dialog/choose-class-dialog.component';
import { ClassesAndTypesSelectComponent } from './new-components/classes-and-types-select/classes-and-types-select.component';
import { CtrlAppellationComponent } from './new-components/ctrl-appellation/ctrl-appellation.component';
import { CtrlEntityComponent } from './new-components/ctrl-entity/ctrl-entity.component';
import { CtrlLanguageComponent } from './new-components/ctrl-language/ctrl-language.component';
import { CtrlPlaceComponent } from './new-components/ctrl-place/ctrl-place.component';
import { CtrlTextPropertyComponent } from './new-components/ctrl-text-property/ctrl-text-property.component';
import { CtrlTimePrimitiveComponent } from './new-components/ctrl-time-primitive/ctrl-time-primitive.component';
import { CtrlTimeSpanDialogComponent } from './new-components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { CtrlTimeSpanComponent } from './new-components/ctrl-time-span/ctrl-time-span.component';
import { ExistenceTimeHelpComponent } from './new-components/ctrl-time-span/existence-time-help/existence-time-help.component';
import { CtrlTypeComponent } from './new-components/ctrl-type/ctrl-type.component';
import { FieldComponent } from './new-components/field/field.component';
import { FormArrayComponent } from './new-components/form-array/form-array.component';
import { FormControlComponent } from './new-components/form-control/form-control.component';
import { FormCreateEntityComponent } from './new-components/form-create-entity/form-create-entity.component';
import { FormCreateRoleComponent } from './new-components/form-create-role/form-create-role.component';
import { FormGroupComponent } from './new-components/form-group/form-group.component';
import { LeafItemAddListComponent } from './new-components/leaf-item-add-list/leaf-item-add-list.component';
import { LeafItemListComponent } from './new-components/leaf-item-list/leaf-item-list.component';
import { ListHeaderComponent } from './new-components/list-header/list-header.component';
import { PropertiesTreeDialogComponent } from './new-components/properties-tree-dialog/properties-tree-dialog.component';
import { PropertiesTreeComponent } from './new-components/properties-tree/properties-tree.component';
import { PropertiesTreeService } from './new-components/properties-tree/properties-tree.service';
import { TemporalEntityAddListComponent } from './new-components/temporal-entity-add-list/temporal-entity-add-list.component';
import { TemporalEntityListComponent } from './new-components/temporal-entity-list/temporal-entity-list.component';
import { TimeSpanListComponent } from './new-components/time-span-list/time-span-list.component';
import { TypeItemComponent } from './new-components/type-item/type-item.component';
import { InformationBasicPipesService } from './new-services/information-basic-pipes.service';
import { InformationPipesService } from './new-services/information-pipes.service';
import { PaginationService } from './new-services/pagination.service';
import { TimeSpanService } from './new-services/time-span.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/core/material/material.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { OntoInfoModule } from 'app/shared/components/onto-info/onto-info.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from '../quill';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { TruncateModule } from 'app/shared/pipes/truncate/truncate.module';

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
]

@NgModule({
  imports: baseModules,
  declarations: components,
  providers: [
    InformationPipesService,
    InformationBasicPipesService,
    TimeSpanService,
    PropertiesTreeService,
    PaginationService
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
