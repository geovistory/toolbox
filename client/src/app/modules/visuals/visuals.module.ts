import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule, MatIconModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { MapBackgroundSettingsComponent } from './components/map-background-settings/map-background-settings.component';
import { MapQueryLayerSettingsComponent } from './components/map-query-layer-settings/map-query-layer-settings.component';
import { MapSettingsComponent } from './components/map-settings/map-settings.component';
import { VisualDetailAPIActions } from './containers/visual-detail/api/visual-detail.actions';
import { VisualDetailAPIEpics } from './containers/visual-detail/api/visual-detail.epics';
import { VisualDetailComponent } from './containers/visual-detail/visual-detail.component';
import { VisualListAPIActions } from './containers/visual-list/api/visual-list.actions';
import { VisualListAPIEpics } from './containers/visual-list/api/visual-list.epics';
import { VisualListComponent } from './containers/visual-list/visual-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MccColorPickerModule } from 'material-community-components';
import { ControlMessagesModule } from 'app/shared';
import { ValidationDirectivesModule } from 'app/core';
import { MapVisualComponent } from './components/map-visual/map-visual.component';
import { MapVisualDemoComponent } from './components/map-visual-demo/map-visual-demo.component';
import { GvAngularCesiumModule } from '../gv-angular-cesium/angular-cesium.module';
import { MapQueryLayerComponent } from './components/map-query-layer/map-query-layer.component';

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
    DragDropModule,
    ListDrawerHeaderModule,
    MccColorPickerModule,
    ControlMessagesModule,
    ValidationDirectivesModule,
    GvAngularCesiumModule
  ],
  providers: [
    VisualListAPIActions,
    VisualListAPIEpics,
    VisualDetailAPIActions,
    VisualDetailAPIEpics
  ],
  declarations: components,
  exports: components
})
export class VisualsModule { }
