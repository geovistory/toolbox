import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AngularCesiumModule } from 'angular-cesium';
import { AngularSplitModule } from 'angular-split';
import { DndModule } from 'ng2-dnd';
import { TreeModule } from 'primeng/tree';
import { TimelineModule } from 'projects/app-toolbox/src/app/modules/timeline/timeline.module';
import { ControlMessagesModule, FilterByKeyModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from 'projects/app-toolbox/src/app/shared';
import { DetailTopBarModule } from 'projects/app-toolbox/src/app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'projects/app-toolbox/src/app/shared/components/list-drawer-header/list-drawer-header.module';
import { ListModule } from 'projects/app-toolbox/src/app/shared/components/list/list.module';
import { EntityLabelConfigModule } from 'projects/app-toolbox/src/app/shared/modules/entity-label-config/entity-label-config.module';
import { HighlightModule } from 'projects/app-toolbox/src/app/shared/pipes/highlight/highlight.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { TileHeaderModule } from '../../shared/components/tile-header/tile-header.module';
import { AutofocusModule } from '../../shared/directives/autofocus/autofocus.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { AnnotationModule } from '../annotation/annotation.module';
import { BaseModule } from '../base/base.module';
import { ContentTreeNodeLabelComponent } from './components/content-tree-node-label/content-tree-node-label.component';
import { ContentTreeNodeOptionsComponent } from './components/content-tree-node-options/content-tree-node-options.component';
import { ContentTreeNodeTypeComponent } from './components/content-tree-node-type/content-tree-node-type.component';
import { ContentTreeComponent } from './components/content-tree/content-tree.component';
import { EntityDetailAPIActions } from './containers/entity-detail/api/entity-detail.actions';
import { EntityDetailComponent } from './containers/entity-detail/entity-detail.component';
import { InformationAPIActions } from './containers/entity-list/api/entity-list.actions';
import { InformationAPIEpics } from './containers/entity-list/api/entity-list.epics';
import { InformationComponent } from './containers/entity-list/entity-list.component';
import { PeItTimelineComponent } from './containers/pe-it-timeline/pe-it-timeline.component';


@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    ListModule,
    FlexLayoutModule,
    FormsModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    NgbModule,
    LanguageSearchTypeaheadModule,
    ControlMessagesModule,
    PassiveLinkModule,
    AutofocusModule,
    DimensionChangeModule,
    TimelineModule,
    FilterByKeyModule,
    HighlightModule,
    DndModule,
    DateTimeModule,
    DragDropModule,
    CdkTreeModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    AnnotationModule,
    TileHeaderModule,
    EntityLabelConfigModule,

    TreeModule
  ],
  declarations: [
    InformationComponent,
    PeItTimelineComponent,
    EntityDetailComponent,
    ContentTreeComponent,
    ContentTreeNodeLabelComponent,
    ContentTreeNodeTypeComponent,
    ContentTreeNodeOptionsComponent,
  ],
  providers: [
    InformationAPIActions,
    InformationAPIEpics,
    EntityDetailAPIActions,
  ],
  exports: [
    InformationComponent,
    EntityDetailComponent,
    ContentTreeComponent
  ]
})
export class InformationModule { }
