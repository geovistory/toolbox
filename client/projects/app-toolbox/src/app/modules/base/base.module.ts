import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { ValidationService } from 'projects/app-toolbox/src/app/core/validation/validation.service';
import { ControlMessagesModule, PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { EntityPreviewModule } from 'projects/app-toolbox/src/app/shared/components/entity-preview/entity-preview.module';
import { EntityPreviewsPaginatedModule } from 'projects/app-toolbox/src/app/shared/components/entity-previews-paginated/entity-previews-paginated.module';
import { OntoInfoModule } from 'projects/app-toolbox/src/app/shared/components/onto-info/onto-info.module';
import { KeysModule } from 'projects/app-toolbox/src/app/shared/pipes/keys.module';
import { QuillOpsToStrModule } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { TruncateModule } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.module';
import { EntityLabelConfigModule } from '../../shared/modules/entity-label-config/entity-label-config.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { QuillModule } from '../quill';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { AddOrCreateEntityDialogComponent } from './components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';
import { ChooseClassDialogComponent } from './components/choose-class-dialog/choose-class-dialog.component';
import { ClassesAndTypesSelectComponent } from './components/classes-and-types-select/classes-and-types-select.component';
import { CtrlAppellationComponent } from './components/ctrl-appellation/ctrl-appellation.component';
import { CtrlEntityDialogComponent } from './components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityComponent } from './components/ctrl-entity/ctrl-entity.component';
import { CtrlLanguageComponent } from './components/ctrl-language/ctrl-language.component';
import { CtrlTextPropertyComponent } from './components/ctrl-text-property/ctrl-text-property.component';
import { CtrlTimePrimitiveComponent } from './components/ctrl-time-primitive/ctrl-time-primitive.component';
import { CtrlTimeSpanDialogComponent } from './components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { CtrlTimeSpanComponent } from './components/ctrl-time-span/ctrl-time-span.component';
import { ExistenceTimeHelpComponent } from './components/ctrl-time-span/existence-time-help/existence-time-help.component';
import { CtrlTypeComponent } from './components/ctrl-type/ctrl-type.component';
import { CtrlValueDialogComponent } from './components/ctrl-value/ctrl-value-dialog.component';
import { EntityAddExistingHitComponent } from './components/entity-add-existing-hit/entity-add-existing-hit.component';
import { EntityCardHeaderComponent } from './components/entity-card-header/entity-card-header.component';
import { EntityCardWrapperComponent } from './components/entity-card-wrapper/entity-card-wrapper.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { EntityFieldComponent } from './components/entity-field/entity-field.component';
import { EntityWithFieldsComponent } from './components/entity-with-fields/entity-with-fields.component';
import { FgAppellationTeEnComponent } from './components/fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent } from './components/fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from './components/fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from './components/fg-place/fg-place.component';
import { FieldLabelComponent } from './components/field-label/field-label.component';
import { FieldComponent } from './components/field/field.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormCreateEntityComponent } from './components/form-create-entity/form-create-entity.component';
import { FormFieldHeaderComponent } from './components/form-field-header/form-field-header.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { PropertiesTreeDialogComponent } from './components/properties-tree-dialog/properties-tree-dialog.component';
import { PropertiesTreeSectionComponent } from './components/properties-tree-section/properties-tree-section.component';
import { PropertiesTreeComponent } from './components/properties-tree/properties-tree.component';
import { PropertiesTreeService } from './components/properties-tree/properties-tree.service';
import { SearchExistingEntityComponent } from './components/search-existing-entity/search-existing-entity.component';
import { SubfieldDialogComponent } from './components/subfield-dialog/subfield-dialog.component';
import { SubfieldComponent } from './components/subfield/subfield.component';
import { TypeItemComponent } from './components/type-item/type-item.component';
import { BaseModalsService } from './services/base-modals.service';
import { PaginationService } from './services/pagination.service';
import { TimeSpanService } from './services/time-span.service';

const components = [
  PropertiesTreeComponent,
  PropertiesTreeDialogComponent,
  PropertiesTreeSectionComponent,
  FieldComponent,
  TypeItemComponent,
  CtrlAppellationComponent,
  CtrlLanguageComponent,
  CtrlEntityComponent,
  CtrlValueDialogComponent,
  CtrlEntityDialogComponent,
  CtrlTextPropertyComponent,
  CtrlTimeSpanComponent,
  CtrlTimeSpanDialogComponent,
  CtrlTimePrimitiveComponent,
  CtrlTypeComponent,
  FormCreateEntityComponent,
  FormGroupComponent,
  FormArrayComponent,
  FormFieldHeaderComponent,
  FormControlComponent,
  ClassesAndTypesSelectComponent,
  ChooseClassDialogComponent,
  ExistenceTimeHelpComponent,
  AddDialogComponent,
  AddOrCreateEntityDialogComponent,
  SearchExistingEntityComponent,
  EntityAddExistingHitComponent,
  FgPlaceComponent,
  FgLangStringComponent,
  FgDimensionComponent,
  FgAppellationTeEnComponent,
  SubfieldComponent,
  SubfieldDialogComponent,
  FieldLabelComponent,
  EntityWithFieldsComponent,
  EntityFieldComponent,
  EntityCardComponent,
  EntityCardWrapperComponent,
  EntityCardHeaderComponent,

]

const baseModules = [
  NgbModule, // TODO remove all dependencies and then the module
  CommonModule,
  DndModule,
  ReactiveFormsModule,
  MaterialModule,
  EntityPreviewModule,
  OntoInfoModule,
  QuillModule,
  ControlMessagesModule,
  PassiveLinkModule,
  DateTimeModule,
  DateTimeModule,
  KeysModule,
  TruncateModule,
  QuillOpsToStrModule,
  FormFactoryModule,
  EntityPreviewsPaginatedModule,
  EntityLabelConfigModule,
  // ReduxQueriesModule
]

@NgModule({
  imports: baseModules,
  declarations: components,
  providers: [
    PaginationService,
    TimeSpanService,
    PropertiesTreeService,
    ValidationService,
    BaseModalsService
  ],
  exports: [
    ...components,
    ...baseModules
  ]
})
export class BaseModule { }
