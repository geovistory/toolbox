import { NgReduxFormModule } from '@angular-redux/form';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule, MatMenuModule, MatTabsModule, MatTooltipModule, MatTreeModule, MatSlideToggleModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from 'app/core';
import { TimelineModule } from 'app/modules/timeline/timeline.module';
import { ControlMessagesModule, FilterByKeyModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from 'app/shared';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { HighlightModule } from 'app/shared/pipes/highlight/highlight.module';
import { InfTimePrimitivePipeModule } from 'app/shared/pipes/inf-time-primitive/inf-time-primitive.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { PeItStrModule } from 'app/shared/pipes/pe-it-str/pe-it-str.module';
import { QuillOpsToStrModule } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TableModule } from 'ngx-easy-table';
import { TreeviewModule } from 'ngx-treeview';
import { AutofocusModule } from '../../shared/directives/autofocus/autofocus.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { GvAngularCesiumModule } from '../gv-angular-cesium/angular-cesium.module';
import { QuillModule } from '../quill';
import { AppeLangCreateCtrlAPIActions } from './appe-lang/appe-lang-create-ctrl/api/appe-lang-create-ctrl.actions';
import { AppeLangCreateCtrlAPIEpics } from './appe-lang/appe-lang-create-ctrl/api/appe-lang-create-ctrl.epics';
import { AppeLangCreateCtrlComponent } from './appe-lang/appe-lang-create-ctrl/appe-lang-create-ctrl.component';
import { AddInfoPeItComponent } from './components/add-info-pe-it/add-info-pe-it.component';
import { AddInfoTeEntComponent } from './components/add-info-te-ent/add-info-te-ent.component';
import { AddOrCreateEntityModal } from './components/add-or-create-entity-modal/add-or-create-entity-modal.component';
import { ClassInfoComponent } from './components/class-info/class-info.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { EntityAddExistingHitComponent } from './components/entity-add-existing-hit/entity-add-existing-hit.component';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { ExpressionComponent } from './components/expression/expression.component';
import { FieldHeaderComponent } from './components/field-header/field-header.component';
import { LeafPeItLabelComponent } from './components/leaf-pe-it-label/leaf-pe-it-label.component';
import { PeItLabelComponent } from './components/pe-it-label/pe-it-label.component';
import { TeEntHeaderComponent } from './components/te-ent-header/te-ent-header.component';
import { TeEntLabelComponent } from './components/te-ent-label/te-ent-label.component';
import { TextPropertyComponent } from './components/text-property/text-property.component';
import { ClassAndTypeSelectorAPIActions } from './containers/class-and-type-selector/api/class-and-type-selector.actions';
import { ClassAndTypeSelectorAPIEpics } from './containers/class-and-type-selector/api/class-and-type-selector.epics';
import { ClassAndTypeSelectorComponent } from './containers/class-and-type-selector/class-and-type-selector.component';
import { CreateOrAddEntityAPIActions } from './containers/create-or-add-entity/api/create-or-add-entity.actions';
import { CreateOrAddEntityAPIEpics } from './containers/create-or-add-entity/api/create-or-add-entity.epics';
import { CreateOrAddEntityComponent } from './containers/create-or-add-entity/create-or-add-entity.component';
import { InformationAPIActions } from './containers/entity-list/api/entity-list.actions';
import { InformationAPIEpics } from './containers/entity-list/api/entity-list.epics';
import { InformationComponent } from './containers/entity-list/entity-list.component';
import { ListAPIActions } from './containers/list/api/list.actions';
import { ListAPIEpics } from './containers/list/api/list.epics';
import { ListComponent } from './containers/list/list.component';
import { MapComponent } from './containers/map/map.component';
import { PeItLayerComponent } from './containers/pe-it-layer/pe-it-layer.component';
import { PeItSearchExistingAPIActions } from './containers/pe-it-search-existing/api/pe-it-search-existing.actions';
import { PeItSearchExistingAPIEpics } from './containers/pe-it-search-existing/api/pe-it-search-existing.epics';
import { PeItSearchExistingComponent } from './containers/pe-it-search-existing/pe-it-search-existing.component';
import { PeItTimelineComponent } from './containers/pe-it-timeline/pe-it-timeline.component';
import { PolygonsEditorLayerComponent } from './containers/polygons-editor-layer/polygons-editor-layer.component';
import { ReprosAPIActions } from './containers/repros/api/repros.actions';
import { ReprosAPIEpics } from './containers/repros/api/repros.epics';
import { ReprosComponent } from './containers/repros/repros.component';
import { TextPropertyFieldAPIActions } from './containers/text-property-field/api/text-property-field.actions';
import { TextPropertyFieldAPIEpics } from './containers/text-property-field/api/text-property-field.epics';
import { TextPropertyFieldComponent } from './containers/text-property-field/text-property-field.component';
import { EntityAssociationAPIActions } from './entity-association/api/entity-association.actions';
import { EntityAssociationAPIEpics } from './entity-association/api/entity-association.epics';
import { EntityAssociationCreateCtrlComponent } from './entity-association/entity-association-create-ctrl/entity-association-create-ctrl.component';
import { EntityAssociationCreateOrAddComponent } from './entity-association/entity-association-create-or-add/entity-association-create-or-add.component';
import { EntityAssociationExistingListComponent } from './entity-association/entity-association-existing-list/entity-association-existing-list.component';
import { EntityActions } from './entity/entity.actions';
import { EntityAPIEpics } from './entity/entity.epics';
import { PeItAddCtrlComponent } from './entity/pe-it/pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItCreateCtrlComponent } from './entity/pe-it/pe-it-create-ctrl/pe-it-create-ctrl.component';
import { PeItCreateFormComponent } from './entity/pe-it/pe-it-create-form/pe-it-create-form.component';
import { PeItDetailComponent } from './containers/pe-it-detail/pe-it-detail.component';
import { PeItActions } from './entity/pe-it/pe-it.actions';
import { TeEntAddCtrlComponent } from './entity/te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntCreateCtrlComponent } from './entity/te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { TeEntEditableComponent } from './entity/te-ent/te-ent-editable/te-ent-editable.component';
import { TeEntActions } from './entity/te-ent/te-ent.actions';
import { TeEntAPIEpics } from './entity/te-ent/te-ent.epics';
import { ExistenceTimeAddCtrlComponent } from './existence-time/existence-time-add-ctrl/existence-time-add-ctrl.component';
import { ExistenceTimeEditComponent } from './existence-time/existence-time-edit/existence-time-edit.component';
import { ExistenceTimeEditableComponent } from './existence-time/existence-time-editable/existence-time-editable.component';
import { ExistenceTimeHelpComponent } from './existence-time/existence-time-help/existence-time-help.component';
import { ExistenceTimeModalComponent } from './existence-time/existence-time-modal/existence-time-modal.component';
import { ExistenceTimeActions } from './existence-time/existence-time.actions';
import { InformationRoutingModule } from './information-routing.module';
import { ExTimePropertyFieldAddCtrlComponent } from './property-field/ex-time/ex-time-property-field-add-ctrl/ex-time-property-field-add-ctrl.component';
import { ExTimePropertyFieldCreateCtrlComponent } from './property-field/ex-time/ex-time-property-field-create-ctrl/ex-time-property-field-create-ctrl.component';
import { ExTimePropertyFieldEditableComponent } from './property-field/ex-time/ex-time-property-field-editable/ex-time-property-field-editable.component';
import { ExTimePropertyFieldFormComponent } from './property-field/ex-time/ex-time-property-field-form/ex-time-property-field-form.component';
import { PeItPropertyFieldAddCtrlComponent } from './property-field/pe-it/pe-it-property-field-add-ctrl/pe-it-property-field-add-ctrl.component';
import { PeItPropertyFieldCreateCtrlComponent } from './property-field/pe-it/pe-it-property-field-create-ctrl/pe-it-property-field-create-ctrl.component';
import { PeItPropertyFieldEditableComponent } from './property-field/pe-it/pe-it-property-field-editable/pe-it-property-field-editable.component';
import { PeItPropertyFieldFormComponent } from './property-field/pe-it/pe-it-property-field-form/pe-it-property-field-form.component';
import { PropertyFieldActions } from './property-field/property-field.actions';
import { PropertyFieldApiEpics } from './property-field/property-field.epics';
import { TeEntPropertyFieldAddCtrlComponent } from './property-field/te-ent/te-ent-property-field-add-ctrl/te-ent-property-field-add-ctrl.component';
import { TeEntPropertyFieldCreateCtrlComponent } from './property-field/te-ent/te-ent-property-field-create-ctrl/te-ent-property-field-create-ctrl.component';
import { TeEntPropertyFieldEditableComponent } from './property-field/te-ent/te-ent-property-field-editable/te-ent-property-field-editable.component';
import { TeEntPropertyFieldFormComponent } from './property-field/te-ent/te-ent-property-field-form/te-ent-property-field-form.component';
import { PeItRoleAddCtrlComponent } from './role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { PeItRoleCreateCtrlComponent } from './role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { PeItRoleEditableComponent } from './role/pe-it/pe-it-role-editable/pe-it-role-editable.component';
import { RoleActions } from './role/role.actions';
import { TeEntRoleAddCtrlComponent } from './role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import { TeEntRoleCreateCtrlComponent } from './role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { TeEntRoleEditableComponent } from './role/te-ent/te-ent-role-editable/te-ent-role-editable.component';
import { AppellationService } from './shared/appellation.service';
import { ClassService } from './shared/class.service';
import { EprService } from './shared/epr.service';
import { PeItService } from './shared/pe-it.service';
import { PropertyFieldService } from './shared/property-field.service';
import { PropertyService } from './shared/property.service';
import { RoleService } from './shared/role.service';
import { TeEntService } from './shared/te-ent.service';
import { TypeCtrlAPIActions } from './type/type-ctrl/api/type-ctrl.actions';
import { TypeCtrlAPIEpics } from './type/type-ctrl/api/type-ctrl.epics';
import { TypeCtrlComponent } from './type/type-ctrl/type-ctrl.component';
import { TypeEditableAPIActions } from './type/type-editable/api/type-editable.actions';
import { TypeEditableAPIEpics } from './type/type-editable/api/type-editable.epics';
import { TypeEditableComponent } from './type/type-editable/type-editable.component';
import { AppellationCtrlComponent } from './value/appellation-ctrl/appellation-ctrl.component';
import { AppellationViewComponent } from './value/appellation-view/appellation-view.component';
import { LanguageCtrlComponent } from './value/language-ctrl/language-ctrl.component';
import { LanguageViewComponent } from './value/language-view/language-view.component';
import { LeafPeItCtrlComponent } from './value/leaf-pe-it-ctrl/leaf-pe-it-ctrl.component';
import { LeafPeItViewAPIActions } from './value/leaf-pe-it-view/api/leaf-pe-it-view.actions';
import { LeafPeItViewModalComponent } from './value/leaf-pe-it-view/leaf-pe-it-view-modal/leaf-pe-it-view-modal.component';
import { LeafPeItViewComponent } from './value/leaf-pe-it-view/leaf-pe-it-view.component';
import { PlaceCtrlComponent } from './value/place-ctrl/place-ctrl.component';
import { PlaceViewComponent } from './value/place-view/place-view.component';
import { TimePrimitiveCtrlComponent } from './value/time-primitive-ctrl/time-primitive-ctrl.component';
import { TimePrimitiveViewComponent } from './value/time-primitive-view/time-primitive-view.component';
import { AnnotationModule } from '../annotation/annotation.module';
import { TileHeaderModule } from '../../shared/components/tile-header/tile-header.module';
import { AngularSplitModule } from '../../../../node_modules/angular-split';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { PeItDetailAPIEpics } from './containers/pe-it-detail/api/pe-it-detail.epics';
import { PeItDetailAPIActions } from './containers/pe-it-detail/api/pe-it-detail.actions';
import { TeEntDetailAPIEpics } from './entity/te-ent/te-ent-editable/api/te-ent-detail.epics';
import { TeEntDetailAPIActions } from './entity/te-ent/te-ent-editable/api/te-ent-detail.actions';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    GvAngularCesiumModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    NgReduxFormModule,
    SlimLoadingBarModule,
    NgbModule,
    // ElasticInputModule,

    // SDKBrowserModule,
    InformationRoutingModule,

    // App wide reusable components
    LanguageSearchTypeaheadModule,
    ControlMessagesModule,
    PassiveLinkModule,
    AutofocusModule,
    DimensionChangeModule,
    TimelineModule,
    KeysModule,
    FilterByKeyModule,
    PeItStrModule,
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
    CdkTreeModule, // Check if still used
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatSlideToggleModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    EntityPreviewModule,
    AnnotationModule,
    TileHeaderModule

  ],
  declarations: [
    InformationComponent,
    EntitySearchHitComponent,
    EntityAddExistingHitComponent,
    PeItTimelineComponent,

    // PeIt specific user interfaces
    MapComponent,
    PeItLayerComponent,
    PolygonsEditorLayerComponent,
    ReprosComponent,

    // Add Modal
    // EntityAddAddExistingComponent,
    // EntityAddChooseClassComponent,
    // EntityAddCreateNewComponent,
    // EntityAddModalComponent,
    // EntityAddSearchExistingComponent,

    // Classe and Type select
    ClassAndTypeSelectorComponent,

    // Entity > PeIt
    PeItAddCtrlComponent,
    PeItCreateCtrlComponent,
    PeItDetailComponent,
    PeItCreateFormComponent,

    // Entity > TeEnt
    TeEntAddCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntEditableComponent,

    // Existence Time
    ExistenceTimeEditableComponent,
    ExistenceTimeAddCtrlComponent,

    // Appe Lang
    AppeLangCreateCtrlComponent,

    // Property Field
    PeItPropertyFieldAddCtrlComponent,
    PeItPropertyFieldCreateCtrlComponent,
    PeItPropertyFieldEditableComponent,
    PeItPropertyFieldFormComponent,
    TeEntPropertyFieldAddCtrlComponent,
    TeEntPropertyFieldCreateCtrlComponent,
    TeEntPropertyFieldEditableComponent,
    TeEntPropertyFieldFormComponent,
    ExTimePropertyFieldFormComponent,
    ExTimePropertyFieldAddCtrlComponent,
    ExTimePropertyFieldCreateCtrlComponent,
    ExistenceTimeModalComponent,

    // Role
    PeItRoleAddCtrlComponent,
    PeItRoleCreateCtrlComponent,
    PeItRoleEditableComponent,
    TeEntRoleAddCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    TeEntRoleEditableComponent,

    // EntityAssociation
    EntityAssociationCreateCtrlComponent,

    // Value
    AppellationCtrlComponent,
    AppellationViewComponent,
    LanguageCtrlComponent,
    LanguageViewComponent,
    LeafPeItCtrlComponent,
    LeafPeItViewComponent,
    LeafPeItViewModalComponent,
    ExistenceTimeEditComponent,
    TimePrimitiveCtrlComponent,
    TimePrimitiveViewComponent,
    ExTimePropertyFieldEditableComponent,
    PlaceCtrlComponent,
    PlaceViewComponent,
    ExistenceTimeHelpComponent,

    // Type
    TypeEditableComponent,

    // Reusable
    TeEntLabelComponent,
    PeItLabelComponent,
    LeafPeItLabelComponent,
    AddInfoTeEntComponent,
    AddInfoPeItComponent,
    TextPropertyComponent,
    EditorHeaderComponent,
    ClassInfoComponent,
    TypeCtrlComponent,
    FieldHeaderComponent,
    TeEntHeaderComponent,
    CreateOrAddEntityComponent,
    PeItSearchExistingComponent,
    ListComponent,
    EntityAssociationCreateCtrlComponent,
    EntityAssociationCreateOrAddComponent,
    EntityAssociationExistingListComponent,
    TextPropertyFieldComponent,
    ExpressionComponent,
    AddOrCreateEntityModal
  ],
  providers: [

    // Information (root)
    InformationAPIActions,
    InformationAPIEpics,

    // List
    ListAPIActions,
    ListAPIEpics,

    // Classe and Type select
    ClassAndTypeSelectorAPIActions,
    ClassAndTypeSelectorAPIEpics,

    // Entity
    ListAPIEpics,
    ListAPIActions,
    EntityAPIEpics,
    EntityActions,
    PeItActions,
    PeItDetailAPIEpics,
    PeItDetailAPIActions,
    TeEntDetailAPIEpics,
    TeEntDetailAPIActions,
    TeEntActions,
    TeEntAPIEpics,

    // PeIt specific user interfaces
    ReprosAPIActions,
    ReprosAPIEpics,

    // Existence Time
    ExistenceTimeActions,

    // Appe Lang
    AppeLangCreateCtrlAPIActions,
    AppeLangCreateCtrlAPIEpics,

    // Fields
    PropertyFieldActions,
    PropertyFieldApiEpics,
    TextPropertyFieldAPIActions,
    TextPropertyFieldAPIEpics,

    // Role
    RoleActions,

    // Entity Association
    EntityAssociationAPIEpics,
    EntityAssociationAPIActions,

    // Value
    AppellationService,
    LeafPeItViewAPIActions,

    // Type
    TypeEditableAPIActions,
    TypeEditableAPIEpics,
    TypeCtrlAPIActions,
    TypeCtrlAPIEpics,

    // Shared
    PeItService,
    TeEntService,
    ClassService,
    PropertyService,
    RoleService,
    EprService,
    PropertyFieldService,
    ValidationService,

    CreateOrAddEntityAPIActions,
    CreateOrAddEntityAPIEpics,
    PeItSearchExistingAPIActions,
    PeItSearchExistingAPIEpics,



  ],
  exports: [
    // Put all components here, that are used by another module, or in a sandbox
    InformationComponent,

    // Add Modal
    // EntityAddModalComponent,

    // Classe and Type select
    ClassAndTypeSelectorComponent,

    // Entity > PeIt
    PeItAddCtrlComponent,
    PeItCreateCtrlComponent,
    PeItDetailComponent,
    PeItCreateFormComponent,

    // PeIt specific user interfaces
    ReprosComponent,

    // Entity > TeEnt
    TeEntAddCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntEditableComponent,

    // Existence Time
    ExistenceTimeEditableComponent,
    ExistenceTimeAddCtrlComponent,
    AppeLangCreateCtrlComponent,

    // Property Field
    PeItPropertyFieldAddCtrlComponent,
    PeItPropertyFieldCreateCtrlComponent,
    PeItPropertyFieldEditableComponent,
    PeItPropertyFieldFormComponent,
    TeEntPropertyFieldAddCtrlComponent,
    TeEntPropertyFieldCreateCtrlComponent,
    TeEntPropertyFieldEditableComponent,
    TeEntPropertyFieldFormComponent,

    // Role
    PeItRoleAddCtrlComponent,
    PeItRoleCreateCtrlComponent,
    PeItRoleEditableComponent,
    TeEntRoleAddCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    TeEntRoleEditableComponent,

    // Entity Association
    EntityAssociationCreateCtrlComponent,

    // Value
    AppellationCtrlComponent,
    AppellationViewComponent,
    LanguageCtrlComponent,
    LanguageViewComponent,
    LeafPeItCtrlComponent,
    LeafPeItViewComponent,
    TimePrimitiveCtrlComponent,
    TimePrimitiveViewComponent,
    PlaceCtrlComponent,
    PlaceViewComponent,

    // Type
    TypeEditableComponent,
    TypeCtrlComponent,

    // Reusable
    TextPropertyComponent,
    TeEntLabelComponent,
    CreateOrAddEntityComponent,
    PeItSearchExistingComponent,
    ListComponent,
    TeEntLabelComponent,
    PeItLabelComponent,
    ClassInfoComponent,
    EditorHeaderComponent,

  ],
  entryComponents: [
    LeafPeItViewModalComponent,
    ExistenceTimeModalComponent,
    AddOrCreateEntityModal
  ]
})
export class Information2Module { }
