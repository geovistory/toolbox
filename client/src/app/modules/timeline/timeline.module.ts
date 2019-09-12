import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimePrimitivePipeModule } from 'app/shared/pipes/time-primitive/time-primitive.module';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { CursorVisualComponent } from './components/cursor/cursor.component';
import { ExistenceTimeVisualComponent } from './components/existence-time-visual/existence-time-visual.component';
import { InnerVisualComponent } from './components/inner-visual/inner-visual.component';
import { LeftInnerVisualComponent } from './components/left-inner-visual/left-inner-visual.component';
import { LeftOuterVisualComponent } from './components/left-outer-visual/left-outer-visual.component';
import { OuterVisualComponent } from './components/outer-visual/outer-visual.component';
import { PointComponent } from './components/point/point.component';
import { RightInnerVisualComponent } from './components/right-inner-visual/right-inner-visual.component';
import { RightOuterVisualComponent } from './components/right-outer-visual/right-outer-visual.component';
import { TeEntVisualComponent } from './components/te-ent-visual/te-ent-visual.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { XAxisComponent } from './components/x-axis/x-axis.component';
import { DraggableXAxisDirective } from './directives/draggable-x-axis.directive';
import { RangeEmitterOnMouseDownDirective } from './directives/range-emitter-on-mouse-down.directive';
import { WrapTextDirective } from './directives/wrap-text.directive';
import { D3Service } from './shared/d3.service';
import { TimeSpanPipeModule } from 'app/shared/pipes/time-span/time-span.module';

@NgModule({
  imports: [
    CommonModule,
    DimensionChangeModule,
    MatTooltipModule,
    TimeSpanPipeModule
  ],
  declarations: [
    TimelineComponent,
    PointComponent,
    DraggableXAxisDirective,
    XAxisComponent,
    LeftOuterVisualComponent,
    ExistenceTimeVisualComponent,
    TeEntVisualComponent,
    LeftInnerVisualComponent,
    RightInnerVisualComponent,
    RightOuterVisualComponent,
    InnerVisualComponent,
    OuterVisualComponent,
    WrapTextDirective,
    CursorVisualComponent,
    RangeEmitterOnMouseDownDirective
  ],
  providers: [
    D3Service
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
