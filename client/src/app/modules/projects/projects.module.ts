import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { NavbarModule, PassiveLinkModule, ProxyRouteModule, LanguageSearchTypeaheadModule } from 'app/shared';
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
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TabHandleComponent } from './components/tab-handle/tab-handle.component';

import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectEditPanelComponent } from './containers/project-edit-panel/project-edit-panel.component';
import { ProjectEditComponent, TabBodyComponent, OnActivateTabDirective } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
import { ProjectSettingsCollaboratorsComponent } from './containers/project-settings-collaborators/project-settings-collaborators.component';
import { ProjectSettingsDataAPIActions } from './containers/project-settings-data/api/project-settings-data.actions';
import { ProjectSettingsDataAPIEpics } from './containers/project-settings-data/api/project-settings-data.epics';
import { ProjectSettingsDataComponent } from './containers/project-settings-data/project-settings-data.component';
import { ProjectSettingsProfileComponent } from './containers/project-settings-profile/project-settings-profile.component';
import { TypeEditFormAPIActions } from './containers/type-edit-form/api/type-edit-form.actions';
import { TypeEditFormAPIEpics } from './containers/type-edit-form/api/type-edit-form.epics';
import { TypeEditFormComponent } from './containers/type-edit-form/type-edit-form.component';
import { TypesAPIActions } from './containers/types/api/types.actions';
import { TypesAPIEpics } from './containers/types/api/types.epics';
import { TypesComponent } from './containers/types/types.component';
import { PanelBodyDirective } from './directives/panel-body.directive';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ConfirmDialogModule } from '../../shared/components/confirm-dialog/confirm-dialog.module';
import { DataModule } from '../data/data.module';
import { ClassConfigModule } from '../class-config/class-config.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { OntomeProfilesListComponent } from './components/ontome-profiles-list/ontome-profiles-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AnalysisIconModule } from 'app/shared/pipes/analysis-icon/analysis-icon.module';



@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    ProjectsRoutingModule,
    FormsModule,
    NgbModule,
    ProxyRouteModule,
    Information2Module,
    DataModule,
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
    MatDialogModule,
    DragDropModule,
    SourcesModule,
    Information2Module,
    QueriesModule,
    VisualsModule,
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
    AnalysisIconModule
  ],
  declarations: [
    ProjectCreateComponent,
    ProjectDashboardComponent,
    ProjectEditComponent,
    ProjectEditPanelComponent,
    ProjectListComponent,
    ProjectSettingsCollaboratorsComponent,
    ProjectSettingsDataComponent,
    ProjectSettingsProfileComponent,
    SideNavComponent,
    TypesComponent,
    TypeEditFormComponent,
    TabBodyComponent,
    PanelBodyDirective,
    TabHandleComponent,
    SettingsListComponent,
    OnActivateTabDirective,
    OntomeProfilesListComponent
  ],
  exports: [
    OntomeProfilesListComponent
  ],
  providers: [
    ProjectsActions,
    ProjectSettingsDataAPIEpics,
    ProjectSettingsDataAPIActions,
    TypesAPIActions,
    TypesAPIEpics,
    TypeEditFormAPIActions,
    TypeEditFormAPIEpics
  ],
  entryComponents: [
    TypeEditFormComponent
  ]
})
export class ProjectsModule { }
