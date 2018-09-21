import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectDashboardComponent } from './containers/project-dashboard/project-dashboard.component';
import { ProjectEditComponent } from './containers/project-edit/project-edit.component';
import { ProjectEditPanelComponent } from './containers/project-edit-panel/project-edit-panel.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
import { ProjectSettingsComponent } from './containers/project-settings/project-settings.component';
import { ProjectSettingsCollaboratorsComponent } from './containers/project-settings-collaborators/project-settings-collaborators.component';
import { ProjectSettingsDataComponent } from './containers/project-settings-data/project-settings-data.component';
import { ProjectSettingsProfileComponent } from './containers/project-settings-profile/project-settings-profile.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NavbarModule, ProxyRouteModule, PassiveLinkModule } from 'app/shared';
import { ProjectsActions } from './api/projects.actions';
import { Information2Module } from '../information/information.module';
import { ProjectSettingsDataAPIEpics } from './containers/project-settings-data/api/project-settings-data.epics';
import { ProjectSettingsDataAPIActions } from './containers/project-settings-data/api/project-settings-data.actions';
import { ClassItemComponent } from './components/class-item/class-item.component';
import { KeysModule } from 'app/shared/pipes/keys.module';
import { ReadMoreModule } from 'app/shared/components/read-more/read-more.module';
import { HighlightModule } from 'app/shared/pipes/highlight/highlight.module';

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
    HighlightModule
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
    ClassItemComponent
  ],
  providers: [
    ProjectsActions,
    ProjectSettingsDataAPIEpics,
    ProjectSettingsDataAPIActions
  ]
})
export class ProjectsModule { }
