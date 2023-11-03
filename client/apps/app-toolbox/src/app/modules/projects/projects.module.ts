import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { NavbarModule, ProxyRouteModule } from '../../shared';
import { ReadMoreModule } from '../../shared/components/read-more/read-more.module';
import { EntityLabelConfigModule } from '../../shared/modules/entity-label-config/entity-label-config.module';
import { AnalysisIconModule } from '../../shared/pipes/analysis-icon/analysis-icon.module';
import { HighlightModule } from '../../shared/pipes/highlight/highlight.module';
import { KeysModule } from '../../shared/pipes/keys.module';
import { QuillOpsToStrModule } from '../../shared/pipes/quill-delta-to-str/quill-delta-to-str.module';
import { ConfirmDialogModule } from '../../shared/components/confirm-dialog/confirm-dialog.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { OntoInfoModule } from '../../shared/components/onto-info/onto-info.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { BaseModule } from '../base/base.module';
import { ClassConfigModule } from '../class-config/class-config.module';
import { DataModule } from '../data/data.module';
import { InformationModule } from '../information/information.module';
import { LeftDrawerModule } from '../left-drawer/left-drawer.module';
import { QueriesModule } from '../queries/queries.module';
import { SettingsModule } from '../settings/settings.module';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { RamFormComponent } from './components/ram-form/ram-form.component';
import { TabBodyComponent } from './components/tab-body/tab-body.component';
import { TabHandleComponent } from './components/tab-handle/tab-handle.component';
import { ProjectCreateComponent } from './containers/project-create/project-create.component';
import { ProjectEditPanelComponent } from './containers/project-edit-panel/project-edit-panel.component';
import { ProjectEditComponent } from './containers/project-edit/project-edit.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';
import { ProjectSettingsDataComponent } from './containers/project-settings-data/project-settings-data.component';
import { TypesComponent } from './containers/types/types.component';
import { OnActivateTabDirective } from './directives/on-activate-tab.directive';
import { PanelBodyDirective } from './directives/panel-body.directive';
import { ProjectsRoutingModule } from './projects-routing.module';




@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    LeftDrawerModule,
    QueriesModule,
    DataModule,
    InformationModule,
    NavbarModule,
    ProjectsRoutingModule,
    FormsModule,
    ProxyRouteModule,
    KeysModule,
    ReadMoreModule,
    HighlightModule,
    AnalysisModule,
    PortalModule,
    AngularSplitModule,
    DetailTopBarModule,
    DetailContentModule,
    ConfirmDialogModule,
    ClassConfigModule,
    HttpClientModule,
    AnalysisIconModule,
    SettingsModule,
    OntoInfoModule,
    QuillOpsToStrModule,
    EntityLabelConfigModule,
  ],
  declarations: [
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectEditPanelComponent,
    ProjectListComponent,
    RamFormComponent,
    ProjectSettingsDataComponent,
    TypesComponent,
    TabBodyComponent,
    PanelBodyDirective,
    TabHandleComponent,
    OnActivateTabDirective,
    ProjectCardComponent,
  ],

  providers: []
})
export class ProjectsModule { }
