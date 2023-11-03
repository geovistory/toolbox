import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { AngularSplitModule } from 'angular-split';
import { TreeModule } from 'primeng/tree';
import { TimelineModule } from '../../modules/timeline/timeline.module';
import { ControlMessagesModule, FilterByKeyModule, PassiveLinkModule } from '../../shared';
import { DetailTopBarModule } from '../../shared/components/detail-top-bar/detail-top-bar.module';
import { HighlightModule } from '../../shared/pipes/highlight/highlight.module';
import { DetailContentModule } from '../../shared/components/detail-content/detail-content.module';
import { TabBaseModule } from '../../shared/components/tab-layout/tab-layout.module';
import { AutofocusModule } from '../../shared/directives/autofocus/autofocus.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { AnnotationModule } from '../annotation/annotation.module';
import { BaseModule } from '../base/base.module';
import { EntityDetailComponent } from './containers/entity-detail/entity-detail.component';


@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    FlexLayoutModule,
    FormsModule,
    AngularSplitModule,
    DetailContentModule,
    DetailTopBarModule,
    ControlMessagesModule,
    PassiveLinkModule,
    AutofocusModule,
    DimensionChangeModule,
    TimelineModule,
    FilterByKeyModule,
    HighlightModule,
    DateTimeModule,
    DragDropModule,
    CdkTreeModule,
    DetailTopBarModule,
    AnnotationModule,
    TabBaseModule,
    TreeModule
  ],
  declarations: [
    EntityDetailComponent,
  ],
  exports: [
    EntityDetailComponent,
  ]
})
export class InformationModule { }
