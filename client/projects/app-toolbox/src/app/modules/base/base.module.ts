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
import { OpenCloseModule } from '../../shared/directives/open-close/open-close.module';
import { EntityLabelConfigModule } from '../../shared/modules/entity-label-config/entity-label-config.module';
import { AbbreviateModule } from '../../shared/pipes/abbreviate/abbreviate.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { QuillModule } from '../quill';
import { AddEntityMenuClassItemComponent } from './components/add-entity-menu-class-item/add-entity-menu-class-item.component';
import { AddEntityMenuTypeItemComponent } from './components/add-entity-menu-type-item/add-entity-menu-type-item.component';
import { AddEntityMenuComponent } from './components/add-entity-menu/add-entity-menu.component';
import { AddEntityOrValueDialogComponent } from './components/add-entity-or-value-dialog/add-entity-or-value-dialog.component';
import { AddStatementDialogComponent } from './components/add-statement-dialog/add-statement-dialog.component';
import { ChooseClassDialogComponent } from './components/choose-class-dialog/choose-class-dialog.component';
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
import { EntityFieldTimeSpanComponent } from './components/entity-field-time-span/entity-field-time-span.component';
import { EntityFieldComponent } from './components/entity-field/entity-field.component';
import { EntityWithFieldsComponent } from './components/entity-with-fields/entity-with-fields.component';
import { FgAppellationTeEnComponent } from './components/fg-appellation-te-en/fg-appellation-te-en.component';
import { FgDimensionComponent } from './components/fg-dimension/fg-dimension.component';
import { FgLangStringComponent } from './components/fg-lang-string/fg-lang-string.component';
import { FgPlaceComponent } from './components/fg-place/fg-place.component';
import { FieldLabelComponent } from './components/field-label/field-label.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormCreateDataComponent } from './components/form-create-data/form-create-data.component';
import { FormFieldHeaderComponent } from './components/form-field-header/form-field-header.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormSectionHeaderComponent } from './components/form-section-header/form-section-header.component';
import { HbfPanelComponent } from './components/hbf-panel/hbf-panel.component';
import { SearchExistingEntityComponent } from './components/search-existing-entity/search-existing-entity.component';
import { SliderComponent } from './components/slider/slider.component';
import { TypeItemComponent } from './components/type-item/type-item.component';
import { ViewFieldBodyComponent } from './components/view-field-body/view-field-body.component';
import { ViewFieldDialogComponent } from './components/view-field-dialog/view-field-dialog.component';
import { ViewFieldHeaderComponent } from './components/view-field-header/view-field-header.component';
import { ViewFieldItemClassInfoComponent } from './components/view-field-item-class-info/view-field-item-class-info.component';
import { ViewFieldItemEntityMenuComponent } from './components/view-field-item-entity-menu/view-field-item-entity-menu.component';
import { ViewFieldItemLayoutComponent } from './components/view-field-item-layout/view-field-item-layout.component';
import { ViewFieldItemNestedComponent } from './components/view-field-item-nested/view-field-item-nested.component';
import { ViewFieldItemPreviewComponent } from './components/view-field-item-preview/view-field-item-preview.component';
import { ViewFieldItemTimePrimitiveComponent } from './components/view-field-item-time-primitive/view-field-item-time-primitive.component';
import { ViewFieldItemValueComponent } from './components/view-field-item-value/view-field-item-value.component';
import { ViewFieldItemComponent } from './components/view-field-item/view-field-item.component';
import { ViewFieldComponent } from './components/view-field/view-field.component';
import { ViewSectionBodyComponent } from './components/view-section-body/view-section-body.component';
import { ViewSectionHeaderComponent } from './components/view-section-header/view-section-header.component';
import { ViewSectionComponent } from './components/view-section/view-section.component';
import { ViewSectionsDialogComponent } from './components/view-sections-dialog/view-sections-dialog.component';
import { ViewSectionsComponent } from './components/view-sections/view-sections.component';
import { ViewTimeSpanHelpDialogComponent } from './components/view-time-span-help-dialog/view-time-span-help-dialog.component';
import { ViewTimeSpanItemEditBtnComponent } from './components/view-time-span-item-edit-btn/view-time-span-item-edit-btn.component';
import { ViewTimeSpanItemPreviewComponent } from './components/view-time-span-item-preview/view-time-span-item-preview.component';
import { ViewTimeSpanItemComponent } from './components/view-time-span-item/view-time-span-item.component';
import { ViewTimeSpanSectionBodyComponent } from './components/view-time-span-section-body/view-time-span-section-body.component';
import { ViewTimeSpanSectionHeaderComponent } from './components/view-time-span-section-header/view-time-span-section-header.component';
import { ViewTimeSpanSectionComponent } from './components/view-time-span-section/view-time-span-section.component';
import { BaseModalsService } from './services/base-modals.service';
import { PaginationService } from './services/pagination.service';
import { TimeSpanService } from './services/time-span.service';

const components = [
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
  FormCreateDataComponent,
  FormGroupComponent,
  FormArrayComponent,
  FormFieldHeaderComponent,
  FormSectionHeaderComponent,
  FormControlComponent,
  AddEntityMenuComponent,
  AddEntityMenuClassItemComponent,
  AddEntityMenuTypeItemComponent,
  ChooseClassDialogComponent,
  ExistenceTimeHelpComponent,
  AddStatementDialogComponent,
  AddEntityOrValueDialogComponent,
  SearchExistingEntityComponent,
  EntityAddExistingHitComponent,
  FgPlaceComponent,
  FgLangStringComponent,
  FgDimensionComponent,
  FgAppellationTeEnComponent,
  FieldLabelComponent,
  EntityWithFieldsComponent,
  EntityFieldComponent,
  EntityFieldTimeSpanComponent,
  SliderComponent,
  HbfPanelComponent,
  EntityCardComponent,
  EntityCardWrapperComponent,
  EntityCardHeaderComponent,
  ViewSectionsComponent,
  ViewSectionComponent,
  ViewSectionsDialogComponent,
  ViewSectionBodyComponent,
  ViewSectionHeaderComponent,
  ViewFieldComponent,
  ViewFieldDialogComponent,
  ViewFieldBodyComponent,
  ViewFieldHeaderComponent,
  ViewFieldItemComponent,
  ViewFieldItemClassInfoComponent,
  ViewFieldItemPreviewComponent,
  ViewFieldItemNestedComponent,
  ViewFieldItemEntityMenuComponent,
  ViewFieldItemTimePrimitiveComponent,
  ViewFieldItemValueComponent,
  ViewFieldItemLayoutComponent,
  ViewTimeSpanItemPreviewComponent,
  ViewTimeSpanSectionComponent,
  ViewTimeSpanSectionHeaderComponent,
  ViewTimeSpanSectionBodyComponent,
  ViewTimeSpanItemComponent,
  ViewTimeSpanItemEditBtnComponent,
  ViewTimeSpanHelpDialogComponent,
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
  AbbreviateModule,
  TruncateModule,
  QuillOpsToStrModule,
  FormFactoryModule,
  EntityPreviewsPaginatedModule,
  EntityLabelConfigModule,
  OpenCloseModule
]

@NgModule({
  imports: baseModules,
  declarations: components,
  providers: [
    PaginationService,
    TimeSpanService,
    ValidationService,
    BaseModalsService
  ],
  exports: [
    ...components,
    ...baseModules
  ]
})
export class BaseModule { }
