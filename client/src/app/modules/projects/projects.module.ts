import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectEditPanelComponent } from './components/project-edit-panel/project-edit-panel.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ProjectSettingsCollaboratorsComponent } from './components/project-settings-collaborators/project-settings-collaborators.component';
import { ProjectSettingsDataComponent } from './components/project-settings-data/project-settings-data.component';
import { ProjectSettingsProfileComponent } from './components/project-settings-profile/project-settings-profile.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NavbarModule, ProxyRouteModule } from 'app/shared';
import { ProjectsActions } from './api/projects.actions';
import { InformationModule } from '../information/information.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    ProjectsRoutingModule,
    FormsModule,
    NgbModule,
    ProxyRouteModule,
    InformationModule
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
    ProjectSettingsProfileComponent
  ],
  providers: [
    ProjectsActions
  ]
})
export class ProjectsModule { }
