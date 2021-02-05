import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'app/core/material/material.module';
import { ValidationService } from 'app/core/validation/validation.service';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { OntoInfoModule } from 'app/shared/components/onto-info/onto-info.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { QuillOpsToStrModule } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { TruncateModule } from 'app/shared/pipes/truncate/truncate.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { QuillModule } from '../quill';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { AddOrCreateEntityDialogComponent } from './components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';
import { ChooseClassDialogComponent } from './components/choose-class-dialog/choose-class-dialog.component';
import { ClassesAndTypesSelectComponent } from './components/classes-and-types-select/classes-and-types-select.component';
import { CtrlAppellationComponent } from './components/ctrl-appellation/ctrl-appellation.component';
import { CtrlEntityComponent } from './components/ctrl-entity/ctrl-entity.component';
import { CtrlLangStringComponent } from './components/ctrl-lang-string/ctrl-lang-string.component';
import { CtrlLanguageComponent } from './components/ctrl-language/ctrl-language.component';
import { CtrlPlaceComponent } from './components/ctrl-place/ctrl-place.component';
import { CtrlTextPropertyComponent } from './components/ctrl-text-property/ctrl-text-property.component';
import { CtrlTimePrimitiveComponent } from './components/ctrl-time-primitive/ctrl-time-primitive.component';
import { CtrlTimeSpanDialogComponent } from './components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { CtrlTimeSpanComponent } from './components/ctrl-time-span/ctrl-time-span.component';
import { ExistenceTimeHelpComponent } from './components/ctrl-time-span/existence-time-help/existence-time-help.component';
import { CtrlTypeComponent } from './components/ctrl-type/ctrl-type.component';
import { EntityAddExistingHitComponent } from './components/entity-add-existing-hit/entity-add-existing-hit.component';
import { FieldComponent } from './components/field/field.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormCreateEntityComponent } from './components/form-create-entity/form-create-entity.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { LeafItemAddListComponent } from './components/leaf-item-add-list/leaf-item-add-list.component';
import { LeafItemListComponent } from './components/leaf-item-list/leaf-item-list.component';
import { SearchExistingEntityComponent } from './components/search-existing-entity/search-existing-entity.component';
import { PropertiesTreeDialogComponent } from './components/properties-tree-dialog/properties-tree-dialog.component';
import { PropertiesTreeComponent } from './components/properties-tree/properties-tree.component';
import { PropertiesTreeService } from './components/properties-tree/properties-tree.service';
import { TemporalEntityAddListComponent } from './components/temporal-entity-add-list/temporal-entity-add-list.component';
import { TemporalEntityListComponent } from './components/temporal-entity-list/temporal-entity-list.component';
import { TimeSpanListComponent } from './components/time-span-list/time-span-list.component';
import { TypeItemComponent } from './components/type-item/type-item.component';
import { ConfigurationPipesService } from 'app/core/redux-queries/services/configuration-pipes.service';
import { InformationBasicPipesService } from './services/information-basic-pipes.service';
import { InformationPipesService } from './services/information-pipes.service';
import { PaginationService } from './services/pagination.service';
import { TimeSpanService } from './services/time-span.service';
import { FgPlaceComponent } from './components/fg-place/fg-place.component';
import { FgTextPropertyComponent } from './components/fg-text-property/fg-text-property.component';
import { FgLangStringComponent } from './components/fg-lang-string/fg-lang-string.component';
import { CtrlEntityDialogComponent } from './components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { EntityPreviewsPaginatedModule } from 'app/shared/components/entity-previews-paginated/entity-previews-paginated.module';
import { FgDimensionComponent } from './components/fg-dimension/fg-dimension.component';
import { SubfieldType } from './components/properties-tree/properties-tree.models';

const components = [
  PropertiesTreeComponent,
  PropertiesTreeDialogComponent,
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
  CtrlEntityDialogComponent,
  CtrlTextPropertyComponent,
  CtrlLangStringComponent,
  CtrlTimeSpanComponent,
  CtrlTimeSpanDialogComponent,
  CtrlTimePrimitiveComponent,
  CtrlTypeComponent,
  FormCreateEntityComponent,
  FormGroupComponent,
  FormArrayComponent,
  FormControlComponent,
  ClassesAndTypesSelectComponent,
  ChooseClassDialogComponent,
  ExistenceTimeHelpComponent,
  AddDialogComponent,
  AddOrCreateEntityDialogComponent,
  SearchExistingEntityComponent,
  EntityAddExistingHitComponent,
  FgPlaceComponent,
  FgTextPropertyComponent,
  FgLangStringComponent,
  FgDimensionComponent
]

const baseModules = [
  NgbModule, // TODO remove all dependencies and then the module
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
  QuillOpsToStrModule,
  FormFactoryModule,
  EntityPreviewsPaginatedModule
]

@NgModule({
  imports: baseModules,
  declarations: components,
  providers: [
    PaginationService,
    ConfigurationPipesService,
    InformationPipesService,
    InformationBasicPipesService,
    TimeSpanService,
    PropertiesTreeService,
    ValidationService,
  ],
  exports: [
    ...components,
    ...baseModules
  ],
  entryComponents: [
    ChooseClassDialogComponent,
    CtrlTimeSpanDialogComponent,
    CtrlEntityDialogComponent,
    PropertiesTreeDialogComponent,
    AddDialogComponent,
    AddOrCreateEntityDialogComponent,
    FgPlaceComponent,
    FgTextPropertyComponent,
    FgLangStringComponent,
    FgDimensionComponent
  ]
})
export class BaseModule { }

/**
 * returns true if the subfield type is representing a value object type
 * @param subfieldType
 */
export function isValueObjectSubfield(subfieldType: SubfieldType): boolean {
  if (subfieldType.appellation) return true
  else if (subfieldType.language) return true
  else if (subfieldType.place) return true
  else if (subfieldType.timePrimitive) return true
  else if (subfieldType.langString) return true
  else if (subfieldType.dimension) return true

  return false
}


/**
 * returns true if the subfield type is a 'leaf item' meaning a
 * value object type or entity preview.
 * It returns false if the subfield type is temporalEntity, typeItem or timeSpan
 * @param subfieldType
 */
export function isLeafItemSubfield(subfieldType: SubfieldType): boolean {
  if (isValueObjectSubfield(subfieldType)) return true
  else if (subfieldType.entityPreview) return true
  return false
}
