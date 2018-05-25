import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PointComponent } from './components/point/point.component';
import { XAxisComponent } from './components/x-axis/x-axis.component';
import { DraggableXAxisDirective } from './directives/draggable-x-axis.directive';
import { LeftOuterVisualComponent } from './components/left-outer-visual/left-outer-visual.component';
import { ExistenceTimeVisualComponent } from './components/existence-time-visual/existence-time-visual.component';
import { TeEntVisualComponent } from './components/te-ent-visual/te-ent-visual.component';
import { LeftInnerVisualComponent } from './components/left-inner-visual/left-inner-visual.component';
import { RightInnerVisualComponent } from './components/right-inner-visual/right-inner-visual.component';
import { RightOuterVisualComponent } from './components/right-outer-visual/right-outer-visual.component';
import { InnerVisualComponent } from './components/inner-visual/inner-visual.component';
import { OuterVisualComponent } from './components/outer-visual/outer-visual.component';
import { WrapTextDirective } from './directives/wrap-text.directive';
import { DimensionChangeModule } from '../../shared/directives/dimension-change/dimension-change.module';
import { D3Service } from './shared/d3.service';

@NgModule({
  imports: [
    CommonModule,
    DimensionChangeModule
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
  ],
  providers: [
    D3Service
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }
