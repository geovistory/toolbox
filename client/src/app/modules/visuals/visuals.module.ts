import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatTooltipModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { ValidationDirectivesModule } from 'app/core';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { MccColorPickerModule } from 'material-community-components';
import { GvAngularCesiumModule } from '../gv-angular-cesium/angular-cesium.module';
import { TimelineModule } from '../timeline/timeline.module';
import { MapBackgroundSettingsComponent } from './components/map-background-settings/map-background-settings.component';
import { MapQueryLayerSettingsComponent } from './components/map-query-layer-settings/map-query-layer-settings.component';
import { MapQueryLayerComponent } from './components/map-query-layer/map-query-layer.component';
import { MapSettingsComponent } from './components/map-settings/map-settings.component';
import { MapVisualDemoComponent } from './components/map-visual-demo/map-visual-demo.component';
import { MapVisualComponent } from './components/map-visual/map-visual.component';
import { TimelineVisualComponent } from './components/timeline-visual/timeline-visual.component';
import { VisualDetailAPIActions } from './containers/visual-detail/api/visual-detail.actions';
import { VisualDetailAPIEpics } from './containers/visual-detail/api/visual-detail.epics';
import { VisualDetailComponent } from './containers/visual-detail/visual-detail.component';
import { VisualListComponent } from './containers/visual-list/visual-list.component';
import { GvHelperComponentsModule } from '../../shared/components/gv-helper-components/gv-helper-components.module';

const components = [
  VisualDetailComponent,
  VisualListComponent,
  MapSettingsComponent,
  MapQueryLayerSettingsComponent,
  MapBackgroundSettingsComponent,
  MapVisualComponent,
  MapVisualDemoComponent,
  MapQueryLayerComponent,
  TimelineVisualComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule,
    DetailTopBarModule,
    DetailContentModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    DragDropModule,
    ListDrawerHeaderModule,
    MccColorPickerModule,
    ControlMessagesModule,
    ValidationDirectivesModule,
    GvAngularCesiumModule,
    TimelineModule,
    PassiveLinkModule,
    GvHelperComponentsModule
  ],
  providers: [
    VisualDetailAPIActions,
    VisualDetailAPIEpics
  ],
  declarations: components,
  exports: components
})
export class VisualsModule { }
