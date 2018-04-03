import { sandboxOf } from 'angular-playground';
import { TimelineComponent } from './timeline.component';
import { D3Service } from '../../shared/d3.service';
import { PointComponent } from '../point/point.component';
import { XAxisComponent } from '../x-axis/x-axis.component';
import { PlaceOnXAxisDirective } from '../../directives/place-on-x-axis.directive';
import { DraggableXAxisDirective } from '../../directives/draggable-x-axis.directive';
import { LeftOuterVisualComponent } from '../left-outer-visual/left-outer-visual.component';
import { ExistenceTime } from '../../../information/components/existence-time';
import { TimePrimitive } from 'app/core';

import { personPeIts } from './timeline.component.sandbox.mock';
import { ExistenceTimeVisualComponent } from '../existence-time-visual/existence-time-visual.component';
import { TeEntVisualComponent } from '../te-ent-visual/te-ent-visual.component';
import { LeftInnerVisualComponent } from '../left-inner-visual/left-inner-visual.component';
import { RightInnerVisualComponent } from '../right-inner-visual/right-inner-visual.component';
import { RightOuterVisualComponent } from '../right-outer-visual/right-outer-visual.component';
import { InnerVisualComponent } from '../inner-visual/inner-visual.component';
import { OuterVisualComponent } from '../outer-visual/outer-visual.component';




export default sandboxOf(TimelineComponent, {
  declarations: [
    PointComponent,
    XAxisComponent,
    PlaceOnXAxisDirective,
    DraggableXAxisDirective,
    LeftInnerVisualComponent,
    LeftOuterVisualComponent,
    RightInnerVisualComponent,
    RightOuterVisualComponent,
    ExistenceTimeVisualComponent,
    TeEntVisualComponent,
    InnerVisualComponent,
    OuterVisualComponent
  ],
  providers: [
    D3Service
  ]
})
  .add('State: Edit – new', {
    context: {
      peIts: personPeIts
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
        <gv-timeline class="border border-primary" [persistentItems]="peIts"></gv-timeline>
    </div>
    `
  })