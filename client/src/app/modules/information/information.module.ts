import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from '@cime/ngx-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimelineModule } from 'app/modules/timeline/timeline.module';
import { ControlMessagesModule, FilterByKeyModule, LanguageSearchTypeaheadModule, PassiveLinkModule } from 'app/shared';
import { DetailTopBarModule } from 'app/shared/components/detail-top-bar/detail-top-bar.module';
import { ListDrawerHeaderModule } from 'app/shared/components/list-drawer-header/list-drawer-header.module';
import { ListModule } from 'app/shared/components/list/list.module';
import { HighlightModule } from 'app/shared/pipes/highlight/highlight.module';
import { InfTimePrimitivePipeModule } from 'app/shared/pipes/inf-time-primitive/inf-time-primitive.module';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { DndModule } from 'ng2-dnd';
import { TableModule } from 'ngx-easy-table';
import { TreeviewModule } from 'ngx-treeview';
import { AngularCesiumModule } from '../../../../node_modules/angular-cesium';
import { AngularSplitModule } from '../../../../node_modules/angular-split';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { TileHeaderModule } from '../../shared/components/tile-header/tile-header.module';
import { AutofocusModule } from '../../shared/directives/autofocus/autofocus.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { AnnotationModule } from '../annotation/annotation.module';
import { BaseModule } from '../base/base.module';
import { ContentTreeNodeLabelComponent } from './components/content-tree-node-label/content-tree-node-label.component';
import { ContentTreeNodeTypeComponent } from './components/content-tree-node-type/content-tree-node-type.component';
import { ContentTreeComponent } from './components/content-tree/content-tree.component';
import { CreateOrAddEntityComponent } from './containers/create-or-add-entity/create-or-add-entity.component';
import { InformationAPIActions } from './containers/entity-list/api/entity-list.actions';
import { InformationAPIEpics } from './containers/entity-list/api/entity-list.epics';
import { InformationComponent } from './containers/entity-list/entity-list.component';
import { EntityActions } from './containers/entity-detail/api/entity.actions';
import { PeItDetailAPIActions } from './containers/entity-detail/api/entity-detail.actions';
import { PeItActions } from './containers/entity-detail/api/pe-it.actions';
import { EntityDetailComponent } from './containers/entity-detail/entity-detail.component';
import { PeItTimelineComponent } from './containers/pe-it-timeline/pe-it-timeline.component';


@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    ListModule,
    FlexLayoutModule,
    FormsModule,
    AngularCesiumModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    SlimLoadingBarModule,
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
    TreeviewModule,
    TableModule,
    TimePrimitivePipeModule,
    InfTimePrimitivePipeModule,
    DragDropModule,
    CdkTreeModule,
    ListDrawerHeaderModule,
    DetailTopBarModule,
    AnnotationModule,
    TileHeaderModule,
  ],
  declarations: [
    InformationComponent,
    PeItTimelineComponent,
    EntityDetailComponent,
    CreateOrAddEntityComponent,
    ContentTreeComponent,
    ContentTreeNodeLabelComponent,
    ContentTreeNodeTypeComponent,
  ],
  providers: [
    InformationAPIActions,
    InformationAPIEpics,
    EntityActions,
    PeItActions,
    PeItDetailAPIActions,
  ],
  exports: [
    InformationComponent,
    EntityDetailComponent,
    CreateOrAddEntityComponent,
  ],
  entryComponents: [

  ]
})
export class InformationModule { }
