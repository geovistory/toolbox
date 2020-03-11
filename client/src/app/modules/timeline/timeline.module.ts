import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreTableFilterModule } from 'app/shared/components/core-table/filter/filter.module';
import { CoreTableMenuModule } from 'app/shared/components/core-table/menu/menu.module';
import { CoreTableVirtualScrollModule } from 'app/shared/components/core-table/virtual-scroll/virtual-scroll.module';
import { EntityPreviewModule } from 'app/shared/components/entity-preview/entity-preview.module';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { CursorHeaderVisualComponent } from './components/cursor-header-visual/cursor-header-visual.component';
import { CursorLineVisualComponent } from './components/cursor-line-visual/cursor-line-visual.component';
import { ExistenceTimeVisualComponent } from './components/existence-time-visual/existence-time-visual.component';
import { InnerVisualComponent } from './components/inner-visual/inner-visual.component';
import { LeftInnerVisualComponent } from './components/left-inner-visual/left-inner-visual.component';
import { LeftOuterVisualComponent } from './components/left-outer-visual/left-outer-visual.component';
import { OuterVisualComponent } from './components/outer-visual/outer-visual.component';
import { PointComponent } from './components/point/point.component';
import { RightInnerVisualComponent } from './components/right-inner-visual/right-inner-visual.component';
import { RightOuterVisualComponent } from './components/right-outer-visual/right-outer-visual.component';
import { TeEntVisualComponent } from './components/te-ent-visual/te-ent-visual.component';
import { TimelineTableComponent } from './components/timeline-table/timeline-table.component';
import { XAxisComponent } from './components/x-axis/x-axis.component';
import { DraggableXAxisDirective } from './directives/draggable-x-axis.directive';
import { RangeEmitterOnMouseDownDirective } from './directives/range-emitter-on-mouse-down.directive';
import { WrapTextDirective } from './directives/wrap-text.directive';
import { D3Service } from './shared/d3.service';
import { TimelineChartComponent } from './components/timeline-chart/timeline-chart.component';
import { ChartLineVisualComponent } from './components/chart-line-visual/chart-line-visual.component';
import { YAxisComponent } from './components/y-axis/y-axis.component';
import { ZoomSliderComponent } from './components/zoom-slider/zoom-slider.component';
import { PassiveLinkModule } from 'app/shared';

@NgModule({
  imports: [
    CommonModule,
    DimensionChangeModule,
    MatTooltipModule,
    TimeSpanPipeModule,
    CoreTableFilterModule,
    CoreTableMenuModule,
    CoreTableVirtualScrollModule,
    MatTableModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    EntityPreviewModule,
    PassiveLinkModule
  ],
  declarations: [
    PointComponent,
    DraggableXAxisDirective,
    XAxisComponent,
    YAxisComponent,
    LeftOuterVisualComponent,
    ExistenceTimeVisualComponent,
    TeEntVisualComponent,
    LeftInnerVisualComponent,
    RightInnerVisualComponent,
    RightOuterVisualComponent,
    InnerVisualComponent,
    OuterVisualComponent,
    WrapTextDirective,
    RangeEmitterOnMouseDownDirective,
    TimelineTableComponent,
    TimelineChartComponent,
    CursorHeaderVisualComponent,
    CursorLineVisualComponent,
    ChartLineVisualComponent,
    ZoomSliderComponent
  ],
  providers: [
    D3Service
  ],
  exports: [
    TimelineChartComponent,
    TimelineTableComponent
  ]
})
export class TimelineModule { }
