import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { DndModule } from 'ng2-dnd';
import { LanguageSearchTypeaheadModule, NavbarModule, ProxyRouteModule } from 'projects/app-toolbox/src/app/shared';
import { DrawerContainerResizeModule } from 'projects/app-toolbox/src/app/shared/components/drawer-container-resize/drawer-container-resize.module';
import { ListDrawerHeaderModule } from 'projects/app-toolbox/src/app/shared/components/list-drawer-header/list-drawer-header.module';
import { ReadMoreModule } from 'projects/app-toolbox/src/app/shared/components/read-more/read-more.module';
import { EntityLabelConfigModule } from 'projects/app-toolbox/src/app/shared/modules/entity-label-config/entity-label-config.module';
import { AnalysisIconModule } from 'projects/app-toolbox/src/app/shared/pipes/analysis-icon/analysis-icon.module';
import { HighlightModule } from 'projects/app-toolbox/src/app/shared/pipes/highlight/highlight.module';
import { KeysModule } from 'projects/app-toolbox/src/app/shared/pipes/keys.module';
import { QuillOpsToStrModule } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { ConfirmDialogModule } from '../../shared/components/confirm-dialog/confirm-dialog.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { BaseModule } from '../base/base.module';
import { ClassConfigModule } from '../class-config/class-config.module';
import { DataModule } from '../data/data.module';
import { InformationModule } from '../information/information.module';
import { QueriesModule } from '../queries/queries.module';
import { SettingsModule } from '../settings/settings.module';
import { SourcesModule } from '../sources';
import { ProjectsActions } from './api/projects.actions';
import { RamFormComponent } from './components/ram-form/ram-form.component';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { TabHandleComponent } from './components/tab-handle/tab-handle.component';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectEditPanelComponent } from './containers/project-edit-panel/project-edit-panel.component';
import { OnActivateTabDirective, ProjectEditComponent, TabBodyComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
import { ProjectSettingsDataAPIActions } from './containers/project-settings-data/api/project-settings-data.actions';
import { ProjectSettingsDataComponent } from './containers/project-settings-data/project-settings-data.component';
import { TypeEditFormAPIActions } from './containers/type-edit-form/api/type-edit-form.actions';
import { TypeEditFormAPIEpics } from './containers/type-edit-form/api/type-edit-form.epics';
import { TypeEditFormComponent } from './containers/type-edit-form/type-edit-form.component';
import { TypesComponent } from './containers/types/types.component';
import { PanelBodyDirective } from './directives/panel-body.directive';
import { ProjectsRoutingModule } from './projects-routing.module';




@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    SourcesModule,
    QueriesModule,
    DataModule,
    InformationModule,
    NavbarModule,
    ProjectsRoutingModule,
    FormsModule,
    // ReactiveFormsModule,
    NgbModule,
    ProxyRouteModule,
    KeysModule,
    ReadMoreModule,
    HighlightModule,
    DragDropModule,
    AnalysisModule,
    PortalModule,
    DrawerContainerResizeModule,
    AngularSplitModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    DetailContentModule,
    ConfirmDialogModule,
    LanguageSearchTypeaheadModule,
    ClassConfigModule,
    HttpClientModule,
    AnalysisIconModule,
    SettingsModule,
    // OntoInfoModule,
    ClassConfigModule, // TODO: REMOVE
    // MaterialModule,
    DndModule,
    QuillOpsToStrModule,
    // TruncateModule
    EntityLabelConfigModule
  ],
  declarations: [
    ProjectCreateComponent,
    ProjectDashboardComponent,
    ProjectEditComponent,
    ProjectEditPanelComponent,
    ProjectListComponent,
    RamFormComponent,
    ProjectSettingsDataComponent,
    TypesComponent,
    TypeEditFormComponent,
    TabBodyComponent,
    PanelBodyDirective,
    TabHandleComponent,
    SettingsListComponent,
    OnActivateTabDirective,
  ],

  providers: [
    ProjectsActions,
    // ProjectSettingsDataAPIEpics,
    ProjectSettingsDataAPIActions,
    TypeEditFormAPIActions,
    TypeEditFormAPIEpics
  ]
})
export class ProjectsModule { }
