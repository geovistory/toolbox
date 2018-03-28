import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PointComponent } from './components/point/point.component';
import { DraggableDirective } from './directives/draggable.directive';
import { XAxisComponent } from './components/x-axis/x-axis.component';
import { PlaceOnXAxisDirective } from './directives/place-on-x-axis.directive';
import { DraggableXAxisDirective } from './directives/draggable-x-axis.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimelineComponent,
    PointComponent,
    DraggableDirective,
    DraggableXAxisDirective,
    XAxisComponent,
    PlaceOnXAxisDirective
  ]
})
export class TimelineModule { }
