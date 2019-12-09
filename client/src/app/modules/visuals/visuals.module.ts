import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSplitModule } from 'angular-split';
import { ValidationDirectivesModule } from 'app/core';
import { ControlMessagesModule, PassiveLinkModule } from 'app/shared';
import { DetailContentModule } from 'app/shared/components/detail-content/detail-content.module';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { MccColorPickerModule } from 'material-community-components';
import { AngularCesiumModule, CesiumService } from '../../../../node_modules/angular-cesium';
import { GvHelperComponentsModule } from '../../shared/components/gv-helper-components/gv-helper-components.module';
import { TimelineModule } from '../timeline/timeline.module';
// import { MapBackgroundSettingsComponent } from './components/map-background-settings/map-background-settings.component';
// import { MapQueryLayerSettingsComponent } from './components/map-query-layer-settings/map-query-layer-settings.component';
// import { MapQueryLayerComponent } from './components/map-query-layer/map-query-layer.component';
// import { MapSettingsComponent } from './components/map-settings/map-settings.component';
// import { MapVisualDemoComponent } from './components/map-visual-demo/map-visual-demo.component';
// import { MapVisualComponent } from './components/map-visual/map-visual.component';
import { TimelineVisualComponent } from './components/timeline-visual/timeline-visual.component';
// import { VisualDetailAPIActions } from './containers/visual-detail/api/visual-detail.actions';
// import { VisualDetailAPIEpics } from './containers/visual-detail/api/visual-detail.epics';
// import { VisualDetailComponent } from './containers/visual-detail/visual-detail.component';
// import { VisualListComponent } from './containers/visual-list/visual-list.component';

const components = [
  // VisualDetailComponent,
  // VisualListComponent,
  // MapSettingsComponent,
  // MapQueryLayerSettingsComponent,
  // MapBackgroundSettingsComponent,
  // MapQueryLayerComponent,
  // MapVisualComponent,
  // MapVisualDemoComponent,
  TimelineVisualComponent,

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
    AngularCesiumModule,
    TimelineModule,
    PassiveLinkModule,
    GvHelperComponentsModule
  ],
  providers: [
    // VisualDetailAPIActions,
    // VisualDetailAPIEpics,
    CesiumService
  ],
  declarations: components,
  exports: components
})
export class VisualsModule { }
