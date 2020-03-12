import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from 'app/core';
import { TimelineModule } from 'app/modules/timeline/timeline.module';
import { ControlMessagesModule, FilterByKeyModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from 'app/shared';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { OntoInfoModule } from 'app/shared/components/onto-info/onto-info.module';
import { HighlightModule } from 'app/shared/pipes/highlight/highlight.module';
import { InfTimePrimitivePipeModule } from 'app/shared/pipes/inf-time-primitive/inf-time-primitive.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { QuillOpsToStrModule } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { TruncateModule } from 'app/shared/pipes/truncate/truncate.module';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'ngx-easy-table';
import { TreeviewModule } from 'ngx-treeview';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { TileHeaderModule } from '../../shared/components/tile-header/tile-header.module';
import { AutofocusModule } from '../../shared/directives/autofocus/autofocus.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { AnnotationModule } from '../annotation/annotation.module';
import { FormFactoryModule } from '../form-factory/form-factory.module';
import { QuillModule } from '../quill';
import { AddOrCreateEntityModal } from './components/add-or-create-entity-modal/add-or-create-entity-modal.component';
import { ContentTreeComponent } from './components/content-tree/content-tree.component';
import { EntityAddExistingHitComponent } from './components/entity-add-existing-hit/entity-add-existing-hit.component';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { CreateOrAddEntityComponent } from './containers/create-or-add-entity/create-or-add-entity.component';
import { InformationAPIActions } from './containers/entity-list/api/entity-list.actions';
import { InformationAPIEpics } from './containers/entity-list/api/entity-list.epics';
import { InformationComponent } from './containers/entity-list/entity-list.component';
import { ListAPIActions } from './containers/list/api/list.actions';
import { ListAPIEpics } from './containers/list/api/list.epics';
import { ListComponent } from './containers/list/list.component';
import { EntityActions } from './containers/pe-it-detail/api/entity.actions';
import { PeItDetailAPIActions } from './containers/pe-it-detail/api/pe-it-detail.actions';
import { PeItActions } from './containers/pe-it-detail/api/pe-it.actions';
import { PeItDetailComponent } from './containers/pe-it-detail/pe-it-detail.component';
import { PeItSearchExistingComponent } from './containers/pe-it-search-existing/pe-it-search-existing.component';
import { TeEntDetailAPIActions } from './containers/te-ent-detail/api/te-ent-detail.actions';
import { TeEntActions } from './containers/te-ent-detail/api/te-ent.actions';
import { TeEntDetailComponent } from './containers/te-ent-detail/te-ent-detail.component';
import { InformationRoutingModule } from './information-routing.module';
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
import { AngularSplitModule } from 'app/core/split/module';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FormFactoryModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    SlimLoadingBarModule,
    NgbModule,
    InformationRoutingModule,
    LanguageSearchTypeaheadModule,
    ControlMessagesModule,
    PassiveLinkModule,
    AutofocusModule,
    DimensionChangeModule,
    TimelineModule,
    KeysModule,
    FilterByKeyModule,
    HighlightModule,
    DndModule,
    QuillModule,
    TreeviewModule,
    TableModule,
    QuillOpsToStrModule,
    TimePrimitivePipeModule,
    InfTimePrimitivePipeModule,
    TimeSpanPipeModule,
    DragDropModule,
    MatTooltipModule,
    MatTabsModule,
    MatTreeModule,
    CdkTreeModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    EntityPreviewModule,
    AnnotationModule,
    TileHeaderModule,
    TruncateModule,
    OntoInfoModule
  ],
  declarations: [
    InformationComponent,
    EntitySearchHitComponent,
    EntityAddExistingHitComponent,
    PeItDetailComponent,
    TeEntDetailComponent,
    CreateOrAddEntityComponent,
    PeItSearchExistingComponent,
    ListComponent,
    ContentTreeComponent,
    AddOrCreateEntityModal,
    PropertiesTreeComponent,
    ListHeaderComponent,
    TemporalEntityListComponent,
    TemporalEntityAddListComponent,
    TimeSpanListComponent,
    AddRoleComponent,
    FieldComponent,
    LeafItemListComponent,
    LeafItemAddListComponent,
    ChooseClassDialogComponent,
    FormCreateRoleComponent,
    CtrlAppellationComponent,
    CtrlLanguageComponent,
    CtrlPlaceComponent,
    CtrlEntityComponent,
    CtrlTextPropertyComponent,
    CtrlTimeSpanComponent,
    CtrlTimeSpanDialogComponent,
    CtrlTimePrimitiveComponent,
    ClassesAndTypesSelectComponent,
    CtrlTypeComponent,
    TypeItemComponent,
    FormCreateEntityComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent,
    PropertiesTreeDialogComponent,
  ],
  providers: [
    InformationAPIActions,
    InformationAPIEpics,
    ListAPIActions,
    ListAPIEpics,
    ListAPIEpics,
    ListAPIActions,
    EntityActions,
    PeItActions,
    PeItDetailAPIActions,
    TeEntDetailAPIActions,
    TeEntActions,
    ValidationService,
    InformationPipesService,
    InformationBasicPipesService,
    TimeSpanService,
    PropertiesTreeService,
    PaginationService
  ],
  exports: [
    InformationComponent,
    PeItDetailComponent,
    TeEntDetailComponent,
    CreateOrAddEntityComponent,
    PeItSearchExistingComponent,
    ListComponent,
    FormCreateRoleComponent,
    CtrlAppellationComponent,
    CtrlLanguageComponent,
    CtrlPlaceComponent,
    CtrlEntityComponent,
    CtrlTextPropertyComponent,
    CtrlTimeSpanComponent,
    CtrlTimeSpanDialogComponent,
    CtrlTimePrimitiveComponent,
    CtrlTypeComponent,
    ClassesAndTypesSelectComponent,
    FormCreateEntityComponent,
    FormGroupComponent,
    FormArrayComponent,
    FormControlComponent
  ]
})
export class Information2Module { }
