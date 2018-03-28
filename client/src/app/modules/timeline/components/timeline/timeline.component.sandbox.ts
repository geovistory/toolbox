import { sandboxOf } from 'angular-playground';
import { TimelineComponent } from './timeline.component';
import { D3Service } from '../../shared/d3.service';
import { PointComponent } from '../point/point.component';
import { DraggableDirective } from '../../directives/draggable.directive';
import { XAxisComponent } from '../x-axis/x-axis.component';
import { PlaceOnXAxisDirective } from '../../directives/place-on-x-axis.directive';
import { DraggableXAxisDirective } from '../../directives/draggable-x-axis.directive';




export default sandboxOf(TimelineComponent, {
  declarations:[
    PointComponent,
    XAxisComponent,
    DraggableDirective,
    PlaceOnXAxisDirective,
    DraggableXAxisDirective
  ],
  providers: [
    D3Service
  ]
})
  .add('State: Edit – new', {
    template: `
    <div class="d-flex justify-content-center mt-5">
        <gv-timeline class="border border-primary" ></gv-timeline>
    </div>
    `
  })