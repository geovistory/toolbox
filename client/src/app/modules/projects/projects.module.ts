import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatSidenavModule, MatSortModule, MatTableModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { NavbarModule, PassiveLinkModule, ProxyRouteModule } from 'app/shared';
import { DrawerContainerResizeModule } from 'app/shared/components/drawer-container-resize/drawer-container-resize.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { ReadMoreModule } from 'app/shared/components/read-more/read-more.module';
import { HighlightModule } from 'app/shared/pipes/highlight/highlight.module';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { Information2Module } from '../information/information.module';
import { QueriesModule } from '../queries/queries.module';
import { SourcesModule } from '../sources';
import { VisualsModule } from '../visuals/visuals.module';
import { ProjectsActions } from './api/projects.actions';
import { ClassItemComponent } from './components/class-item/class-item.component';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TabHandleComponent } from './components/tab-handle/tab-handle.component';
import { ClassSettingsAPIActions } from './containers/class-settings/api/class-settings.actions';
import { ClassSettingsAPIEpics } from './containers/class-settings/api/class-settings.epics';
import { ClassSettingsComponent } from './containers/class-settings/class-settings.component';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectEditPanelComponent } from './containers/project-edit-panel/project-edit-panel.component';
import { ProjectEditComponent, TabBodyComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
import { ProjectSettingsCollaboratorsComponent } from './containers/project-settings-collaborators/project-settings-collaborators.component';
import { ProjectSettingsDataAPIActions } from './containers/project-settings-data/api/project-settings-data.actions';
import { ProjectSettingsDataAPIEpics } from './containers/project-settings-data/api/project-settings-data.epics';
import { ProjectSettingsDataComponent } from './containers/project-settings-data/project-settings-data.component';
import { ProjectSettingsProfileComponent } from './containers/project-settings-profile/project-settings-profile.component';
import { ProjectSettingsComponent } from './containers/project-settings/project-settings.component';
import { TypeAddFormAPIActions } from './containers/type-add-form/api/type-add-form.actions';
import { TypeAddFormAPIEpics } from './containers/type-add-form/api/type-add-form.epics';
import { TypeAddFormComponent } from './containers/type-add-form/type-add-form.component';
import { TypeEditFormAPIActions } from './containers/type-edit-form/api/type-edit-form.actions';
import { TypeEditFormAPIEpics } from './containers/type-edit-form/api/type-edit-form.epics';
import { TypeEditFormComponent } from './containers/type-edit-form/type-edit-form.component';
import { TypesAPIActions } from './containers/types/api/types.actions';
import { TypesAPIEpics } from './containers/types/api/types.epics';
import { TypesComponent } from './containers/types/types.component';
import { PanelBodyDirective } from './directives/panel-body.directive';
import { ProjectsRoutingModule } from './projects-routing.module';



@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    ProjectsRoutingModule,
    FormsModule,
    NgbModule,
    ProxyRouteModule,
    Information2Module,
    KeysModule,
    ReadMoreModule,
    HighlightModule,
    PassiveLinkModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule,
    DragDropModule,
    SourcesModule,
    Information2Module,
    QueriesModule,
    VisualsModule,
    PortalModule,
    DrawerContainerResizeModule,
    AngularSplitModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    DetailContentModule
  ],
  declarations: [
    ProjectCreateComponent,
    ProjectDashboardComponent,
    ProjectEditComponent,
    ProjectEditPanelComponent,
    ProjectListComponent,
    ProjectSettingsComponent,
    ProjectSettingsCollaboratorsComponent,
    ProjectSettingsDataComponent,
    ProjectSettingsProfileComponent,
    ClassItemComponent,
    ClassSettingsComponent,
    SideNavComponent,
    TypesComponent,
    TypeAddFormComponent,
    TypeEditFormComponent,
    TabBodyComponent,
    PanelBodyDirective,
    TabHandleComponent,
    SettingsListComponent
  ],
  providers: [
    ProjectsActions,
    ProjectSettingsDataAPIEpics,
    ProjectSettingsDataAPIActions,
    ClassSettingsAPIActions,
    ClassSettingsAPIEpics,
    TypesAPIActions,
    TypesAPIEpics,
    TypeAddFormAPIActions,
    TypeAddFormAPIEpics,
    TypeEditFormAPIActions,
    TypeEditFormAPIEpics
  ]
})
export class ProjectsModule { }
