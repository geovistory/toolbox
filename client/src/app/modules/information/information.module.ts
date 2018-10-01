import { NgReduxFormModule } from '@angular-redux/form';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from 'app/core';
import { TimelineModule } from 'app/modules/timeline/timeline.module';
import { ControlMessagesModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from 'app/shared';
import { HighlightModule } from 'app/shared/pipes/highlight/highlight.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AutofocusModule } from '../../shared/directives/autofocus/autofocus.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { MentionedEntityCtrlActions } from '../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
import { GvAngularCesiumModule } from '../gv-angular-cesium/angular-cesium.module';
import { QuillModule } from '../quill';
import { EntityAddAddExistingComponent } from './add-modal/entity-add-add-existing/entity-add-add-existing.component';
import { EntityAddChooseClassComponent } from './add-modal/entity-add-choose-class/entity-add-choose-class.component';
import { EntityAddCreateNewComponent } from './add-modal/entity-add-create-new/entity-add-create-new.component';
import { EntityAddModalComponent } from './add-modal/entity-add-modal/entity-add-modal.component';
import { EntityAddSearchExistingComponent } from './add-modal/entity-add-search-existing/entity-add-search-existing.component';
import { AppeLangCreateCtrlAPIActions } from './appe-lang/appe-lang-create-ctrl/api/appe-lang-create-ctrl.actions';
import { AppeLangCreateCtrlAPIEpics } from './appe-lang/appe-lang-create-ctrl/api/appe-lang-create-ctrl.epics';
import { AppeLangCreateCtrlComponent } from './appe-lang/appe-lang-create-ctrl/appe-lang-create-ctrl.component';
import { AddInfoPeItComponent } from './components/add-info-pe-it/add-info-pe-it.component';
import { AddInfoTeEntComponent } from './components/add-info-te-ent/add-info-te-ent.component';
import { EntitySearchHitComponent } from './components/entity-search-hit/entity-search-hit.component';
import { LeafPeItLabelComponent } from './components/leaf-pe-it-label/leaf-pe-it-label.component';
import { PeItLabelComponent } from './components/pe-it-label/pe-it-label.component';
import { PeItTimelineComponent } from './components/pe-it-timeline/pe-it-timeline.component';
import { ProjectEntitiesComponent } from './components/project-entities/project-entities.component';
import { TeEntLabelComponent } from './components/te-ent-label/te-ent-label.component';
import { TextPropertyComponent } from './components/text-property/text-property.component';
import { InformationAPIActions } from './containers/information/api/information.actions';
import { InformationAPIEpics } from './containers/information/api/information.epics';
import { InformationComponent } from './containers/information/information.component';
import { MapComponent } from './containers/map/map.component';
import { PeItLayerComponent } from './containers/pe-it-layer/pe-it-layer.component';
import { PolygonsEditorLayerComponent } from './containers/polygons-editor-layer/polygons-editor-layer.component';
import { PeItApiEpics } from './data-unit/pe-it/api/pe-it.epics';
import { PeItAddCtrlComponent } from './data-unit/pe-it/pe-it-add-ctrl/pe-it-add-ctrl.component';
import { PeItAddFormComponent } from './data-unit/pe-it/pe-it-add-form/pe-it-add-form.component';
import { PeItCreateCtrlComponent } from './data-unit/pe-it/pe-it-create-ctrl/pe-it-create-ctrl.component';
import { PeItCreateFormComponent } from './data-unit/pe-it/pe-it-create-form/pe-it-create-form.component';
import { PeItEditableComponent } from './data-unit/pe-it/pe-it-editable/pe-it-editable.component';
import { PeItActions } from './data-unit/pe-it/pe-it.actions';
import { TeEntAddCtrlComponent } from './data-unit/te-ent/te-ent-add-ctrl/te-ent-add-ctrl.component';
import { TeEntCreateCtrlComponent } from './data-unit/te-ent/te-ent-create-ctrl/te-ent-create-ctrl.component';
import { TeEntEditableComponent } from './data-unit/te-ent/te-ent-editable/te-ent-editable.component';
import { TeEntActions } from './data-unit/te-ent/te-ent.actions';
import { TeEntAPIEpics } from './data-unit/te-ent/te-ent.epics';
import { ExistenceTimeAddCtrlComponent } from './existence-time/existence-time-add-ctrl/existence-time-add-ctrl.component';
import { ExistenceTimeEditComponent } from './existence-time/existence-time-edit/existence-time-edit.component';
import { ExistenceTimeEditableComponent } from './existence-time/existence-time-editable/existence-time-editable.component';
import { ExistenceTimeHelpComponent } from './existence-time/existence-time-help/existence-time-help.component';
import { ExistenceTimeModalComponent } from './existence-time/existence-time-modal/existence-time-modal.component';
import { ExistenceTimeActions } from './existence-time/existence-time.actions';
import { InformationRoutingModule } from './information-routing.module';
import { ExTimeRoleSetAddCtrlComponent } from './role-set/ex-time/ex-time-role-set-add-ctrl/ex-time-role-set-add-ctrl.component';
import { ExTimeRoleSetCreateCtrlComponent } from './role-set/ex-time/ex-time-role-set-create-ctrl/ex-time-role-set-create-ctrl.component';
import { ExTimeRoleSetEditableComponent } from './role-set/ex-time/ex-time-role-set-editable/ex-time-role-set-editable.component';
import { ExTimeRoleSetFormComponent } from './role-set/ex-time/ex-time-role-set-form/ex-time-role-set-form.component';
import { PeItRoleSetAddCtrlComponent } from './role-set/pe-it/pe-it-role-set-add-ctrl/pe-it-role-set-add-ctrl.component';
import { PeItRoleSetCreateCtrlComponent } from './role-set/pe-it/pe-it-role-set-create-ctrl/pe-it-role-set-create-ctrl.component';
import { PeItRoleSetEditableComponent } from './role-set/pe-it/pe-it-role-set-editable/pe-it-role-set-editable.component';
import { PeItRoleSetFormComponent } from './role-set/pe-it/pe-it-role-set-form/pe-it-role-set-form.component';
import { RoleSetActions } from './role-set/role-set.actions';
import { RoleSetApiEpics } from './role-set/role-set.epics';
import { TeEntRoleSetAddCtrlComponent } from './role-set/te-ent/te-ent-role-set-add-ctrl/te-ent-role-set-add-ctrl.component';
import { TeEntRoleSetCreateCtrlComponent } from './role-set/te-ent/te-ent-role-set-create-ctrl/te-ent-role-set-create-ctrl.component';
import { TeEntRoleSetEditableComponent } from './role-set/te-ent/te-ent-role-set-editable/te-ent-role-set-editable.component';
import { TeEntRoleSetFormComponent } from './role-set/te-ent/te-ent-role-set-form/te-ent-role-set-form.component';
import { PeItRoleAddCtrlComponent } from './role/pe-it/pe-it-role-add-ctrl/pe-it-role-add-ctrl.component';
import { PeItRoleCreateCtrlComponent } from './role/pe-it/pe-it-role-create-ctrl/pe-it-role-create-ctrl.component';
import { PeItRoleEditableComponent } from './role/pe-it/pe-it-role-editable/pe-it-role-editable.component';
import { RoleActions } from './role/role.actions';
import { TeEntRoleAddCtrlComponent } from './role/te-ent/te-ent-role-add-ctrl/te-ent-role-add-ctrl.component';
import { TeEntRoleCreateCtrlComponent } from './role/te-ent/te-ent-role-create-ctrl/te-ent-role-create-ctrl.component';
import { TeEntRoleEditableComponent } from './role/te-ent/te-ent-role-editable/te-ent-role-editable.component';
import { AppellationService } from './shared/appellation.service';
import { ClassService } from './shared/class.service';
import { EntityAddModalService } from './shared/entity-add-modal.service';
import { EprService } from './shared/epr.service';
import { PeItService } from './shared/pe-it.service';
import { PropertyService } from './shared/property.service';
import { RoleSetService } from './shared/role-set.service';
import { RoleService } from './shared/role.service';
import { StateCreatorService } from './shared/state-creator.service';
import { TeEntService } from './shared/te-ent.service';
import { AppellationCtrlComponent } from './value/appellation-ctrl/appellation-ctrl.component';
import { AppellationViewComponent } from './value/appellation-view/appellation-view.component';
import { LanguageCtrlComponent } from './value/language-ctrl/language-ctrl.component';
import { LanguageViewComponent } from './value/language-view/language-view.component';
import { LeafPeItCtrlComponent } from './value/leaf-pe-it-ctrl/leaf-pe-it-ctrl.component';
import { LeafPeItViewModalComponent } from './value/leaf-pe-it-view/leaf-pe-it-view-modal/leaf-pe-it-view-modal.component';
import { LeafPeItViewComponent } from './value/leaf-pe-it-view/leaf-pe-it-view.component';
import { PlaceCtrlComponent } from './value/place-ctrl/place-ctrl.component';
import { PlaceViewComponent } from './value/place-view/place-view.component';
import { TimePrimitiveCtrlComponent } from './value/time-primitive-ctrl/time-primitive-ctrl.component';
import { TimePrimitiveViewComponent } from './value/time-primitive-view/time-primitive-view.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GvAngularCesiumModule,

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
    HighlightModule,
    DndModule,
    QuillModule

  ],
  declarations: [
    ProjectEntitiesComponent,
    EntitySearchHitComponent,
    PeItTimelineComponent,

    // PeIt Map
    MapComponent,
    PeItLayerComponent,
    PolygonsEditorLayerComponent,

    // Add Modal
    EntityAddAddExistingComponent,
    EntityAddChooseClassComponent,
    EntityAddCreateNewComponent,
    EntityAddModalComponent,
    EntityAddSearchExistingComponent,

    // Data Unit > PeIt
    PeItAddCtrlComponent,
    PeItCreateCtrlComponent,
    PeItEditableComponent,
    PeItAddFormComponent,
    PeItCreateFormComponent,

    // Data Unit > TeEnt
    TeEntAddCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntEditableComponent,

    // Existence Time
    ExistenceTimeEditableComponent,
    ExistenceTimeAddCtrlComponent,

    // Appe Lang
    AppeLangCreateCtrlComponent,

    // Role Set
    PeItRoleSetAddCtrlComponent,
    PeItRoleSetCreateCtrlComponent,
    PeItRoleSetEditableComponent,
    PeItRoleSetFormComponent,
    TeEntRoleSetAddCtrlComponent,
    TeEntRoleSetCreateCtrlComponent,
    TeEntRoleSetEditableComponent,
    TeEntRoleSetFormComponent,
    ExTimeRoleSetFormComponent,
    ExTimeRoleSetAddCtrlComponent,
    ExTimeRoleSetCreateCtrlComponent,
    ExistenceTimeModalComponent,

    // Role
    PeItRoleAddCtrlComponent,
    PeItRoleCreateCtrlComponent,
    PeItRoleEditableComponent,
    TeEntRoleAddCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    TeEntRoleEditableComponent,

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
    ExTimeRoleSetEditableComponent,
    PlaceCtrlComponent,
    PlaceViewComponent,
    ExistenceTimeHelpComponent,

    // Reusable
    TeEntLabelComponent,
    PeItLabelComponent,
    LeafPeItLabelComponent,
    AddInfoTeEntComponent,
    AddInfoPeItComponent,
    TextPropertyComponent,
    InformationComponent,



  ],
  providers: [

    // Add Modal
    EntityAddModalService,

    // Information (root)
    InformationAPIActions,
    InformationAPIEpics,

    // Data Unit
    PeItActions,
    PeItApiEpics,
    TeEntActions,
    TeEntAPIEpics,

    // Existence Time
    ExistenceTimeActions,

    // Appe Lang
    AppeLangCreateCtrlAPIActions,
    AppeLangCreateCtrlAPIEpics,

    // Role Set
    RoleSetActions,
    RoleSetApiEpics,

    // Role
    RoleActions,

    // Value
    AppellationService,

    // Shared
    StateCreatorService,
    PeItService,
    TeEntService,
    ClassService,
    PropertyService,
    RoleService,
    EprService,
    RoleSetService,
    ValidationService,

    MentionedEntityCtrlActions,


  ],
  exports: [
    // Put all components here, that are used by another module, or in a sandbox

    // Add Modal
    EntityAddModalComponent,

    // Data Unit > PeIt
    PeItAddCtrlComponent,
    PeItCreateCtrlComponent,
    PeItEditableComponent,
    PeItAddFormComponent,
    PeItCreateFormComponent,

    // Data Unit > TeEnt
    TeEntAddCtrlComponent,
    TeEntCreateCtrlComponent,
    TeEntEditableComponent,

    // Existence Time
    ExistenceTimeEditableComponent,
    ExistenceTimeAddCtrlComponent,
    AppeLangCreateCtrlComponent,

    // Role Set
    PeItRoleSetAddCtrlComponent,
    PeItRoleSetCreateCtrlComponent,
    PeItRoleSetEditableComponent,
    PeItRoleSetFormComponent,
    TeEntRoleSetAddCtrlComponent,
    TeEntRoleSetCreateCtrlComponent,
    TeEntRoleSetEditableComponent,
    TeEntRoleSetFormComponent,

    // Role
    PeItRoleAddCtrlComponent,
    PeItRoleCreateCtrlComponent,
    PeItRoleEditableComponent,
    TeEntRoleAddCtrlComponent,
    TeEntRoleCreateCtrlComponent,
    TeEntRoleEditableComponent,

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

    // Reusable
    TextPropertyComponent

  ],
  entryComponents: [
    LeafPeItViewModalComponent,
    EntityAddModalComponent,
    ExistenceTimeModalComponent
  ]
})
export class Information2Module { }
