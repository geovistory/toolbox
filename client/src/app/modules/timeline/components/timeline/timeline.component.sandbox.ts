import { sandboxOf } from 'angular-playground';

import { DimensionChangeDirective } from '../../../../shared/directives/dimension-change/dimension-change.directive';
import { DraggableXAxisDirective } from '../../directives/draggable-x-axis.directive';
import { WrapTextDirective } from '../../directives/wrap-text.directive';
import { D3Service } from '../../shared/d3.service';
import { ExistenceTimeVisualComponent } from '../existence-time-visual/existence-time-visual.component';
import { InnerVisualComponent } from '../inner-visual/inner-visual.component';
import { LeftInnerVisualComponent } from '../left-inner-visual/left-inner-visual.component';
import { LeftOuterVisualComponent } from '../left-outer-visual/left-outer-visual.component';
import { OuterVisualComponent } from '../outer-visual/outer-visual.component';
import { PointComponent } from '../point/point.component';
import { RightInnerVisualComponent } from '../right-inner-visual/right-inner-visual.component';
import { RightOuterVisualComponent } from '../right-outer-visual/right-outer-visual.component';
import { TeEntVisualComponent } from '../te-ent-visual/te-ent-visual.component';
import { XAxisComponent } from '../x-axis/x-axis.component';
import { TimelineComponent } from './timeline.component';
import { timeLineData } from './timeline.component.sandbox.mock';





export default sandboxOf(TimelineComponent, {
  declarations: [
    PointComponent,
    XAxisComponent,
    DraggableXAxisDirective,
    LeftInnerVisualComponent,
    LeftOuterVisualComponent,
    RightInnerVisualComponent,
    RightOuterVisualComponent,
    ExistenceTimeVisualComponent,
    TeEntVisualComponent,
    InnerVisualComponent,
    OuterVisualComponent,
    WrapTextDirective,
    DimensionChangeDirective
  ],
  providers: [
    D3Service
  ]
})
  .add('State: Flex-Item', {
    context: {
      timeLineData
    },
    template: `

    <div class="d-flex">

      <div class="d-flex flex-column mt-5 gv-flex-grow-1" style="overflow:hidden">

        <div class="p-3 border"> some flex item </div>

          <gv-timeline class="border border-primary p-3" [data]="timeLineData"></gv-timeline>

        <div class="p-3 border"> some flex item </div>

      </div> 
      
      
      <div class="d-flex flex-column mt-5">

        <div class="p-3 border"> some flex item </div>

          <gv-timeline class="border border-primary p-3" [data]="timeLineData"></gv-timeline>

        <div class="p-3 border"> some flex item </div>

      </div>    

    </div>


    `
  })
  .add('State: Mockdata', {
    context: {
      timeLineData
    },
    template: `
    
    <div class="d-flex flex-column mt-5" >
      <div class="p-3 border"> some flex item </div>
      <div class="d-flex d-flex-grow-1">
          <gv-timeline class="border border-primary p-3" [data]="timeLineData"></gv-timeline>   
      </div>
      <div class="p-3 border"> some flex item </div>
    </div>
  `
  })
  .add('State: Empty', {
    template: `
    
    <div class="d-flex flex-column mt-5" >
      <div class="p-3 border"> some flex item </div>
      <div class="d-flex d-flex-grow-1">
          <gv-timeline class="border border-primary p-3"></gv-timeline>   
      </div>
      <div class="p-3 border"> some flex item </div>
    </div>
  `
  })